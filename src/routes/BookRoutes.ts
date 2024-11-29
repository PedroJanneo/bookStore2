// routes/BookRoutes.ts
import { Router } from 'express';
import { getAllBooks, addBook } from '../controllers/BookController';

const router = Router();

// Defina a rota para obter todos os livros
router.get('/', getAllBooks);

// Defina a rota para adicionar um livro
router.post('/', addBook);

export default router;
