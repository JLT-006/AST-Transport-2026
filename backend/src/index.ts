import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
import apiRoutes from './routes';

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('AST Backend is running!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
