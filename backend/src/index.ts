import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import apiRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import prisma from './config/prisma';

const app: Express = express();
const port = process.env.PORT || 3001;

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('CORS: Origin not allowed'));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('AST Backend is running!');
});

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const shutdown = async (signal: string) => {
  console.log(`[server] ${signal} received — shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
