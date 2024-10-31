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

router.delete('/', async (req: Request, res: Response) => {
  try {
    const todosToDelete = (await todoService.getTodo()).filter(
      (todo) => todo.checked
    );
    const deletedTodos = await todoService.deleteTodos(todosToDelete);
    res.status(200).json(deletedTodos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при удалении задач');
  }
});

router.patch('/', async (req: Request, res: Response) => {
  const { id, checked } = req.body;

  const todoToUpdate = (await todoService.getTodo()).find(
    (todo) => todo.id === id
  );

  if (!todoToUpdate) {
    return;
  }

  try {
    const patchedTodo = await todoService.patchTodo({
      ...todoToUpdate,
      checked: checked !== undefined ? checked : todoToUpdate.checked,
    });

    res.status(200).json(patchedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при обновлении задачи');
  }
});

export const todoRouter = router;
