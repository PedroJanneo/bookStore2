import { UserRepository } from '../repositories/UserRepository';
import { hashPassword, comparePassword } from '../helpers/ValidationHelper';
import { createSession } from '../helpers/sessionHelper';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Criação de novo usuário com senha hashed
  async registerUser(name: string, email: string, password: string) {
    const passwordHash = await hashPassword(password); // Gera o hash
    console.log('Hash gerado:', passwordHash); // Adicione um log para depuração
    const user = await this.userRepository.addUser(name, email, passwordHash);
    return user;
  }
  

  // Login de usuário
  async loginUser(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
  
    if (!user) throw new Error('Usuário não encontrado');
  
    console.log('Usuário retornado:', user); // Depuração
    if (!user.passwordHash) throw new Error('Hash da senha não encontrado');
  
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) throw new Error('Senha incorreta');
  
    createSession(user.id);
    return user;
  }
  
  
}
