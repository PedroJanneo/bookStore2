import express from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { TransactionService } from '../services/TransactionService';
import { TransactionRepository } from '../repositories/TransactionRepository';

const transactionRoutes = express.Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

transactionRoutes.post('/', (req, res) => transactionController.createTransaction(req, res));
transactionRoutes.get('/', (req, res) => transactionController.getAllTransactions(req, res));
transactionRoutes.get('/:clientId', (req, res) => transactionController.getTransactionsByClientId(req, res));

export default transactionRoutes;
