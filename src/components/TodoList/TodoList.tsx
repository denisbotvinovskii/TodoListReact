import React, { useState } from 'react';
import { TodoT } from './types';
import { Todo } from './Todo/Todo';
import { Arrow } from './Arrow/Arrow';
import { Filter } from './Filter/Filter';
import './TodoList.css';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoT[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isListExpanded, setIsListExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const activeTodos = todos.filter((todo) => !todo.checked);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTodoHandler();
    }
  };

  const addTodoHandler = () => {
    setTodos([
      ...todos,
      { id: todos.length + 1, title: inputValue, checked: false },
    ]);
    setInputValue('');
  };

  const handleToggleChecked = (index: number) => {
    setTodos((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = {
        ...newItems[index],
        checked: !newItems[index].checked,
      };
      return newItems;
    });
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.checked));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.checked;
    if (filter === 'active') return !todo.checked;
    return true; // all
  });

  return (
    <div className="todoList">
      <div className="inputOverlay">
        <Arrow
          isListExpanded={isListExpanded}
          onToggle={() => setIsListExpanded((prev) => !prev)}
        />
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
        />
      </div>
      {isListExpanded && (
        <div className="todoItems">
          {filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              className="todoOverlay"
              onClick={() => handleToggleChecked(index)}
            >
              <Todo id={todo.id} title={todo.title} checked={todo.checked} />
            </div>
          ))}
          {todos.length ? (
            <Filter
              count={activeTodos.length}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
