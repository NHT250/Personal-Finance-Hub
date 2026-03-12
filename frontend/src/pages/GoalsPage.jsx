import { Target } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import GoalCard from '../components/goals/GoalCard';
import { goals } from '../data/mockData';
import PageHero from '../components/ui/PageHero';
import { formatCurrency } from '../utils/format';

export default function GoalsPage() {
  const mainGoal = goals[0];
  const restGoals = goals.slice(1);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current_amount, 0);
  const progress = totalTarget ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  const getStatus = (goal) => {
    const pct = Math.round((goal.current_amount / goal.target_amount) * 100);
    if (pct >= 80) return 'Sắp hoàn thành';
    if (pct >= 50) return 'Đúng tiến độ';
    return 'Cần tăng tốc';
  };

  return (
    <div className="space-y-5">
      <Topbar title="Mục tiêu tiết kiệm" subtitle="Biến kế hoạch của bạn thành tiến độ thật sự." action={<Button>Tạo mục tiêu mới</Button>} />

      <PageHero
        badge="Không gian mục tiêu"
        title="Mỗi khoản tiết kiệm đều đang đưa bạn gần hơn tới kế hoạch lớn"
        description="Theo dõi tiến độ, ưu tiên đúng mục tiêu và giữ động lực tài chính lâu dài với các thẻ mục tiêu trực quan."
        action={<Button>Tạo mục tiêu</Button>}
        metricA={<><p className="text-xs text-textSub">Mục tiêu đang theo dõi</p><p className="mt-2 text-3xl font-semibold text-textMain">{goals.length}</p></>}
        metricB={<><p className="text-xs text-textSub">Tổng tiến độ</p><p className="mt-2 text-3xl font-semibold text-textMain">{progress}%</p></>}
      />

      {mainGoal && (
        <section className="glass rounded-3xl p-6 lg:p-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary">Mục tiêu nổi bật</p>
              <h3 className="text-2xl font-semibold text-textMain">{mainGoal.title}</h3>
            </div>
            <Target className="text-secondary" />
          </div>
          <p className="text-sm text-textSub">Trạng thái: <span className="text-textMain">{getStatus(mainGoal)}</span></p>
          <div className="mt-4 h-3 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${Math.min(100, Math.round((mainGoal.current_amount / mainGoal.target_amount) * 100))}%` }} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-textSub">Đã tiết kiệm</p>
              <p className="mt-1 text-xl font-semibold text-textMain">{formatCurrency(mainGoal.current_amount)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-textSub">Mục tiêu</p>
              <p className="mt-1 text-xl font-semibold text-textMain">{formatCurrency(mainGoal.target_amount)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-textSub">Hạn hoàn thành</p>
              <p className="mt-1 text-xl font-semibold text-textMain">{new Date(mainGoal.deadline).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {restGoals.length ? restGoals.map((goal) => <GoalCard key={goal.id} goal={goal} />) : <p className="text-sm text-textSub">Bạn chưa có thêm mục tiêu nào.</p>}
      </section>
    </div>
  );
}
