// src/services/TransactionService.ts
import { TransactionRepository } from '../repositories/TransactionRepository';
import Transaction from '../models/TransactionModel';

export class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async createTransaction(clientId: number, bookId: number, price: number): Promise<Transaction> {
    return this.transactionRepository.createTransaction(clientId, bookId, price);
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.getAllTransactions();
  }

  async getTransactionsByClientId(clientId: number): Promise<Transaction[]> {
    return this.transactionRepository.getTransactionsByClientId(clientId);
  }
}

export default TransactionService;
