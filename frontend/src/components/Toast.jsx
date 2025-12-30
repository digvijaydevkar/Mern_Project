import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  // Ensure message is always a string
  const displayMessage = typeof message === 'string' 
    ? message 
    : message?.message || message?.data || String(message);

  return (
    <div
      className={`fixed top-4 right-4 ${typeStyles[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3 min-w-[300px]`}
    >
      <span>{displayMessage}</span>
      <button
        onClick={onClose}
        className="ml-auto text-white hover:text-gray-200 font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;

