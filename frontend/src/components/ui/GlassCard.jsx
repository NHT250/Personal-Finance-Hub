import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`glass rounded-2xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}
