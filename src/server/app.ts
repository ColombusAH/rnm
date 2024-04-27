import express from "express";
import {favoriteRouter} from './features/favorites';
import { authRouter } from "./features/auth";
import { authMiddleware } from "./middlewares";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { sendEventsToAll, sseRouter } from "./sse/events-handler";
import { remultExpress } from 'remult/remult-express';
import { createPostgresDataProvider } from "remult/postgres"
import { Tenant } from "../shared/entities";
import { User } from "../shared/entities/user.entity";
import { Client } from "../shared/entities/client.entity";

const connectionString = 'postgresql://admin:admin123@localhost:5432/rickmortydb';

const app = express();
app.use(express.json());
app.use(cors())

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Rick and Morty AP',
      version: '1.0.0',
    },
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./**/*.ts'],
  };

const api  = remultExpress({
  getUser: req => req.user,
  dataProvider: createPostgresDataProvider({
    connectionString: connectionString,
  }),
  // dataProvider: new SqlDatabase(new PostgresDataProvider(pool)), 
  
  entities: [Tenant, User, Client] 
})
// const swaggerSpec = swaggerJsdoc(options);


const openApiDocument = api.openApiDoc({ title: "remult-react-todo" });
// app.get("/api/openApi.json", (req, res) => res.json(openApiDocument));
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  

app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
    
});
app.use(authMiddleware);
app.use(api);
app.get('/api/sse', () => {
    sendEventsToAll({message: 'Hello from the server!'});
});
app.use('/api/events', sseRouter)
app.use('/api/favorites', favoriteRouter);






export  {app};