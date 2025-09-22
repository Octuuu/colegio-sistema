import { useEffect } from 'react';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className={`fixed top-5 right-5 z-50 ${bgColor} text-white px-6 py-3 rounded shadow-lg animate-slideIn`}>
      {message}
    </div>
  );
};

export default Notification;
