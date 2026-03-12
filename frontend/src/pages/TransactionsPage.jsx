import { useCallback, useEffect, useMemo, useState } from 'react';
import { BellRing, CalendarDays, PlusCircle, SlidersHorizontal } from 'lucide-react';
import Topbar from '../components/layout/Topbar';
import TransactionRow from '../components/transactions/TransactionRow';
import { transactions as seedTransactions } from '../data/mockData';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import StatCard from '../components/ui/StatCard';
import Modal from '../components/ui/Modal';
import { formatCurrency } from '../utils/format';
import api from '../services/api';
import { useMonth } from '../context/MonthContext';

const categories = ['Ăn uống', 'Hóa đơn', 'Di chuyển', 'Mua sắm', 'Giải trí', 'Lương', 'Freelance', 'Khác'];

const getMonthMeta = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: firstDay.getDay() || 7,
    days: lastDay.getDate(),
  };
};

const normalizeTx = (tx) => ({
  ...tx,
  amount: Number(tx.amount || 0),
});

export default function TransactionsPage() {
  const [items, setItems] = useState(seedTransactions.map(normalizeTx));
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả danh mục');
  const [typeFilter, setTypeFilter] = useState('Tất cả');
  const {
    selectedMonthStart: activeMonth,
    currentMonthStart,
    setMonthFromInput,
    selectedMonthLabel,
    selectedRange,
    selectedRangeLabel,
    timePeriod,
    timePeriodDisplay,
    inSelectedPeriod,
  } = useMonth();
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    title: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Ăn uống',
    note: '',
    type: 'expense',
  });

  const periodLabel = timePeriod === 'month' ? selectedMonthLabel : selectedRangeLabel;

  const fetchMonthData = useCallback(async () => {
    const token = localStorage.getItem('pfh_token');
    if (!token) return;

    setLoadingMonth(true);
    const startDate = selectedRange.start.toISOString();
    const endDate = selectedRange.end.toISOString();

    try {
      let res;
      try {
        res = await api.get('/api/transactions', { params: { startDate, endDate } });
      } catch {
        res = await api.get('/transactions', { params: { startDate, endDate } });
      }

      const responseData = res?.data?.data;
      const txs = responseData?.transactions;
      if (Array.isArray(txs)) {
        setItems(txs.map(normalizeTx));
      }
    } catch {
      // fallback local dữ liệu mock nếu backend chưa sẵn sàng
    } finally {
      setLoadingMonth(false);
    }
  }, [selectedRange]);

  useEffect(() => {
    fetchMonthData();
  }, [fetchMonthData]);

  const filtered = useMemo(() => {
    return items.filter((tx) => {
      const txDate = new Date(tx.date);
      const inRange = inSelectedPeriod(txDate);
      const matchKeyword = tx.title.toLowerCase().includes(keyword.toLowerCase());
      const matchCategory = categoryFilter === 'Tất cả danh mục' || tx.category === categoryFilter;
      const matchType = typeFilter === 'Tất cả' || tx.type === typeFilter;
      return inRange && matchKeyword && matchCategory && matchType;
    });
  }, [items, keyword, categoryFilter, typeFilter, inSelectedPeriod]);

  const totals = useMemo(() => {
    const income = filtered.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const expense = filtered.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    return { income, expense, balance: income - expense };
  }, [filtered]);

  const budgetLimit = 3000000;
  const overBudget = totals.expense > budgetLimit;

  const calendarData = useMemo(() => {
    const map = new Map();
    filtered.forEach((tx) => {
      const day = new Date(tx.date).getDate();
      const prev = map.get(day) || { income: 0, expense: 0 };
      if (tx.type === 'income') prev.income += tx.amount;
      else prev.expense += tx.amount;
      map.set(day, prev);
    });
    return map;
  }, [filtered]);

  const { start, days } = getMonthMeta(activeMonth);
  const blanks = Array.from({ length: start - 1 });
  const dayCells = Array.from({ length: days }, (_, i) => i + 1);

  const openWithDate = (day) => {
    const date = new Date(activeMonth.getFullYear(), activeMonth.getMonth(), day);
    setForm((prev) => ({ ...prev, date: date.toISOString().slice(0, 10) }));
    setOpen(true);
  };


  const submit = (e) => {
    e.preventDefault();
    const newItem = {
      id: `tx-${Date.now()}`,
      title: form.title,
      amount: Number(form.amount),
      date: form.date,
      category: form.category,
      type: form.type,
      note: form.note,
    };
    setItems((prev) => [newItem, ...prev]);
    setOpen(false);
    setForm({ title: '', amount: '', date: form.date, category: 'Ăn uống', note: '', type: 'expense' });
    setToast('Đã thêm giao dịch thành công');
    setTimeout(() => setToast(''), 2200);
  };

  return (
    <div className="space-y-5">
      <Topbar title="Giao dịch" subtitle={`Theo dõi, nhập liệu và kiểm soát mọi khoản thu chi theo ${timePeriodDisplay.toLowerCase()}.`} action={<Button onClick={() => setOpen(true)}>Thêm giao dịch</Button>} showSearch />

      <PageHero
        badge="Trung tâm quản lý chi tiêu"
        title="Quản lý chi tiêu thông minh theo ngày, tuần và tháng"
        description="Nhập liệu nhanh theo danh mục, xem lịch tài chính trực quan và kiểm soát ngân sách với cảnh báo kịp thời."
        action={<Button onClick={() => setOpen(true)}>Nhập thu / chi</Button>}
        metricA={<><p className="text-xs text-textSub">Số giao dịch trong kỳ chọn</p><p className="mt-2 text-3xl font-semibold text-textMain">{filtered.length}</p></>}
        metricB={<><p className="text-xs text-textSub">Số dư trong kỳ chọn</p><p className="mt-2 text-3xl font-semibold text-textMain">{formatCurrency(totals.balance)}</p></>}
      />

      {overBudget && (
        <div className="glass flex items-center gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning">
          <BellRing size={18} /> Chi tiêu kỳ này đã vượt ngưỡng {formatCurrency(budgetLimit)}. Bạn nên giảm các khoản không thiết yếu.
        </div>
      )}

      <section className="glass rounded-3xl p-5 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-textMain">
            <CalendarDays size={18} className="text-secondary" />
            <h3 className="text-lg font-semibold">{periodLabel}</h3>
            {loadingMonth && <span className="text-xs text-textSub">Đang tải dữ liệu theo kỳ...</span>}
          </div>
          <div className="text-xs text-textSub">Đang xem theo {timePeriodDisplay.toLowerCase()}</div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Tổng giao dịch" value={`${filtered.length}`} hint={`Trong ${periodLabel}`} accent="secondary" />
        <StatCard label="Tổng chi kỳ đã chọn" value={formatCurrency(totals.expense)} hint="Chi tiêu đã ghi nhận" accent="warning" />
        <StatCard label="Tổng thu kỳ đã chọn" value={formatCurrency(totals.income)} hint="Thu nhập đã ghi nhận" accent="success" />
      </section>

      <section className="glass rounded-3xl p-5 lg:p-6">
        <div className="mb-4 flex items-center gap-2 text-textMain">
          <SlidersHorizontal size={16} className="text-secondary" />
          <h3 className="font-semibold">Bộ lọc báo cáo giao dịch</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-2 text-sm text-textSub xl:col-span-2">
            <span>Tìm kiếm giao dịch</span>
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Nhập tên giao dịch..." className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none ring-primary/60 focus:ring" />
          </label>
          <label className="space-y-2 text-sm text-textSub">
            <span>Danh mục</span>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              <option>Tất cả danh mục</option>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-textSub">
            <span>Loại giao dịch</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              <option>Tất cả</option>
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
          </label>
          <label className="space-y-2 text-sm text-textSub">
            <span>Tháng</span>
            <input
              type="month"
              value={`${activeMonth.getFullYear()}-${String(activeMonth.getMonth() + 1).padStart(2, '0')}`}
              max={`${currentMonthStart.getFullYear()}-${String(currentMonthStart.getMonth() + 1).padStart(2, '0')}`}
              onChange={(e) => setMonthFromInput(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none"
            />
          </label>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.25fr_1fr]">
        <div className="glass rounded-3xl p-5 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-textMain">Danh sách giao dịch</h3>
            <div className="flex items-center gap-2 text-xs text-textSub">
              <CalendarDays size={14} /> {periodLabel}
            </div>
          </div>
          <div className="mb-2 grid grid-cols-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-wide text-textSub">
            <span>Thông tin</span>
            <span>Ngày</span>
            <span>Loại</span>
            <span className="text-right">Số tiền</span>
          </div>
          <div className="space-y-2">
            {filtered.length ? filtered.map((tx) => <TransactionRow key={tx.id} tx={tx} showTime={timePeriod === 'day'} />) : <p className="text-sm text-textSub">Không tìm thấy giao dịch phù hợp trong kỳ đã chọn.</p>}
          </div>
        </div>

        <div className="glass rounded-3xl p-5 lg:p-6">
          <h3 className="text-lg font-semibold text-textMain">Lịch tài chính tháng</h3>
          <p className="mt-1 text-xs text-textSub">Nhấn vào ngày bất kỳ để nhập nhanh giao dịch cho ngày đó.</p>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-textSub">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => <div key={d}>{d}</div>)}
            {blanks.map((_, i) => <div key={`b-${i}`} />)}
            {dayCells.map((day) => {
              const row = calendarData.get(day) || { income: 0, expense: 0 };
              return (
                <button key={day} onClick={() => openWithDate(day)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-left transition hover:border-primary/40 hover:bg-white/10">
                  <p className="text-xs text-textMain">{day}</p>
                  <p className="mt-1 text-[10px] text-success">+{row.income ? formatCurrency(row.income) : '0 đ'}</p>
                  <p className="text-[10px] text-danger">-{row.expense ? formatCurrency(row.expense) : '0 đ'}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Modal open={open} title="Nhập liệu thu / chi" onClose={() => setOpen(false)}>
        <form className="space-y-3" onSubmit={submit}>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setForm((p) => ({ ...p, type: 'expense' }))} className={`rounded-xl p-2 text-sm ${form.type === 'expense' ? 'bg-danger/20 text-danger' : 'bg-white/5 text-textSub'}`}>Chi tiêu</button>
            <button type="button" onClick={() => setForm((p) => ({ ...p, type: 'income' }))} className={`rounded-xl p-2 text-sm ${form.type === 'income' ? 'bg-success/20 text-success' : 'bg-white/5 text-textSub'}`}>Thu nhập</button>
          </div>
          <InputField label="Tiêu đề" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Ví dụ: Tiền lương, Ăn sáng..." required />
          <InputField label="Số tiền" type="number" value={form.amount} onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))} placeholder="Nhập số tiền" required />
          <label className="space-y-2 text-sm text-textSub">
            <span>Danh mục</span>
            <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <InputField label="Ngày giao dịch" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} required />
          <InputField label="Ghi chú" value={form.note} onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))} placeholder="Ghi chú thêm (không bắt buộc)" />
          <Button className="w-full" type="submit"><PlusCircle size={15} className="mr-1 inline" />Lưu giao dịch</Button>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-success/30 bg-success/20 px-4 py-2 text-sm text-success">{toast}</div>}
    </div>
  );
}
