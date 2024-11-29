import { Pool } from 'pg';
import pool from '../config/database';
import { Book } from '../models/BookModel';

export class BookRepository {
  private pool: Pool = pool;

  // Método para buscar todos os livros
  async getAllBooks(): Promise<Book[]> {
    const { rows } = await this.pool.query('SELECT * FROM books');
    return rows;
  }

  // Método para adicionar um novo livro
  async addBook(title: string, author: string, price: number): Promise<Book> {
    const query = 'INSERT INTO books (title, author, price) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await this.pool.query(query, [title, author, price]);
    return rows[0];
  }

  // Método para buscar um livro pelo ID
  async getBookById(bookId: number): Promise<Book | null> {
    const query = 'SELECT * FROM books WHERE id = $1';
    const { rows } = await this.pool.query(query, [bookId]);

    // Se o livro for encontrado, retorna o livro, senão retorna null
    return rows.length > 0 ? rows[0] : null;
  }
}
