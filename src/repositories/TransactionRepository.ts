// src/repositories/TransactionRepository.ts
import { Pool } from 'pg';
import pool from '../config/database';
import Transaction from '../models/TransactionModel';

export class TransactionRepository {
  private pool: Pool = pool;

  async createTransaction(clientId: number, bookId: number, price: number): Promise<Transaction> {
    const query = `
      INSERT INTO transactions (client_id, book_id, price, date_purchase)
      VALUES ($1, $2, $3, NOW()) RETURNING *`;
    const { rows } = await this.pool.query(query, [clientId, bookId, price]);

    return rows[0];
  }

  async getAllTransactions(): Promise<Transaction[]> {
    const { rows } = await this.pool.query('SELECT * FROM transactions');
    return rows;
  }

  async getTransactionsByClientId(clientId: number): Promise<Transaction[]> {
    const { rows } = await this.pool.query('SELECT * FROM transactions WHERE client_id = $1', [clientId]);
    return rows;
  }
}

export default TransactionRepository;
