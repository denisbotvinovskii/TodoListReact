import React, { useState } from 'react';
import { Todo } from './Todo/Todo';
import { Arrow } from './Arrow/Arrow';
import { Filter } from './Filter/Filter';
import { useTodos } from '../../Api';
import './TodoList.css';

export const TodoList: React.FC = () => {
  const { todos = [], isLoading, addTodo, deleteTodos, patchTodo } = useTodos();
  const [inputValue, setInputValue] = useState<string>('');
  const [isListExpanded, setIsListExpanded] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const activeTodos = todos.filter((todo) => !todo.checked);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTodoHandler = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      addTodoHandler();
    }
  };

  const handleToggleChecked = (index: number) => {
    const todoToUpdate = todos.find(
      (todo) => todo.id === filteredTodos[index].id
    );
    if (!todoToUpdate) return;
    patchTodo(todoToUpdate);
  };

  const handleClearCompleted = () => {
    deleteTodos();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.checked;
    if (filter === 'active') return !todo.checked;
    return true; // all
  });

  if (isLoading) return <div>Loading...</div>;

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
              <Todo id={todo.id} text={todo.text} checked={todo.checked} />
            </div>
          ))}
          {todos.length ? (
            <Filter
              count={activeTodos.length}
              setFilter={setFilter}
              clearCompleted={handleClearCompleted}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
