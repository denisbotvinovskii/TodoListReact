import useSWR, { mutate } from 'swr';
import { ITodo } from '../components/TodoList/types';

const fetcher = (...args: [string | Request, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const url = `http://localhost:3000/api/todos`;

export function useTodos() {
  const { data, error, isLoading } = useSWR<ITodo[]>(url, fetcher);

  const addTodo = async (newTodoText: string) => {
    const newTodo: ITodo = { text: newTodoText };
    if (!data) return;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });

    mutate(url, [...data]);
  };

  const deleteTodos = async () => {
    if (!data) return;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Задачи не выбраны');
      }

      mutate(url, [...data]);
    } catch (error) {
      console.error(error);
    }
  };
  const patchTodo = async (todo: ITodo) => {
    if (!data) return;

    try {
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: todo.id,
          checked: !todo.checked,
        }),
      });

      mutate(url, [...data]);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    todos: data,
    isLoading,
    isError: error,
    addTodo,
    deleteTodos,
    patchTodo,
  };
}
