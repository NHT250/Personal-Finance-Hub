import { Card } from '../components/Card';
import { Progress } from '../components/Progress';
import { Chip } from '../components/Chip';
import { MOCK_TRANSACTIONS, MOCK_GOALS } from '../constants';
import { TrendingUp, TrendingDown, Lightbulb, ArrowRight, Target } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { cn, formatCurrency } from '../lib/utils';

const data = [
  { name: 'T2', value: 4000000 },
  { name: 'T3', value: 3000000 },
  { name: 'T4', value: 2000000 },
  { name: 'T5', value: 2780000 },
  { name: 'T6', value: 1890000 },
  { name: 'T7', value: 2390000 },
  { name: 'CN', value: 3490000 },
];

export const Dashboard = () => {
  const featuredGoal = MOCK_GOALS.find(g => g.priority === 'high') || MOCK_GOALS[0];
  const goalProgress = Math.round((featuredGoal.currentAmount / featuredGoal.targetAmount) * 100);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl premium-gradient p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20">
        <div className="relative z-10 space-y-4 max-w-xl">
          <h1 className="font-headline text-4xl font-extrabold text-white leading-tight">
            Chào buổi sáng, DAT.
          </h1>
          <p className="text-white/80 text-lg font-medium">
            Câu chuyện tài chính của bạn đang rất khả quan. Bạn đã tiết kiệm nhiều hơn 15% so với tháng trước.
          </p>
          <div className="pt-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm backdrop-blur-md border border-white/10">
              Cập nhật 2 phút trước
            </span>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-md shadow-2xl">
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-2">Tổng số dư</p>
            <h2 className="font-headline text-4xl md:text-5xl font-black text-white tracking-tighter">
              {formatCurrency(124500000)}
            </h2>
            <div className="mt-8 flex gap-6">
              <div className="flex-1 bg-white/5 p-4 rounded-md border border-white/10">
                <p className="text-[10px] uppercase text-white/50 tracking-widest font-bold mb-1">Thu nhập</p>
                <p className="text-white font-bold text-xl">+{formatCurrency(12400000)}</p>
              </div>
              <div className="flex-1 bg-white/5 p-4 rounded-md border border-white/10">
                <p className="text-[10px] uppercase text-white/50 tracking-widest font-bold mb-1">Chi tiêu</p>
                <p className="text-white font-bold text-xl">-{formatCurrency(4200000)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card variant="low" className="flex flex-col justify-between h-48">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-primary text-white rounded-full">
              <TrendingUp size={20} />
            </div>
            <Chip variant="income">Thu nhập</Chip>
          </div>
          <div>
            <h3 className="font-headline text-3xl font-bold">{formatCurrency(85000000)}</h3>
            <p className="text-sm text-on-surface-variant mt-1">Trung bình hàng tháng</p>
          </div>
        </Card>

        <Card variant="low" className="flex flex-col justify-between h-48">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-tertiary text-white rounded-full">
              <TrendingDown size={20} />
            </div>
            <Chip variant="expense">Chi tiêu</Chip>
          </div>
          <div>
            <h3 className="font-headline text-3xl font-bold">{formatCurrency(42150000)}</h3>
            <p className="text-sm text-on-surface-variant mt-1">Ngân sách còn lại: {formatCurrency(12850000)}</p>
          </div>
        </Card>

        <Card variant="low" className="flex flex-col justify-between h-48">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-secondary-container text-on-secondary-container rounded-full">
              <Target size={20} />
            </div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Tiến độ Mục tiêu</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <h3 className="font-headline text-xl font-bold truncate max-w-[180px]">{featuredGoal.title}</h3>
              <span className="text-sm font-bold text-primary">{goalProgress}%</span>
            </div>
            <Progress value={goalProgress} />
          </div>
        </Card>
      </div>

      {/* Main Content Area: Transactions & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Transactions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-2xl font-bold">Giao dịch Gần đây</h3>
            <button className="text-primary font-bold text-sm flex items-center gap-2 hover:underline">
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-outline-variant/5">
              {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center p-6 hover:bg-surface-container-low transition-colors group cursor-pointer">
                  <div className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
                    tx.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-secondary-container text-on-secondary-container'
                  )}>
                    {tx.type === 'income' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  </div>
                  <div className="ml-6 flex-1">
                    <p className="font-bold text-lg text-on-surface">{tx.title}</p>
                    <p className="text-sm text-on-surface-variant">{tx.category} • {new Date(tx.date).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn('font-bold text-lg', tx.type === 'income' ? 'text-primary' : 'text-tertiary')}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">{tx.method}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analysis Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <h3 className="font-headline text-2xl font-bold">Phân tích Chi tiêu</h3>
          <Card className="p-8 space-y-8">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Tooltip
                    cursor={{ fill: '#f2f4f5' }}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 6 ? '#004f46' : '#bec9c5'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">Nhà ở</span>
                </div>
                <span className="text-sm font-bold">40%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  <span className="text-sm font-medium">Giải trí</span>
                </div>
                <span className="text-sm font-bold">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                  <span className="text-sm font-medium">Ăn uống</span>
                </div>
                <span className="text-sm font-bold">15%</span>
              </div>
            </div>
          </Card>

          {/* Insight Card */}
          <Card className="bg-tertiary text-white p-8 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <Lightbulb size={24} className="text-white/80" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Gợi ý từ Atelier</span>
              </div>
              <h4 className="font-headline font-bold text-xl">Giảm chi tiêu ăn uống 5%?</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                Nếu bạn giảm chi tiêu ăn uống bên ngoài chỉ 5%, bạn sẽ đạt được mục tiêu "{featuredGoal.title}" sớm hơn 2 tháng.
              </p>
              <button className="text-xs font-bold uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition-all">
                Tìm hiểu thêm
              </button>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};
