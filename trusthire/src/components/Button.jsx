import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-blue-600',
    secondary: 'bg-gray-400 text-white hover:bg-gray-500',
    success: 'bg-success text-white hover:bg-green-600',
    danger: 'bg-danger text-white hover:bg-red-600',
    warning: 'bg-warning text-white hover:bg-yellow-600',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-6 py-2 text-base',
    large: 'px-8 py-3 text-lg',
  };

  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded transition-all duration-300 font-semibold disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
