import express from "express";
import {favoriteRouter} from './features/favorites';
import { authRouter } from "./features/auth";
import { authMiddleware } from "./middlewares";
import helmet from "helmet"
import compression from "compression"
import path from "path"
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { sendEventsToAll, sseRouter } from "./sse/events-handler";
import { remultExpress } from 'remult/remult-express';
import { createPostgresDataProvider } from "remult/postgres"
import { Tenant, User, Client, Lead } from "../shared/entities";


const connectionString = 'postgresql://admin:admin123@localhost:5432/rickmortydb';
const DATABASE_URL = process.env["DATABASE_URL"] || connectionString;
const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src-attr': ["'unsafe-inline'"],
      },
    },
  })
)
app.use(compression())
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
  dataProvider: DATABASE_URL
   ? createPostgresDataProvider({ connectionString: DATABASE_URL })
   : undefined,
  // dataProvider: new SqlDatabase(new PostgresDataProvider(pool)), 
  
  entities: [Tenant, User, Client, Lead] 
})
// const swaggerSpec = swaggerJsdoc(options);


const openApiDocument = api.openApiDoc({ title: "remult-react-todo" });
// app.get("/api/openApi.json", (req, res) => res.json(openApiDocument));
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  
app.use('/api/auth',api.withRemult, authRouter);

app.use(authMiddleware);
app.use(api);

app.get('/api/me', (req, res) => {
  console.log('req.user', req.user);
  // res.json(req.user?.name);
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return res.json(req.user.name);
});

app.use(express.static(path.join(__dirname, '../rnm/browser')));
app.get('/*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../rnm/browser', 'index.html')
  );
});

export  { app };