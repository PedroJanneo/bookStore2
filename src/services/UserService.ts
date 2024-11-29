// src/services/UserService.ts
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/UserModel';

export class UserService {
  private userRepository = new UserRepository();

  // Método para criar um novo usuário
  async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verifica se o e-mail já está cadastrado
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Cria o novo usuário no banco de dados
    return this.userRepository.addUser(name, email, hashedPassword);
  }

  // Método para buscar um usuário por email
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  // Método para validar a senha
  async validatePassword(storedPasswordHash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }
}
