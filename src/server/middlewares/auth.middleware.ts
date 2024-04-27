import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AuthService from '../features/auth/service';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        const secret = process.env.JWT_SECRET || 'secret';
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            req.user = undefined;
            return next();
        }

        try {
            const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;
            const user = await AuthService.getUser(decoded.id);
            const userWithoutPassword = { ...user, password: undefined };
            console.log('[authMiddleware]',userWithoutPassword)
            req.user = userWithoutPassword;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
};
