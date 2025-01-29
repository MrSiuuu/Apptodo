import { Request, Response } from 'express';
import { TodoModel } from '../models/todoModel';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await TodoModel.getAllTodos(req.userId!);
        res.json(todos);
    } catch (error) {
        console.error('Error in getTodos:', error);
        res.status(500).json({ 
            message: 'Error fetching todos',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { task } = req.body;
        if (!task || typeof task !== 'string' || task.trim().length === 0) {
            return res.status(400).json({ message: 'Task is required' });
        }

        const newTodo = await TodoModel.createTodo(task, req.userId!);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error in createTodo:', error);
        res.status(500).json({ message: 'Error creating todo' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        
        // Appartients elle a luser ?la todo
        const existingTodo = await TodoModel.getTodoById(Number(id));
        if (!existingTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (existingTodo.user_id !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedTodo = await TodoModel.updateTodo(Number(id), task, completed);
        res.json(updatedTodo);
    } catch (error) {
        console.error('Error in updateTodo:', error);
        res.status(500).json({ message: 'Error updating todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Vérifier que le todo appartient à l'utilisateur
        const existingTodo = await TodoModel.getTodoById(Number(id));
        if (!existingTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        if (existingTodo.user_id !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await TodoModel.deleteTodo(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error('Error in deleteTodo:', error);
        res.status(500).json({ message: 'Error deleting todo' });
    }
};
