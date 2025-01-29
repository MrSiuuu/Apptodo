import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3000'; // Backend URL

export interface Todo {
    id: number;
    task: string;
    completed: boolean;
    user_id: number;
    created_at?: string;
    updated_at?: string;
}

const API_URL = 'http://localhost:3000/api';

export const getTodos = async (token: string): Promise<Todo[]> => {
    const response = await fetch(`${API_URL}/todos`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
};

export const createTodo = async (task: string, token: string): Promise<Todo> => {
    const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
};

export const updateTodo = async (id: number, task: string, completed: boolean, token: string): Promise<Todo> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task, completed })
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
};

export const deleteTodo = async (id: number, token: string): Promise<void> => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!response.ok) throw new Error('Failed to delete todo');
};
