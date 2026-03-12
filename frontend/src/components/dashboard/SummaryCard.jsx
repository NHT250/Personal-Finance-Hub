import GlassCard from '../ui/GlassCard';

export default function SummaryCard({ label, value, change, trend }) {
  return (
    <GlassCard>
      <p className="text-sm text-textSub">{label}</p>
      <h3 className="mt-1 text-2xl font-semibold text-textMain">{value}</h3>
      <p className={`mt-2 text-xs ${trend === 'up' ? 'text-success' : 'text-warning'}`}>{change} so với tháng trước</p>
    </GlassCard>
  );
}
