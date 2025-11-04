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
      border: 'border border-blue-400',
    },
    red: {
      text: 'text-red-700',
      bg: 'bg-red-100',
      hover: 'hover:bg-red-200',
      border: 'border border-red-400',
    },
    green: {
      text: 'text-green-700',
      bg: 'bg-green-100',
      hover: 'hover:bg-green-200',
      border: 'border border-green-400',
    },
    yellow: {
      text: 'text-yellow-700',
      bg: 'bg-yellow-100',
      hover: 'hover:bg-yellow-200',
      border: 'border border-yellow-400',
    },
    gray: {
      text: 'text-gray-700',
      bg: 'bg-gray-100',
      hover: 'hover:bg-gray-200',
      border: 'border border-gray-400',
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
        ${rounded ? 'rounded-xl' : ''}
        shadow-sm transition-colors duration-200
      `}
    >
      {text}
    </button>
  );
};

export default ActionButton;
