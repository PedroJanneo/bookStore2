import express from 'express';
import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/BookRoutes';
import userRoutes from './routes/UserRoutes';  // Importe o userRoutes

dotenv.config();

const app = express();

app.use(express.json());

// Rotas
// app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);  // Adicione a rota para users

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
