import React, { useMemo, useState } from 'react';
import { Card } from '../components/Card';
import { Filter, ArrowUpDown, Calendar, ShoppingCart, CreditCard, Utensils, Car, Briefcase, BarChart3, Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { cn, formatCurrency } from '../lib/utils';
import { Transaction } from '../types';

interface TransactionsProps {
  transactions: Transaction[];
  onNewTransaction: () => void;
}

const categoryIcon = (category: string) => {
  switch (category) {
    case 'Mua sắm':
      return <ShoppingCart size={24} />;
    case 'Thu nhập':
      return <Briefcase size={24} />;
    case 'Ăn uống':
      return <Utensils size={24} />;
    case 'Hóa đơn':
      return <CreditCard size={24} />;
    case 'Di chuyển':
      return <Car size={24} />;
    default:
      return <ShoppingCart size={24} />;
  }
};

export const Transactions = ({ transactions, onNewTransaction }: TransactionsProps) => {
  const [filterType, setFilterType] = useState<'all' | 'date' | 'quarter'>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quarter, setQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q1');
  const [quarterYear, setQuarterYear] = useState<number>(new Date().getFullYear());

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [transactions]
  );

  const filtered = useMemo(() => {
    return sorted.filter((tx) => {
      const d = new Date(tx.date);

      if (filterType === 'date') {
        if (startDate && d < new Date(startDate)) return false;
        if (endDate && d > new Date(`${endDate}T23:59:59`)) return false;
      }

      if (filterType === 'quarter') {
        const quarterStartMonth = { Q1: 0, Q2: 3, Q3: 6, Q4: 9 }[quarter];
        const qStart = new Date(quarterYear, quarterStartMonth, 1);
        const qEnd = new Date(quarterYear, quarterStartMonth + 3, 0, 23, 59, 59, 999);
        if (d < qStart || d > qEnd) return false;
      }

      return true;
    });
  }, [sorted, filterType, startDate, endDate, quarter, quarterYear]);

  const groups = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return filtered.reduce<Record<string, Transaction[]>>((acc, tx) => {
      const key = formatter.format(new Date(tx.date));
      if (!acc[key]) acc[key] = [];
      acc[key].push(tx);
      return acc;
    }, {});
  }, [filtered]);

  const totalIncome = useMemo(() => filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [filtered]);
  const totalExpense = useMemo(() => filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [filtered]);
  const net = totalIncome - totalExpense;

  const clearFilters = () => {
    setFilterType('all');
    setStartDate('');
    setEndDate('');
    setQuarter('Q1');
    setQuarterYear(new Date().getFullYear());
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter">Giao dịch</h1>
          <p className="text-on-surface-variant font-medium text-lg">Xem và quản lý dòng tiền cá nhân của bạn</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex gap-2 flex-wrap items-center bg-surface-container-low p-2 rounded-full shadow-inner">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-full shadow-sm">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Quý</span>
              <select
                value={quarter}
                onChange={(e) => { setQuarter(e.target.value as 'Q1' | 'Q2' | 'Q3' | 'Q4'); setFilterType('quarter'); }}
                className="bg-transparent text-sm font-bold text-on-surface outline-none"
              >
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
              <input
                type="number"
                value={quarterYear}
                onChange={(e) => { setQuarterYear(Number(e.target.value)); setFilterType('quarter'); }}
                className="w-16 bg-transparent text-sm font-bold text-on-surface outline-none text-center"
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-lowest rounded-full">
              <Calendar size={16} className="text-primary" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setFilterType('date'); }}
                className="bg-transparent text-sm font-bold outline-none"
              />
              <span className="text-xs text-on-surface-variant">→</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setFilterType('date'); }}
                className="bg-transparent text-sm font-bold outline-none"
              />
            </div>

            <button
              onClick={clearFilters}
              className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary px-3"
            >
              Xóa lọc
            </button>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest" onClick={onNewTransaction}>
              <Plus size={16} className="mr-2" />
              Giao dịch mới
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-primary-container p-10 flex flex-col justify-between group overflow-hidden relative shadow-2xl shadow-primary/10">
          <div className="z-10 space-y-2">
            <p className="text-on-primary-container text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Tổng Thu nhập</p>
            <h3 className="text-4xl font-headline font-black text-white tracking-tighter">{formatCurrency(totalIncome)}</h3>
          </div>
          <div className="mt-10 flex items-center gap-2 z-10">
            <span className="px-3 py-1 bg-white/20 rounded-md text-white text-[10px] font-black">+12%</span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">so với tháng trước</span>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        </Card>

        <Card className="bg-tertiary-container p-10 flex flex-col justify-between group overflow-hidden relative shadow-2xl shadow-tertiary/10">
          <div className="z-10 space-y-2">
            <p className="text-on-tertiary-container text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Tổng Chi tiêu</p>
            <h3 className="text-4xl font-headline font-black text-white tracking-tighter">{formatCurrency(totalExpense)}</h3>
          </div>
          <div className="mt-10 flex items-center gap-2 z-10">
            <span className="px-3 py-1 bg-white/20 rounded-md text-white text-[10px] font-black">-5%</span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">tiết kiệm tuần này</span>
          </div>
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-black/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        </Card>

        <Card variant="lowest" className="p-10 shadow-xl flex flex-col justify-between border border-outline-variant/10">
          <div className="space-y-2">
            <p className="text-on-surface-variant text-[10px] font-black opacity-60 uppercase tracking-[0.2em]">Số dư ròng</p>
            <h3 className="text-4xl font-headline font-black text-primary tracking-tighter">{formatCurrency(net)}</h3>
          </div>
          <div className="mt-10 space-y-3">
            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(0,79,70,0.3)]"></div>
            </div>
            <p className="text-[10px] text-on-surface-variant font-black tracking-[0.1em] uppercase">65% Ngân sách đã sử dụng</p>
          </div>
        </Card>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Transaction List */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-headline font-extrabold text-on-surface tracking-tighter">Lịch Sử Giao Dịch</h2>
            <div className="flex gap-4">
              <button className="p-3 bg-surface-container-low rounded-xl hover:bg-surface-container transition-all shadow-sm">
                <Filter size={18} className="text-on-surface-variant" />
              </button>
              <button className="p-3 bg-surface-container-low rounded-xl hover:bg-surface-container transition-all shadow-sm">
                <ArrowUpDown size={18} className="text-on-surface-variant" />
              </button>
            </div>
          </div>

          <div className="space-y-12">
            {Object.entries(groups).map(([label, list]) => (
              <div key={label} className="space-y-6">
                <p className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.3em] pl-2">{label}</p>
                <div className="space-y-4">
                  {list.map((tx) => (
                    <Card key={tx.id} variant="lowest" className="p-6 flex items-center justify-between hover:shadow-2xl hover:bg-surface-bright transition-all cursor-pointer group border border-outline-variant/5">
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center shadow-inner",
                          tx.type === 'expense' ? "bg-tertiary-container/10 text-tertiary" : "bg-primary-container/10 text-primary"
                        )}>
                          {categoryIcon(tx.category)}
                        </div>
                        <div>
                          <p className="font-headline font-bold text-on-surface text-lg group-hover:text-primary transition-colors">{tx.title}</p>
                          <p className="text-xs text-on-surface-variant font-medium">{tx.category}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className={cn("text-xl font-headline font-black", tx.type === 'expense' ? "text-tertiary" : "text-primary")}>
                          {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
                        </p>
                        <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">
                          {new Date(tx.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {tx.method}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="lg:col-span-4 space-y-10">
          {/* Mini Calendar */}
          <Card variant="lowest" className="p-8 shadow-xl border border-outline-variant/5">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline font-extrabold text-on-surface">Lịch Tài chính</h2>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-surface-container-low rounded-full text-on-surface-variant transition-colors"><ArrowUpDown size={14} className="rotate-90" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-6">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                <span key={d} className="text-[10px] font-black text-on-surface-variant/30 uppercase tracking-widest">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: 28 }).map((_, i) => {
                const day = i + 1;
                const hasIncome = [10, 17].includes(day);
                const hasExpense = [3, 17, 24].includes(day);
                const isToday = day === 24;
                
                return (
                  <div key={i} className={cn(
                    "h-10 flex flex-col items-center justify-center text-xs font-bold rounded-xl relative transition-all",
                    isToday ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-on-surface-variant hover:bg-surface-container-low"
                  )}>
                    {day}
                    <div className="absolute bottom-1.5 flex gap-0.5">
                      {hasIncome && <span className={cn("w-1 h-1 rounded-full", isToday ? "bg-white" : "bg-primary")}></span>}
                      {hasExpense && <span className={cn("w-1 h-1 rounded-full", isToday ? "bg-white/60" : "bg-tertiary")}></span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Category Allocation */}
          <Card variant="low" className="p-8 border-none shadow-sm">
            <h2 className="font-headline font-bold text-primary mb-8">Phân bổ</h2>
            <div className="space-y-6">
              {[
                { label: 'Ăn uống', value: 45, color: 'bg-primary' },
                { label: 'Giải trí', value: 30, color: 'bg-tertiary' },
                { label: 'Dịch vụ', value: 15, color: 'bg-secondary' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                      <span className="text-on-surface">{item.label}</span>
                    </div>
                    <span className="text-on-surface-variant">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/40 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Smart Insight */}
          <Card className="p-8 bg-gradient-to-br from-primary to-primary-container text-white overflow-hidden shadow-2xl shadow-primary/20 relative">
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="font-headline font-bold text-lg">Trí tuệ Tài chính</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Bạn đã chi tiêu ít hơn 15% cho "Ăn uống" so với tuần trước. Dòng tiền của bạn đang trở nên tối ưu hơn.
                </p>
              </div>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-6">
                Xem Phân tích
              </Button>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <BarChart3 size={120} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
