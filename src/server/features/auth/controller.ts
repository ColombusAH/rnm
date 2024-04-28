import { Request, Response } from 'express';
import AuthService from './service';
import { remult } from 'remult';
import { Tenant } from '../../../shared/entities';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const { username, email,password } = req.body;
            const tenantRepo = remult.repo(Tenant);
            //find tenant by email
            const tenant = await tenantRepo.findOne({ where: {email: email} });
            if (tenant) {
                throw new Error('Creds error');
            }
            const newTenant = await tenantRepo.insert({email: email,name: username});
            console.log(newTenant);
            if (!newTenant) {
                throw new Error('creation : Creds error');
            }
            const user = await AuthService.register(username, email, password, newTenant.id, ['admin']);
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
