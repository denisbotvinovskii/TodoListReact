import React from 'react';
import '../TodoList.css';

type ArrowProps = {
  isListExpanded: boolean;
  onToggle: () => void;
};

export const Arrow: React.FC<ArrowProps> = ({ isListExpanded, onToggle }) => {
  return (
    <div className="arrow" onClick={onToggle}>
      {isListExpanded ? '▼' : '▲'}
    </div>
  );
};
