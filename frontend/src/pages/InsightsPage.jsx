import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import Topbar from '../components/layout/Topbar';
import ChartCard from '../components/insights/ChartCard';
import InsightCard from '../components/insights/InsightCard';
import { categoryData, monthlyData, transactions } from '../data/mockData';
import { formatCurrency } from '../utils/format';
import PageHero from '../components/ui/PageHero';
import StatCard from '../components/ui/StatCard';

const colors = ['#8B5CF6', '#22D3EE', '#10B981', '#F59E0B'];

const periodOptions = [
  { value: 'month', label: 'Theo tháng' },
  { value: 'week', label: 'Theo tuần' },
  { value: 'year', label: 'Theo năm' },
];

export default function InsightsPage() {
  const [period, setPeriod] = useState('month');
  const [category, setCategory] = useState('Tất cả danh mục');

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter((tx) => {
      const d = new Date(tx.date);
      const matchCategory = category === 'Tất cả danh mục' || tx.category === category;

      if (!matchCategory) return false;
      if (period === 'year') return d.getFullYear() === now.getFullYear();
      if (period === 'week') {
        const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
        return diff >= 0 && diff <= 7;
      }
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [period, category]);

  const report = useMemo(() => {
    const income = filteredTransactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
    const expense = filteredTransactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
    const saving = income - expense;
    const savingRate = income ? Math.round((saving / income) * 100) : 0;
    return { income, expense, saving, savingRate };
  }, [filteredTransactions]);

  const categoryReport = useMemo(() => {
    const map = new Map();
    filteredTransactions.forEach((tx) => {
      if (tx.type !== 'expense') return;
      map.set(tx.category, (map.get(tx.category) || 0) + tx.amount);
    });
    return map.size ? [...map.entries()].map(([name, value]) => ({ name, value })) : categoryData;
  }, [filteredTransactions]);

  const highestCategory = [...categoryReport].sort((a, b) => b.value - a.value)[0];
  const expenseChange = monthlyData.length > 1 ? Math.round(((monthlyData.at(-1).expense - monthlyData.at(-2).expense) / Math.max(monthlyData.at(-2).expense, 1)) * 100) : 0;

  return (
    <div className="space-y-5">
      <Topbar title="Báo cáo tài chính" subtitle="Theo dõi thu chi, tiết kiệm và xu hướng tài chính theo từng giai đoạn." showSearch />

      <PageHero
        badge="Báo cáo tài chính hàng tháng"
        title="Hiểu rõ dòng tiền của bạn qua từng con số"
        description="Xem tổng thu nhập, chi tiêu, tiết kiệm và phân tích theo danh mục để đưa ra quyết định tài chính tốt hơn."
        metricA={<><p className="text-xs text-textSub">Thu nhập hiện tại</p><p className="mt-2 text-2xl font-semibold text-textMain">{formatCurrency(report.income)}</p></>}
        metricB={<><p className="text-xs text-textSub">Chi tiêu hiện tại</p><p className="mt-2 text-2xl font-semibold text-textMain">{formatCurrency(report.expense)}</p></>}
      />

      <section className="glass rounded-3xl p-5 lg:p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm text-textSub">
            <span>Kiểu báo cáo</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              {periodOptions.map((opt) => <option value={opt.value} key={opt.value}>{opt.label}</option>)}
            </select>
          </label>
          <label className="space-y-2 text-sm text-textSub">
            <span>Danh mục</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none">
              <option>Tất cả danh mục</option>
              {[...new Set(transactions.map((t) => t.category))].map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </label>
          <StatCard label="Tiết kiệm" value={formatCurrency(report.saving)} hint="Thu nhập - Chi tiêu" accent="secondary" />
          <StatCard label="Tỷ lệ tiết kiệm" value={`${report.savingRate}%`} hint="Mức thay đổi theo báo cáo" accent="primary" />
        </div>
      </section>

      <section className="grid gap-4 2xl:grid-cols-2">
        <ChartCard title="Phân bổ chi tiêu theo danh mục">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryReport} dataKey="value" nameKey="name" outerRadius={95}>
                {categoryReport.map((entry, i) => <Cell key={entry.name} fill={colors[i % colors.length]} />)}
              </Pie>
              <Tooltip formatter={(value, name) => [formatCurrency(value), name]} labelFormatter={() => 'Danh mục'} />
              <Legend formatter={(value) => value} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="So sánh thu nhập và chi tiêu theo tháng">
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value, name) => [formatCurrency(value), name === 'income' ? 'Thu nhập' : 'Chi tiêu']} />
              <Legend formatter={(value) => (value === 'income' ? 'Thu nhập' : 'Chi tiêu')} />
              <Bar dataKey="income" name="Thu nhập" fill="#10B981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expense" name="Chi tiêu" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InsightCard text={`Danh mục chi lớn nhất hiện tại là ${highestCategory?.name || 'không có dữ liệu'} với ${formatCurrency(highestCategory?.value || 0)}.`} />
        <InsightCard text={`Chi tiêu thay đổi ${expenseChange >= 0 ? '+' : ''}${expenseChange}% so với tháng trước.`} />
        <InsightCard text={`Bạn đang duy trì tỷ lệ tiết kiệm ${report.savingRate}%. Hãy giữ nhịp ổn định để đạt mục tiêu nhanh hơn.`} />
      </section>

      <section className="glass rounded-3xl p-5 lg:p-6">
        <h3 className="text-lg font-semibold text-textMain">Tổng kết báo cáo</h3>
        <p className="mt-2 text-textSub">
          Trong kỳ báo cáo đang chọn, tổng thu nhập là <span className="text-textMain">{formatCurrency(report.income)}</span>, tổng chi tiêu là{' '}
          <span className="text-textMain">{formatCurrency(report.expense)}</span> và phần còn lại là <span className="text-textMain">{formatCurrency(report.saving)}</span>.
        </p>
      </section>
    </div>
  );
}
