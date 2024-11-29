import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token } = await authService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful!', token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
