import { PrismaClient, Todo } from '@prisma/client';
import { ITodo } from './todo.types';

export class TodoService {
  private prisma = new PrismaClient();
  createTodo(todo: ITodo): Promise<Todo> {
    return this.prisma.todo.create({
      data: todo,
    });
  }
  getTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  deleteTodos(todos: ITodo[]) {
    const ids = todos.map((todo) => ({ checked: todo.checked }));
    return this.prisma.todo.deleteMany({
      where: {
        OR: ids,
      },
    });
  }
  patchTodo(updatedData: ITodo) {
    return this.prisma.todo.update({
      where: { id: updatedData.id },
      data: {
        checked: updatedData.checked,
      },
    });
  }
}
