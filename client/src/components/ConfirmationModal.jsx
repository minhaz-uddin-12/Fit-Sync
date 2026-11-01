import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaQuestion } from "react-icons/fa";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="card w-full max-w-md p-8 text-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
              <FaQuestion className="h-4 w-4" />
            </div>
            <h2 id="confirm-title" className="mt-5 font-display text-2xl font-bold uppercase">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{message}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button onClick={onClose} className="btn-secondary">{cancelLabel}</button>
              <button onClick={onConfirm} className="btn-primary">{confirmLabel}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmationModal;
