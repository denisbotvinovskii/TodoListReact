import React from 'react';
import { CheckCircle } from '../Circle/Circle';
import { TodoT } from '../types';

export const Todo: React.FC<TodoT> = ({ title, checked }) => {
  return (
    <div className="todo">
      <CheckCircle checked={checked} />
      {title}
    </div>
  );
};
