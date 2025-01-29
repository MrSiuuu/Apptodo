import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/TodoList.css';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState('');
    const { token, logout } = useAuth();

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTodos(data);
            } else if (response.status === 401) {
                logout();
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            console.log('Sending request to add todo:', { task: newTask });
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ task: newTask })
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                setNewTask('');
                fetchTodos();
            } else {
                alert(data.message || 'Error adding todo');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleToggleTodo = async (id: number, task: string, completed: boolean) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ task, completed: !completed })
            });

            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchTodos();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="todo-container">
                    <div className="todo-header">
                        <h1>Ma Liste de Tâches</h1>
                        <button onClick={logout} className="logout-button">
                            Déconnexion
                        </button>
                    </div>

                    <form onSubmit={handleAddTodo} className="todo-form">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Nouvelle tâche..."
                            className="todo-input"
                        />
                        <button type="submit" className="add-button">
                            Ajouter
                        </button>
                    </form>

                    <ul className="todo-list">
                        {todos.map((todo) => (
                            <li key={todo.id} className="todo-item">
                                <span
                                    className={`todo-text ${todo.completed ? 'completed' : ''}`}
                                    onClick={() => handleToggleTodo(todo.id, todo.task, todo.completed)}
                                >
                                    {todo.task}
                                </span>
                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="delete-button"
                                >
                                    Supprimer
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
