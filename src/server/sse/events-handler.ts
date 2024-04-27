
import {Request, Response, NextFunction, Router} from 'express';


const facts: {}[] = [];
let clients: {
    response: any;id: number
}[] = [];

function eventsHandler(request: Request, response: Response, next: NextFunction) {
    const headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);
  
    const data = `data: ${JSON.stringify(facts)}\n\n`;
  
    response.write(data);
  
    const clientId = Date.now();
  
    const newClient = {
      id: clientId,
      response
    };
  
    clients.push(newClient);
  
    request.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter(client => client.id !== clientId);
    });
}

function sendEventsToAll(data: any) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(data)}\n\n`))
}

const router = Router();
router.get('/', eventsHandler);
  
export {router as sseRouter,sendEventsToAll};