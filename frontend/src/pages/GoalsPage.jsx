import { useEffect, useMemo, useState } from 'react';
import { Target } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import Button from '../components/ui/Button';
import GoalCard from '../components/goals/GoalCard';
import { goals as mockGoals } from '../data/mockData';
import PageHero from '../components/ui/PageHero';
import { formatCurrency } from '../utils/format';
import Modal from '../components/ui/Modal';
import InputField from '../components/ui/InputField';
import api from '../services/api';
import { useMonth } from '../context/MonthContext';

const statusOptions = ['Đang tiến hành', 'Hoàn thành', 'Chưa hoàn thành'];

const normalizeGoal = (goal) => ({
  id: goal.id || goal._id,
  title: goal.title || goal.goal_name,
  target_amount: Number(goal.target_amount || 0),
  current_amount: Number(goal.current_amount ?? goal.amount_saved ?? 0),
  deadline: goal.deadline || goal.completion_date,
  status: goal.status || 'Đang tiến hành',
});

const mapStatusFromProgress = (current, target) => {
  const ratio = target ? current / target : 0;
  if (ratio >= 1) return 'Hoàn thành';
  if (ratio >= 0.5) return 'Đang tiến hành';
  return 'Chưa hoàn thành';
};

export default function GoalsPage() {
  const { selectedMonthStart, selectedMonthLabel } = useMonth();
  const [goals, setGoals] = useState(mockGoals.map((g) => ({ ...g, status: mapStatusFromProgress(g.current_amount, g.target_amount) })));
  const [openCreate, setOpenCreate] = useState(false);
  const [openAddMoney, setOpenAddMoney] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [toast, setToast] = useState('');

  const [filters, setFilters] = useState({ search: '', status: 'Tất cả trạng thái', deadline: '', minSaved: '' });

  const [form, setForm] = useState({
    title: '',
    target_amount: '',
    current_amount: '',
    deadline: '',
    status: 'Đang tiến hành',
  });

  const [addAmount, setAddAmount] = useState('');

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const params = {
          search: filters.search || undefined,
          status: filters.status !== 'Tất cả trạng thái' ? filters.status : undefined,
          deadline_before: filters.deadline || undefined,
          min_saved: filters.minSaved || undefined,
        };

        let res;
        try {
          res = await api.get('/api/goals', { params });
        } catch {
          res = await api.get('/goals', { params });
        }

        const payload = res?.data?.data || [];
        setGoals(payload.map(normalizeGoal));
      } catch {
        // fallback: lọc local nếu backend chưa chạy
        const local = mockGoals
          .map((g) => ({ ...g, status: mapStatusFromProgress(g.current_amount, g.target_amount) }))
          .filter((g) => {
            const matchSearch = g.title.toLowerCase().includes(filters.search.toLowerCase());
            const matchStatus = filters.status === 'Tất cả trạng thái' || g.status === filters.status;
            const matchDeadline = !filters.deadline || new Date(g.deadline) <= new Date(filters.deadline);
            const matchMin = !filters.minSaved || g.current_amount >= Number(filters.minSaved);
            return matchSearch && matchStatus && matchDeadline && matchMin;
          });
        setGoals(local);
      }
    };

    loadGoals();
  }, [filters.search, filters.status, filters.deadline, filters.minSaved]);

  const goalsInMonth = useMemo(() => goals.filter((goal) => {
    if (!goal.deadline) return false;
    const d = new Date(goal.deadline);
    return d.getMonth() === selectedMonthStart.getMonth() && d.getFullYear() === selectedMonthStart.getFullYear();
  }), [goals, selectedMonthStart]);

  const visibleGoals = goalsInMonth.length ? goalsInMonth : goals;

  const totalTarget = visibleGoals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const totalCurrent = visibleGoals.reduce((sum, goal) => sum + goal.current_amount, 0);
  const progress = totalTarget ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  const highlighted = useMemo(() => [...visibleGoals].sort((a, b) => b.current_amount / b.target_amount - a.current_amount / a.target_amount)[0], [visibleGoals]);

  const saveGoal = async (e) => {
    e.preventDefault();
    const payloadFrontend = {
      title: form.title,
      target_amount: Number(form.target_amount),
      current_amount: Number(form.current_amount),
      deadline: form.deadline,
      status: form.status,
    };

    const payloadApiSpec = {
      goal_name: form.title,
      target_amount: Number(form.target_amount),
      amount_saved: Number(form.current_amount),
      completion_date: form.deadline,
      status: form.status,
    };

    try {
      try {
        await api.post('/api/goals', payloadApiSpec);
      } catch {
        await api.post('/goals', payloadFrontend);
      }

      const localGoal = {
        id: `local-${Date.now()}`,
        ...payloadFrontend,
      };
      setGoals((prev) => [localGoal, ...prev]);
      setToast('Đã tạo mục tiêu mới thành công');
      setOpenCreate(false);
      setForm({ title: '', target_amount: '', current_amount: '', deadline: '', status: 'Đang tiến hành' });
      setTimeout(() => setToast(''), 2200);
    } catch {
      setToast('Có lỗi xảy ra, vui lòng thử lại');
      setTimeout(() => setToast(''), 2200);
    }
  };

  const openAddMoneyModal = (goal) => {
    setSelectedGoal(goal);
    setAddAmount('');
    setOpenAddMoney(true);
  };

  const updateProgress = async (e) => {
    e.preventDefault();
    const amount = Number(addAmount);
    if (!selectedGoal || !amount || amount <= 0) return;

    try {
      try {
        await api.put(`/api/goals/${selectedGoal.id}`, { add_amount: amount });
      } catch {
        await api.put(`/goals/${selectedGoal.id}`, { current_amount: selectedGoal.current_amount + amount });
      }

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id !== selectedGoal.id) return goal;
          const nextCurrent = goal.current_amount + amount;
          return {
            ...goal,
            current_amount: nextCurrent,
            status: mapStatusFromProgress(nextCurrent, goal.target_amount),
          };
        })
      );

      setToast('Cập nhật tiến độ mục tiêu thành công');
      setOpenAddMoney(false);
      setTimeout(() => setToast(''), 2200);
    } catch {
      setToast('Có lỗi xảy ra, vui lòng thử lại');
      setTimeout(() => setToast(''), 2200);
    }
  };

  return (
    <div className="space-y-5">
      <Topbar title="Mục tiêu tiết kiệm" subtitle={`Tạo mục tiêu mới và theo dõi tiến độ trong ${selectedMonthLabel}.`} action={<Button onClick={() => setOpenCreate(true)}>Tạo mục tiêu mới</Button>} showSearch />

      <PageHero
        badge="Mục tiêu tài chính"
        title="Biến kế hoạch của bạn thành tiến độ thật sự"
        description="Tạo mục tiêu, cập nhật số tiền đã tiết kiệm và theo dõi tỷ lệ hoàn thành theo từng mốc thời gian."
        action={<Button onClick={() => setOpenCreate(true)}>Tạo mục tiêu</Button>}
        metricA={<><p className="text-xs text-textSub">Mục tiêu trong tháng chọn</p><p className="mt-2 text-3xl font-semibold text-textMain">{visibleGoals.length}</p></>}
        metricB={<><p className="text-xs text-textSub">Tổng tiến độ</p><p className="mt-2 text-3xl font-semibold text-textMain">{progress}%</p></>}
      />

      <section className="glass rounded-3xl p-5 lg:p-6">
        <h3 className="mb-3 font-semibold text-textMain">Lọc và tìm kiếm mục tiêu</h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm text-textSub">
            <span>Tìm kiếm</span>
            <input value={filters.search} onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))} placeholder="Nhập tên mục tiêu..." className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none" />
          </label>
          <label className="space-y-2 text-sm text-textSub">
            <span>Trạng thái</span>
            <select value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              <option>Tất cả trạng thái</option>
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-textSub">
            <span>Ngày hoàn thành trước</span>
            <input type="date" value={filters.deadline} onChange={(e) => setFilters((p) => ({ ...p, deadline: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none" />
          </label>
          <InputField label="Tiền đã tiết kiệm tối thiểu" type="number" value={filters.minSaved} onChange={(e) => setFilters((p) => ({ ...p, minSaved: e.target.value }))} placeholder="Ví dụ: 1000000" />
        </div>
      </section>

      {highlighted && (
        <section className="glass rounded-3xl p-6 lg:p-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-secondary">Mục tiêu nổi bật</p>
              <h3 className="text-2xl font-semibold text-textMain">{highlighted.title}</h3>
            </div>
            <Target className="text-secondary" />
          </div>
          <p className="text-sm text-textSub">Trạng thái: <span className="text-textMain">{highlighted.status}</span></p>
          <div className="mt-4 h-3 rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${Math.min(100, Math.round((highlighted.current_amount / highlighted.target_amount) * 100))}%` }} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-textSub">Đã tiết kiệm</p>
              <p className="mt-1 text-xl font-semibold text-textMain">{formatCurrency(highlighted.current_amount)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-textSub">Mục tiêu</p>
              <p className="mt-1 text-xl font-semibold text-textMain">{formatCurrency(highlighted.target_amount)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-textSub">Ngày hoàn thành</p>
              <p className="mt-1 text-xl font-semibold text-textMain">{new Date(highlighted.deadline).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {visibleGoals.length ? visibleGoals.map((goal) => <GoalCard key={goal.id} goal={goal} onAddMoney={openAddMoneyModal} />) : <p className="text-sm text-textSub">Không có mục tiêu phù hợp trong tháng đã chọn.</p>}
      </section>

      <Modal open={openCreate} title="Tạo mục tiêu tài chính" onClose={() => setOpenCreate(false)}>
        <form className="space-y-3" onSubmit={saveGoal}>
          <InputField label="Tên mục tiêu" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ví dụ: Quỹ khẩn cấp" required />
          <InputField label="Số tiền mục tiêu" type="number" value={form.target_amount} onChange={(e) => setForm((p) => ({ ...p, target_amount: e.target.value }))} placeholder="5000000" required />
          <InputField label="Số tiền đã tiết kiệm" type="number" value={form.current_amount} onChange={(e) => setForm((p) => ({ ...p, current_amount: e.target.value }))} placeholder="2900000" required />
          <InputField label="Ngày hoàn thành" type="date" value={form.deadline} onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))} required />
          <label className="space-y-2 text-sm text-textSub">
            <span>Trạng thái</span>
            <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
          <Button className="w-full" type="submit">Lưu mục tiêu</Button>
        </form>
      </Modal>

      <Modal open={openAddMoney} title="Cập nhật tiến độ mục tiêu" onClose={() => setOpenAddMoney(false)}>
        <form className="space-y-3" onSubmit={updateProgress}>
          <p className="text-sm text-textSub">Mục tiêu: <span className="text-textMain">{selectedGoal?.title}</span></p>
          <InputField label="Số tiền thêm vào" type="number" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} placeholder="Nhập số tiền" required />
          <Button className="w-full" type="submit">Cập nhật tiến độ</Button>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-success/30 bg-success/20 px-4 py-2 text-sm text-success">{toast}</div>}
    </div>
  );
}
