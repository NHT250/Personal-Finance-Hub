import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { formatCurrency, formatDate } from '../../utils/format';

export default function GoalCard({ goal }) {
  const progress = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100));
  const status = progress >= 80 ? 'Sắp hoàn thành' : progress >= 50 ? 'Đúng tiến độ' : 'Cần tăng tốc';

  return (
    <GlassCard>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-white/10 p-2 text-secondary"><Flag size={15} /></span>
          <h3 className="font-semibold text-textMain">{goal.title}</h3>
        </div>
        <span className="text-sm text-secondary">{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9 }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
      <p className="mt-3 text-sm text-textSub">{formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}</p>
      <p className="mt-1 text-xs text-textSub">Hạn: {formatDate(goal.deadline)} · {status}</p>
    </GlassCard>
  );
}
