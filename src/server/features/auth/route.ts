import { Router } from 'express';
import { AuthController } from './controller';
import { validateUserCreds } from './validators';

const router = Router();

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *   summary: Register a new user
 *  description: Register a new user
 *  requestBody:
 *      required: true
 */
router.post('/signup',validateUserCreds, AuthController.register);


/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   summary: Login a user
 *   requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *               password:
 *                  type: string
 *                  description: The user's password.
 *                  example: Bret
 */
router.post('/login',validateUserCreds, AuthController.login);

export default router;