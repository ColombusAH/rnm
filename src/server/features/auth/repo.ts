import { pool } from "../../db/pool";

class UserRepository {
    static async createUser(username: string, email: string,password: string) {
        const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *;';
        const values = [username, email, password];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findUserByUsername(username: string) {
        const query = 'SELECT * FROM users WHERE username = $1;';
        const values = [username];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findUserByEmail(email: string) {
        const query = 'SELECT * FROM users WHERE email = $1;';
        const values = [email];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findUserById(id: number) {
        const query = 'SELECT * FROM users WHERE id = $1;';
        const values = [id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

export default UserRepository;
