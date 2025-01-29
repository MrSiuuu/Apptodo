import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login: React.FC<{ switchToRegister: () => void }> = ({ switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                login(data.token);
            } else {
                alert('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Votre email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Votre mot de passe"
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Se connecter
                    </button>
                </form>
                <p className="switch-auth">
                    Pas de compte ? <button onClick={switchToRegister}>Créer un compte</button>
                </p>
            </div>
        </div>
    );
};

export default Login; 