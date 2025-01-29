import express from 'express';
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from '../controllers/todoController';
import { validateTodoInput } from '../middleware/validateTodo';

const router = express.Router();

router.get('/', getTodos);
router.post('/', validateTodoInput, createTodo);
router.put('/:id', validateTodoInput, updateTodo);
router.delete('/:id', deleteTodo);

export default router;
