export function validateBookTitle(title: string): boolean {
  if (!title || title.trim().length < 3) {
    return false; // Título inválido
  }
  return true; // Título válido
}
