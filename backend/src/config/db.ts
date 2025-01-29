import pgPromise, { IDatabase, IMain } from 'pg-promise';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Configuration de la base de données
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: 6000,
    database: process.env.DB_NAME || 'todo',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Issakouyate2001@',
};

// Initialisation de pg-promise
const pgp: IMain = pgPromise();
const db: IDatabase<{}> = pgp(dbConfig);

export default db;
