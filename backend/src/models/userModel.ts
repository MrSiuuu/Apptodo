import db from '../config/db';
import bcrypt from 'bcrypt';

export interface User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
}

export class UserModel {
    static async createUser(email: string, password: string): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return db.one(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
            [email, hashedPassword]
        );
    }

    static async findByEmail(email: string): Promise<User | null> {
        return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    }

    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
} 