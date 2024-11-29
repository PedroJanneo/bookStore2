import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';

// Inicializando os objetos UserService e UserController
const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

// Rota para registrar um novo usuário
router.post('/register', userController.register.bind(userController));

// Rota para login
router.post('/login', userController.login.bind(userController));

export default router;
