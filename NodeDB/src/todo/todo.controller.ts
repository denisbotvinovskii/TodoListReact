import { Request, Response, Router } from 'express';
import { authMiddleware } from '../auth.middleware';
import { TodoService } from './todo.service';

const router = Router();
const todoService = new TodoService();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  if (!req.body.text.length) {
    res.status(400).json({ message: 'Text is required' });
  }
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getTodo();
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

export const todoRouter = router;
