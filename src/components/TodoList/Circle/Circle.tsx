import React from 'react';

export const CheckCircle: React.FC<{ checked: boolean }> = ({ checked }) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="20"
        stroke={checked ? 'green' : 'gray'}
        strokeWidth="5"
        fill={checked ? 'lightgreen' : 'white'}
      />

      {checked && (
        <polyline
          points="40,50 50,60 70,30"
          fill="none"
          stroke="green"
          strokeWidth="5"
        />
      )}
    </svg>
  );
};
