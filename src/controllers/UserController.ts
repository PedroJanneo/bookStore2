import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../models/UserModel'; // Importe o tipo User

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Corrigido para usar o userService em vez de pool diretamente
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();  // Chama o serviço para buscar os usuários
      res.status(200).json(users);  // Retorna a lista de usuários
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
      } else {
        res.status(500).json({ message: 'Erro desconhecido ao buscar usuários' });
      }
    }
  }

  // Método para registrar um novo usuário
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email, and password are required' });
      return;
    }

    try {
      const newUser = await this.userService.createUser(name, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }

  // Método para login de um usuário
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await this.userService.validatePassword(user.passwordHash, password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  }
}
