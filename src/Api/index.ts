import ky from 'ky';
import { ITodo } from '../components/TodoList/types';

export async function getData() {
  try {
    const response: ITodo[] = await ky
      .get('http://localhost:3000/api/todos')
      .json();
    console.log(response);
    return response;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}
