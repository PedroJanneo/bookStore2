// src/controllers/TransactionController.ts
import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  private transactionService: TransactionService;

  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  async createTransaction(req: Request, res: Response): Promise<void> {
    const { clientId, bookId, price } = req.body;

    if (!clientId || !bookId || !price) {
      res.status(400).json({ message: 'Client ID, Book ID, and Price are required' });
      return;
    }

    try {
      const transaction = await this.transactionService.createTransaction(clientId, bookId, price);
      res.status(201).json(transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: 'Error creating transaction', error: errorMessage });
    }
  }

  async getAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: 'Error fetching transactions', error: errorMessage });
    }
  }

  async getTransactionsByClientId(req: Request, res: Response): Promise<void> {
    const { clientId } = req.params;

    if (!clientId) {
      res.status(400).json({ message: 'Client ID is required' });
      return;
    }

    try {
      const transactions = await this.transactionService.getTransactionsByClientId(Number(clientId));
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching client transactions:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: 'Error fetching client transactions', error: errorMessage });
    }
  }
}

export default TransactionController;
