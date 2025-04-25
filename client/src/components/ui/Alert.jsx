import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../contexts/NotificationContext';

export const Alert = () => {
  const { notifications } = useNotification();

  if (!notifications?.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map(({ id, message, type }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg shadow-lg max-w-sm ${
              type === 'error' ? 'bg-red-500' :
              type === 'success' ? 'bg-green-500' :
              'bg-blue-500'
            } text-white`}
          >
            {message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
