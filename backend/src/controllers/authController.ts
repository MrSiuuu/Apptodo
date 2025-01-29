import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Créer le nouvel utilisateur
        const user = await UserModel.createUser(email, password);
        
        // Générer le token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        
        res.status(201).json({ 
            user: {
                id: user.id,
                email: user.email
            }, 
            token 
        });
    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Trouver l'utilisateur
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isValid = await UserModel.verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer le token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        
        res.json({ 
            user: {
                id: user.id,
                email: user.email
            },
            token 
        });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
}; 