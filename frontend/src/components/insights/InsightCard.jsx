import { Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function InsightCard({ text }) {
  return (
    <GlassCard className="border-primary/20">
      <div className="flex items-center gap-2 text-sm text-secondary">
        <Sparkles size={14} /> Phân tích nhanh
      </div>
      <p className="mt-2 text-textMain">{text}</p>
    </GlassCard>
  );
}
