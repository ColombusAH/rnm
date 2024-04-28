import { Pool } from 'pg';

const connectionString = 'postgresql://admin:admin123@localhost:5432/rickmortydb'
const DATABASE_URL = process.env["DATABASE_URL"] || connectionString;

const pool = new Pool({
    connectionString: DATABASE_URL
});

export  {pool};