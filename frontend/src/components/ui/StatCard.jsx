import { motion } from 'framer-motion';

export default function StatCard({ label, value, hint, accent = 'primary' }) {
  const map = {
    primary: 'from-primary/30 to-primary/5',
    secondary: 'from-secondary/25 to-secondary/5',
    success: 'from-success/25 to-success/5',
    warning: 'from-warning/25 to-warning/5',
  };

  return (
    <motion.div whileHover={{ y: -4 }} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${map[accent]} p-5`}>
      <p className="text-sm text-textSub">{label}</p>
      <h3 className="number mt-2 text-3xl font-bold text-textMain">{value}</h3>
      {hint && <p className="mt-2 text-xs text-textSub">{hint}</p>}
    </motion.div>
  );
}
