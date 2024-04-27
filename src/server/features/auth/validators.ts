import { NextFunction, Request, Response } from "express";
import {z} from 'zod';

export const validateUserCreds = async (req: Request, res: Response, next: NextFunction)  => {
    const { email, password } = req.body;
    const userCreds = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    try {
        userCreds.parse({ email, password });
        next();
    } catch (error: any) {
        res.status(400).json({ message: error.errors });
    }
}