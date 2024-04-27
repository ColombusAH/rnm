import { Request, Response } from 'express';
import AuthService from './service';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { username, email,password } = req.body;
            const user = await AuthService.register(username, email, password);
            res.status(201).json(user);
        } catch (error: any) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.login(email, password);
            res.json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
