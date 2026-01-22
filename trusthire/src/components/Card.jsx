import React from 'react';

const Card = ({ 
  title, 
  description, 
  image, 
  onClick, 
  children,
  variant = 'default',
  className = ''
}) => {
  const variantClasses = {
    default: 'border-l-4 border-gray-300',
    success: 'border-l-4 border-success',
    warning: 'border-l-4 border-warning',
    danger: 'border-l-4 border-danger',
    info: 'border-l-4 border-primary',
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden flex flex-col ${variantClasses[variant]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        {title && <h3 className="mb-2 font-semibold text-secondary">{title}</h3>}
        {description && <p className="mb-4 text-gray-500 text-sm">{description}</p>}
        {children && <div className="mt-auto">{children}</div>}
      </div>
    </div>
  );
};

export default Card;
