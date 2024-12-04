import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/UserModel';  // Importe o tipo User

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Criação de novo usuário com senha hash
  async registerUser(name: string, email: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(10);  // Gera o salt
    const passwordHash = await bcrypt.hash(password, salt);  // Criptografa a senha

    const user = await this.userRepository.addUser(name, email, passwordHash);
    return user;
  }

  // Login de usuário
  async loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    console.log('Usuário encontrado:', user);  // Verificação do usuário encontrado
    console.log('Senha fornecida:', password);  // Senha fornecida no login
    console.log('Hash da senha armazenado:', user.passwordHash);  // Hash da senha armazenado no banco de dados

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);  // Comparando a senha
    if (!isPasswordValid) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ userId: user.id }, 'SEU_SEGREDO_AQUI', { expiresIn: '1h' });  // Gerar o token

    console.log("O token é ", token);  // Agora o token é definido antes do log

    return { user, token };
}
  
}
