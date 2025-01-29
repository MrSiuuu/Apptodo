import db from '../config/db';

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export class TodoModel {
    static async getAllTodos(userId: number): Promise<Todo[]> {
        return db.any('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    }

    static async getTodoById(id: number): Promise<Todo | null> {
        return db.oneOrNone('SELECT * FROM todos WHERE id = $1', [id]);
    }

    static async createTodo(task: string, userId: number): Promise<Todo> {
        return db.one(
            'INSERT INTO todos (task, user_id) VALUES ($1, $2) RETURNING *',
            [task, userId]
        );
    }

    static async updateTodo(id: number, task: string, completed: boolean): Promise<Todo> {
        return db.one(
            'UPDATE todos SET task = $1, completed = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [task, completed, id]
        );
    }

    static async deleteTodo(id: number): Promise<void> {
        await db.none('DELETE FROM todos WHERE id = $1', [id]);
    }
}
