import dotenv from 'dotenv';
import express from 'express';
import { todoRouter } from './todo/todo.controller';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';
import compression from 'compression';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function main() {
  app.use(helmet());
  app.use(compression());
  app.use(express.json());

  app.use('/api/todos', todoRouter);

  app.get('/error', () => {
    throw new Error('Error');
  });

  app.all('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
