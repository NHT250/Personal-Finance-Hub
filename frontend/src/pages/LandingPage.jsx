import { motion } from 'framer-motion';
import { ArrowRight, Target, WalletCards, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroScene from '../components/three/HeroScene';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const features = [
  { icon: WalletCards, title: 'Quản lý dòng tiền', body: 'Thêm giao dịch trong dưới 5 giây với biểu mẫu thông minh.' },
  { icon: Target, title: 'Theo dõi mục tiêu', body: 'Biến kế hoạch tiết kiệm thành động lực trực quan và rõ ràng.' },
  { icon: LineChart, title: 'Phân tích tài chính', body: 'Biểu đồ dễ đọc cùng gợi ý ngắn gọn để ra quyết định tốt hơn.' },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:34px_34px] opacity-20" />
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <p className="inline-flex rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1 text-xs text-secondary">Fintech tối · 3D tinh gọn · Glassmorphism</p>
          <h1 className="text-4xl font-bold leading-tight text-textMain md:text-6xl">Trung tâm Tài chính Cá nhân cho thế hệ mới.</h1>
          <p className="max-w-lg text-lg text-textSub">Theo dõi chi tiêu, tăng tiết kiệm và hiểu rõ câu chuyện tài chính của bạn trong một không gian premium.</p>
          <div className="flex gap-3">
            <Link to="/register"><Button>Bắt đầu miễn phí <ArrowRight className="ml-2 inline" size={15} /></Button></Link>
            <Link to="/app/dashboard"><Button variant="ghost">Xem demo</Button></Link>
          </div>
        </motion.div>
        <HeroScene />
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GlassCard className="h-full">
              <feature.icon className="mb-4 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-textMain">{feature.title}</h3>
              <p className="text-sm text-textSub">{feature.body}</p>
            </GlassCard>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
