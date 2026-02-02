import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

const Alert = ({ type = 'info', message, title, onClose, autoClose = true, duration = 4000 }) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const alertConfig = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      textColor: 'text-green-800',
      titleColor: 'text-green-900',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-500',
      textColor: 'text-red-700',
      titleColor: 'text-red-900',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-700',
      titleColor: 'text-yellow-900',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-700',
      titleColor: 'text-blue-900',
    },
  };

  const config = alertConfig[type] || alertConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border ${config.bg} ${config.border} animate-in fade-in slide-in-from-top-4 duration-300`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
      <div className="flex-1">
        {title && <h3 className={`font-semibold ${config.titleColor}`}>{title}</h3>}
        <p className={config.textColor}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${config.textColor} hover:opacity-70`}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
