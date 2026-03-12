import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ open, title, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="glass w-full max-w-md rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-textMain">{title}</h3>
              <button className="text-textSub hover:text-white" onClick={onClose}>✕</button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
