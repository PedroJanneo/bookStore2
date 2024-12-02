import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import {login, register} from '../controllers/AuthController'

// Inicializando os objetos UserService e UserController
const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

// Rota para registrar um novo usuário
router.post('/register',register);

// Rota para login
router.post('/login', login);

// Rota para buscar todos os usuários
router.get('/', async (req, res) => {  // Alterei para "/"
  try {
    const users = await userService.getAllUsers();  // Chama o método de serviço para buscar os usuários
    res.json(users);  // Retorna a lista de usuários
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;
