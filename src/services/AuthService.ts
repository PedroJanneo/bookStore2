import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/UserModel';

const SALT_ROUNDS = 10; // Para o bcrypt
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret'; // Substitua com uma variável de ambiente segura

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Registra um novo usuário
   * @param name Nome do usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  async registerUser(name: string, email: string, password: string): Promise<User> {
    // Verificar se o usuário já existe
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use.');
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Adicionar o novo usuário
    const newUser = await this.userRepository.addUser(name, email, passwordHash);
    return newUser;
  }

  /**
   * Realiza o login de um usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  async loginUser(email: string, password: string): Promise<{ token: string }> {
    // Buscar o usuário pelo email
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Token expira em 1 hora
    });

    return { token };
  }
}
