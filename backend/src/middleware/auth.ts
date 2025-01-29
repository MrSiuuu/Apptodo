import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt';

interface JwtPayload {
    userId: number;
}

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authMiddleware: RequestHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
}; 