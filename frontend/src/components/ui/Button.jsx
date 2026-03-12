import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-primary hover:bg-primaryDark text-white shadow-glow',
    ghost: 'bg-white/5 hover:bg-white/10 text-textMain border border-white/10',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
