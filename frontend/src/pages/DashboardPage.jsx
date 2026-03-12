import { useMemo, useState } from 'react';
import { ArrowUpRight, Target } from 'lucide-react';
import { goals, monthlyData, transactions } from '../data/mockData';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import TransactionRow from '../components/transactions/TransactionRow';
import GoalCard from '../components/goals/GoalCard';
import QuickAddModal from '../components/dashboard/QuickAddModal';
import PageHero from '../components/ui/PageHero';
import StatCard from '../components/ui/StatCard';
import { formatCurrency } from '../utils/format';

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  const stats = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    const savingRate = totalIncome ? Math.round((balance / totalIncome) * 100) : 0;
    return { totalIncome, totalExpense, balance, savingRate };
  }, []);

  return (
    <div className="space-y-5">
      <Topbar title="Tổng quan tài chính" subtitle="Đây là bức tranh tài chính của bạn trong tháng này." action={<Button onClick={() => setOpen(true)}>Thêm nhanh</Button>} showSearch />

      <PageHero
        badge="Trang chủ điều khiển"
        title="Dòng tiền của bạn đang đi đúng hướng"
        description="Theo dõi thu chi, quan sát mục tiêu và nắm các tín hiệu quan trọng để ra quyết định tài chính tự tin hơn mỗi ngày."
        action={<Button onClick={() => setOpen(true)}>Thêm giao dịch</Button>}
        metricA={<><p className="text-xs text-textSub">Số dư hiện tại</p><p className="mt-2 text-3xl font-semibold text-textMain">{formatCurrency(stats.balance)}</p></>}
        metricB={<><p className="text-xs text-textSub">Mục tiêu đang theo dõi</p><p className="mt-2 text-3xl font-semibold text-textMain">{goals.length}</p></>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tổng thu nhập" value={formatCurrency(stats.totalIncome)} hint="Cập nhật theo giao dịch tháng này" accent="success" />
        <StatCard label="Tổng chi tiêu" value={formatCurrency(stats.totalExpense)} hint="Giữ nhịp chi tiêu hợp lý" accent="warning" />
        <StatCard label="Số dư còn lại" value={formatCurrency(stats.balance)} hint="Khoản còn lại sau chi tiêu" accent="primary" />
        <StatCard label="Tỷ lệ tiết kiệm" value={`${stats.savingRate}%`} hint="Tỷ lệ càng cao càng tốt" accent="secondary" />
      </section>

      <section className="grid gap-4 2xl:grid-cols-[1.45fr_1fr]">
        <div className="glass rounded-3xl p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-textMain">Giao dịch gần đây</h3>
            <span className="text-xs text-textSub">Cập nhật theo thời gian thực</span>
          </div>
          <div className="space-y-2">
            {transactions.length ? transactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />) : <p className="text-sm text-textSub">Chưa có giao dịch nào.</p>}
          </div>
        </div>

        <div className="glass rounded-3xl p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-textMain">Tiến độ mục tiêu</h3>
            <Target size={18} className="text-secondary" />
          </div>
          <div className="space-y-3">
            {goals.length ? goals.map((goal) => <GoalCard key={goal.id} goal={goal} />) : <p className="text-sm text-textSub">Bạn chưa tạo mục tiêu nào.</p>}
          </div>
        </div>
      </section>

      <section className="glass rounded-3xl p-5 lg:p-6">
        <div className="mb-4 flex items-center gap-2">
          <ArrowUpRight className="text-secondary" size={18} />
          <h3 className="text-lg font-semibold text-textMain">Phân tích nhanh</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-textSub">Xu hướng thu nhập</p>
            <p className="mt-2 text-textMain">Thu nhập tháng gần nhất đạt {formatCurrency(monthlyData[monthlyData.length - 1].income)} và vẫn tăng ổn định.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-textSub">Kiểm soát chi tiêu</p>
            <p className="mt-2 text-textMain">Chi tiêu hiện chiếm khoảng {Math.round((stats.totalExpense / Math.max(stats.totalIncome, 1)) * 100)}% thu nhập tháng.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-textSub">Động lực tiết kiệm</p>
            <p className="mt-2 text-textMain">Bạn đang duy trì nhịp tiết kiệm tốt. Hãy giữ đều để sớm đạt các mục tiêu lớn.</p>
          </div>
        </div>
      </section>

      <QuickAddModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
