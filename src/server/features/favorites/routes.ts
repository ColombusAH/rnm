import { Router, Request, Response } from 'express';
import axios from 'axios';
const router = Router();
const rimApi = 'https://rickandmortyapi.com/api/character'

router.get('/', async (req: Request, res: Response) => {
    try {
        const characters = await axios.get(rimApi).then(res => res.data);
        res.json(characters);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;
