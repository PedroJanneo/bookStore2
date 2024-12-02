import crypto from 'crypto';

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPrice = (price: number): boolean => {
  return price > 0;
};

export function validateBookTitle(title: string): boolean {
  if (!title || title.trim().length < 3) {
    return false; // Título inválido
  }
  return true; // Título válido
}

