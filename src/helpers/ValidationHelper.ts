import bcrypt from 'bcrypt';

// Função para gerar o hash da senha
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Define o número de rounds para hashing
  return await bcrypt.hash(password, saltRounds);
};

// Função para comparar a senha com o hash armazenado
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  if (!password || !hash) throw new Error('Os argumentos senha e hash são obrigatórios');
  return await bcrypt.compare(password, hash);
};


// Valida se o email é válido
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Verifica se o preço é válido
export const isValidPrice = (price: number): boolean => {
  return price > 0;
};

// Valida o título de um livro
export function validateBookTitle(title: string): boolean {
  if (!title || title.trim().length < 3) {
    return false; // Título inválido
  }
  return true; // Título válido
}