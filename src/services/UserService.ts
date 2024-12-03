import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/UserModel';

export class UserService {
  private userRepository = new UserRepository();

  // Método para criar um novo usuário
  async createUser(name: string, email: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    console.log('Hash gerado para senha:', passwordHash); // Log do hash gerado

    const user = await this.userRepository.addUser(name, email, passwordHash);
    return user;
}


  // Método para buscar um usuário por email
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }

  // Método para validar a senha
  async validatePassword(storedPasswordHash: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  // Adicionado o método getAllUsers
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
