import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import { validateTodoInput } from './middleware/validateTodo';
import { authMiddleware } from './middleware/auth';

const app = express();

// Configuration CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', authMiddleware, todoRoutes);

// Gestion des erreurs 404
app.use('*', (_, res) => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;
