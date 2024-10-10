import React, { useState } from 'react';
import { TodoT } from './types';
import { Todo } from './Todo';
import './TodoList.css';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoT[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isListExpanded, setIsListExpanded] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTodoHandler();
    }
  };

  const addTodoHandler = () => {
    setTodos([...todos, { id: todos.length + 1, title: inputValue }]);
    setInputValue('');
  };

  const removeTodoHandler = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodoList = () => {
    setIsListExpanded((prev) => !prev);
  };

  return (
    <div className="todoList">
      <div className={`todoListHeader ${isListExpanded ? 'expanded' : ''}`}>
        <div className="arrow" onClick={toggleTodoList} />
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="What need to be done?"
        />
      </div>
      {isListExpanded && (
        <div className="todoItems">
          {todos.map((todo) => (
            <div
              className="todoOverlay"
              key={todo.id}
              onClick={() => removeTodoHandler(todo.id)}
            >
              <Todo id={todo.id} title={todo.title} />
            </div>
          ))}
          <div className="todoOverlay">Filter</div>
        </div>
      )}
    </div>
  );
};
