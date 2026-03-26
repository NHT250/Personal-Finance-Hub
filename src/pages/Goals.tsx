import { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { Progress } from '../components/Progress';
import { Button } from '../components/Button';
import { Plus, MoreVertical, ShieldCheck, Target, Calendar, RefreshCw, TrendingUp } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { Goal } from '../types';

interface GoalsProps {
  goals: Goal[];
  onOpenContribution: (goalId: string) => void;
  onOpenNewGoal: () => void;
}

export const Goals = ({ goals, onOpenContribution, onOpenNewGoal }: GoalsProps) => {
  const [activeFilter, setActiveFilter] = useState<'active' | 'completed' | 'archived'>('active');
  const filteredGoals = useMemo(() => goals.filter(g => g.status === activeFilter), [goals, activeFilter]);
  const featuredGoal = filteredGoals.find(g => g.priority === 'high') || filteredGoals[0];
  const otherGoals = filteredGoals.filter(g => g.id !== featuredGoal?.id);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-headline font-extrabold tracking-tight mb-2">Mục tiêu Tài chính</h1>
          <p className="text-on-surface-variant text-lg max-w-lg opacity-80">
            Biến kế hoạch thành tiến độ thực tế với các quỹ tài sản được quản lý chuyên nghiệp.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-low p-1.5 rounded-full self-start">
          {(['active', 'completed', 'archived'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-6 py-2.5 font-bold rounded-full transition-all text-sm capitalize",
                activeFilter === filter 
                  ? "bg-surface-container-lowest text-primary shadow-sm" 
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {filter === 'active' ? 'Đang thực hiện' : filter === 'completed' ? 'Đã hoàn thành' : 'Lưu trữ'}
            </button>
          ))}
        </div>
      </header>

      {featuredGoal ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Goal */}
          <div className="lg:col-span-8">
            <Card className="p-10 h-full flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-headline font-bold">{featuredGoal.title}</h3>
                      <p className="text-on-surface-variant">{featuredGoal.description || 'Kế hoạch tài chính dài hạn'}</p>
                    </div>
                  </div>
                  <span className={cn(
                    "px-4 py-1.5 text-[10px] font-bold rounded-full uppercase tracking-widest",
                    featuredGoal.priority === 'high' ? "bg-primary/10 text-primary" : "bg-surface-container-high text-on-surface-variant"
                  )}>
                    {featuredGoal.priority === 'high' ? 'Ưu tiên cao' : 'Ưu tiên trung bình'}
                  </span>
                </div>

                <div className="space-y-8 mb-12">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-on-surface-variant mb-2">Hiện tại / Mục tiêu</p>
                      <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                        <span className="text-4xl md:text-5xl font-headline font-extrabold text-primary">
                          {formatCurrency(featuredGoal.currentAmount)}
                        </span>
                        <span className="text-on-surface-variant text-lg md:text-xl">
                          / {formatCurrency(featuredGoal.targetAmount)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-headline font-bold text-primary">
                        {Math.round((featuredGoal.currentAmount / featuredGoal.targetAmount) * 100)}%
                      </p>
                    </div>
                  </div>
                  <Progress value={(featuredGoal.currentAmount / featuredGoal.targetAmount) * 100} className="h-4" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs uppercase tracking-wider font-bold">
                      <Calendar size={14} />
                      <span>Ngày bắt đầu</span>
                    </div>
                    <p className="font-bold">{featuredGoal.startDate || 'Chưa có'}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs uppercase tracking-wider font-bold">
                      <RefreshCw size={14} />
                      <span>Tần suất</span>
                    </div>
                    <p className="font-bold">{featuredGoal.frequency || 'Chưa có'}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs uppercase tracking-wider font-bold">
                      <TrendingUp size={14} />
                      <span>Lãi suất dự kiến</span>
                    </div>
                    <p className="font-bold">{featuredGoal.interestRate ? `${featuredGoal.interestRate}%` : 'Chưa có'}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs uppercase tracking-wider font-bold">
                      <Target size={14} />
                      <span>Danh mục</span>
                    </div>
                    <p className="font-bold">{featuredGoal.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between relative z-10 border-t border-outline-variant/30 pt-8">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Tài khoản nguồn</span>
                  <span className="font-bold">{featuredGoal.sourceAccount || 'Chưa thiết lập'}</span>
                </div>
                <Button size="lg" onClick={() => onOpenContribution(featuredGoal.id)}>Thêm Tiền</Button>
              </div>
            </Card>
          </div>

          {/* New Goal Card */}
          <div className="lg:col-span-4">
            <button
              onClick={onOpenNewGoal}
              className="h-full w-full bg-surface-container-low rounded-md p-10 flex flex-col justify-center items-center text-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-primary/5">
                <Plus size={32} />
              </div>
              <h4 className="font-headline font-bold text-2xl">Mục tiêu Tài sản Mới</h4>
              <p className="text-on-surface-variant mt-4 px-6 leading-relaxed">
                Bắt đầu một chương mới trong câu chuyện thịnh vượng của bạn ngay hôm nay.
              </p>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-low rounded-md border-2 border-dashed border-outline-variant/30">
          <p className="text-on-surface-variant text-xl">Không có mục tiêu nào trong danh mục này.</p>
          <Button className="mt-6" onClick={() => setActiveFilter('active')}>Xem mục tiêu đang thực hiện</Button>
        </div>
      )}

      {otherGoals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherGoals.map((goal) => (
            <Card key={goal.id} className="p-8 group hover:translate-y-[-8px] transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Target size={24} />
                </div>
                <button className="text-on-surface-variant/40 hover:text-on-surface transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <h4 className="text-2xl font-headline font-bold mb-1">{goal.title}</h4>
              <p className="text-sm text-on-surface-variant mb-8">{goal.category} • Hạn chót: {goal.deadline}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-medium">Tiến độ</span>
                  <span className="text-on-surface font-bold">{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                </div>
                <Progress value={(goal.currentAmount / goal.targetAmount) * 100} />
                
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">Đã tích lũy</p>
                    <p className="text-xl font-headline font-bold">{formatCurrency(goal.currentAmount)}</p>
                  </div>
                  <Button variant="tertiary" size="sm" className="px-4 py-2 border border-primary/20" onClick={() => onOpenContribution(goal.id)}>
                    Thêm tiền
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
