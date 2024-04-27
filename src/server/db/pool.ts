import { Pool } from 'pg';

const pool = new Pool({
    connectionString: 'postgresql://admin:admin123@localhost:5432/rickmortydb'
});

export  {pool};