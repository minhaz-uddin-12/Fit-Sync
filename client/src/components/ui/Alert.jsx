import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { useNotification } from '../../contexts/NotificationContext';

const styles = {
  success: { icon: FaCheckCircle, accent: 'text-emerald-400', bar: 'bg-emerald-400' },
  error: { icon: FaExclamationCircle, accent: 'text-red-400', bar: 'bg-red-400' },
  info: { icon: FaInfoCircle, accent: 'text-brand-400', bar: 'bg-brand-400' },
};

export const Alert = () => {
  const { notifications } = useNotification();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[70] flex w-full max-w-sm flex-col gap-3" aria-live="polite">
      <AnimatePresence>
        {notifications?.map(({ id, message, type }) => {
          const { icon: Icon, accent, bar } = styles[type] || styles.info;
          return (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              className="card pointer-events-auto relative flex items-start gap-3 overflow-hidden p-4 pl-5"
              role="status"
            >
              <span className={`absolute inset-y-0 left-0 w-1 ${bar}`} />
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${accent}`} />
              <p className="text-sm text-zinc-200">{message}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
