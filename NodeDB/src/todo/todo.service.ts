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
}
