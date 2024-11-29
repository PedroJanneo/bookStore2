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

  // Método para adicionar um novo usuário
  async addUser(name: string, email: string, passwordHash: string): Promise<User> {
    const query = 'INSERT INTO users (name, email, passwordHash) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await this.pool.query(query, [name, email, passwordHash]);
    return rows[0];
  }

  // Método para buscar um usuário pelo email
  async getUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await this.pool.query(query, [email]);
    return rows.length > 0 ? rows[0] : null;
  }
}