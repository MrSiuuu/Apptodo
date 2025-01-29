import React, { useState } from 'react';
import './styles/App.css';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

const AuthContent: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <TodoList />;
    }

    return isLoginView ? (
        <Login switchToRegister={() => setIsLoginView(false)} />
    ) : (
        <Register switchToLogin={() => setIsLoginView(true)} />
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div className="App">
                <AuthContent />
            </div>
        </AuthProvider>
    );
};

export default App;
