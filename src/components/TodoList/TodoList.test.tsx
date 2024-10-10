import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from './TodoList';

describe('TodoList Component', () => {
  test('renders input field and button', () => {
    render(<TodoList />);
    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('can add a todo', () => {
    render(<TodoList />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });

    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(screen.getByText(/New Todo/i)).toBeInTheDocument();
  });

  test('can toggle todo checked state', () => {
    render(<TodoList />);

    // Add a todo first
    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // Toggle the checked state of the todo
    const todoElement = screen.getByText(/New Todo/i);
    fireEvent.click(todoElement);

    expect(todoElement).toHaveClass('checked'); // Assuming there is a 'checked' class when todo is checked
  });

  test('can filter todos', () => {
    render(<TodoList />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'Todo 1' } });
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    fireEvent.change(inputElement, { target: { value: 'Todo 2' } });
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // Toggle the first todo
    const todoElement1 = screen.getByText(/Todo 1/i);
    fireEvent.click(todoElement1);

    // Select completed filter
    const filterButton = screen.getByRole('button', { name: /completed/i }); // Update the button's name if different
    fireEvent.click(filterButton);

    expect(screen.queryByText(/Todo 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Todo 2/i)).toBeInTheDocument();
  });

  test('can clear completed todos', () => {
    render(<TodoList />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: 'Todo to be cleared' } });
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    // Mark it as completed
    const todoElement = screen.getByText(/Todo to be cleared/i);
    fireEvent.click(todoElement);

    // Clear completed todos
    const clearButton = screen.getByRole('button', {
      name: /clear completed/i,
    }); // Update the button's name if different
    fireEvent.click(clearButton);

    expect(screen.queryByText(/Todo to be cleared/i)).not.toBeInTheDocument();
  });
});
