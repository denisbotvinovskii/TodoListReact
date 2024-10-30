import React from 'react';
import { CheckCircle } from '../Circle/Circle';
import { ITodo } from '../types';

export const Todo: React.FC<ITodo> = ({ text, checked }) => {
  return (
    <div className="todo">
      <CheckCircle checked={checked} />
      {text}
    </div>
  );
};
