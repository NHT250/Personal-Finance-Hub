import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

export default function ChartCard({ title, children }) {
  return (
    <motion.div whileHover={{ y: -3 }}>
      <GlassCard className="rounded-3xl border border-white/10">
        <h3 className="mb-4 text-lg font-semibold text-textMain">{title}</h3>
        <div className="h-72">{children}</div>
      </GlassCard>
    </motion.div>
  );
}
