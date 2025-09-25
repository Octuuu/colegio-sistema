import React from 'react';

const ActionButton = ({
  onClick,
  text,
  color = 'blue',
  size = 'sm',    
  rounded = true,
}) => {

  const colors = {
    blue: {
      text: 'text-blue-700',
      bg: 'bg-blue-100',
      hover: 'hover:bg-blue-200',
      border: 'border border-blue-300',
    },
    red: {
      text: 'text-red-700',
      bg: 'bg-red-100',
      hover: 'hover:bg-red-200',
      border: 'border border-red-300',
    },
    green: {
      text: 'text-green-700',
      bg: 'bg-green-100',
      hover: 'hover:bg-green-200',
      border: 'border border-green-300',
    },
    gray: {
      text: 'text-gray-700',
      bg: 'bg-gray-50',
      hover: 'hover:bg-gray-100',
      border: 'border border-gray-300',
    },
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${colors[color].text} ${colors[color].bg} ${colors[color].hover} ${colors[color].border}
        ${sizes[size]}
        ${rounded ? 'rounded' : ''}
        shadow-sm transition
      `}
    >
      {text}
    </button>
  );
};

export default ActionButton;
