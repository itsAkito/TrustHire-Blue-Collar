import React, { createContext, useState, useCallback } from 'react';
import Alert from './Alert';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback(
    ({ type = 'info', message, title, duration = 4000, autoClose = true }) => {
      const id = Date.now();
      setAlerts((prev) => [...prev, { id, type, message, title, duration, autoClose }]);
      return id;
    },
    []
  );

  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message, title = 'Success', duration = 4000) =>
      addAlert({ type: 'success', message, title, duration, autoClose: true }),
    [addAlert]
  );

  const showError = useCallback(
    (message, title = 'Error', duration = 4000) =>
      addAlert({ type: 'error', message, title, duration, autoClose: true }),
    [addAlert]
  );

  const showWarning = useCallback(
    (message, title = 'Warning', duration = 4000) =>
      addAlert({ type: 'warning', message, title, duration, autoClose: true }),
    [addAlert]
  );

  const showInfo = useCallback(
    (message, title = 'Info', duration = 4000) =>
      addAlert({ type: 'info', message, title, duration, autoClose: true }),
    [addAlert]
  );

  return (
    <AlertContext.Provider
      value={{
        addAlert,
        removeAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      {/* Alert Container */}
      <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-md">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            title={alert.title}
            autoClose={alert.autoClose}
            duration={alert.duration}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
