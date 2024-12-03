// src/repositories/UserRepository.ts
import { Pool } from 'pg';
import pool from '../config/database';
import { User } from '../models/UserModel';

export class UserRepository {
  private pool: Pool = pool;
  // Método para buscar todos os usuários
  async getAllUsers(): Promise<User[]> {
    const { rows } = await this.pool.query('SELECT * FROM users');
    return rows;
  }
  // Método para buscar um usuário pelo email
  async getUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await this.pool.query(query, [email]);
    return rows[0] || null; // Retorna o usuário ou null caso não exista
  }

  // Método para adicionar um novo usuário
  async addUser(name: string, email: string, passwordHash: string): Promise<User> {
    const query = `
      INSERT INTO users (name, email, "passwordHash") 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;

    const values = [name, email, passwordHash];

    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Retorna o registro inserido
    } catch (error) {
      console.error('Erro ao inserir o usuário no banco:', error);
      throw error;
    }
  }
}
