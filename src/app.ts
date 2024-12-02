import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; 
import bookRoutes from './routes/BookRoutes';
import userRoutes from './routes/UserRoutes';  // Usado para usuários
import transactionRoutes from './routes/transactionRoutes';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);  // Correto, usando userRoutes para '/api/users'
app.use('/api/transactions', transactionRoutes);
app.use('/api/login', authRoutes); // Usando 'authRoutes'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
