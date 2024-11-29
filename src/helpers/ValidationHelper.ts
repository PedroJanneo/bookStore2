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
