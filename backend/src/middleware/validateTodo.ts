import { RequestHandler } from 'express';

export const validateTodoInput: RequestHandler = (req, res, next) => {
    const { task } = req.body;
    
    if (!task || typeof task !== 'string' || task.trim().length === 0) {
        return res.status(400).json({ message: 'Task is required and must be a non-empty string' });
    }
    
    next();
};