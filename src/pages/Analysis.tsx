import React from 'react';
import { Card } from '../components/Card';
import { Chip } from '../components/Chip';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, CheckCircle, Lightbulb, AlertTriangle, Sparkles, Download } from 'lucide-react';
import { Button } from '../components/Button';
import { formatCurrency } from '../lib/utils';

const barData = [
  { name: 'Th4', income: 95000000, expense: 62000000 },
  { name: 'Th5', income: 110000000, expense: 75000000 },
  { name: 'Th6', income: 105000000, expense: 82000000 },
  { name: 'Th7', income: 125000000, expense: 68000000 },
  { name: 'Th8', income: 115000000, expense: 72000000 },
  { name: 'Th9', income: 124500000, expense: 82300000 },
];

const pieData = [
  { name: 'Nhà ở', value: 40, color: '#004f46' },
  { name: 'Ăn uống', value: 25, color: '#48626e' },
  { name: 'Di chuyển', value: 20, color: '#822200' },
  { name: 'Khác', value: 15, color: '#bec9c5' },
];

export const Analysis = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Summary Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-1">
            <p className="text-primary font-bold tracking-widest text-[10px] uppercase">Phân tích chuyên sâu</p>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tighter">Hiểu rõ dòng tiền của bạn</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="low" className="p-6">
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Tổng Thu nhập</p>
              <p className="text-2xl font-headline font-black text-primary">{formatCurrency(124500000)}</p>
              <div className="flex items-center gap-1 text-primary text-[10px] mt-2 font-bold">
                <TrendingUp size={12} />
                <span>+12.5% so với tháng trước</span>
              </div>
            </Card>
            
            <Card variant="low" className="p-6">
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Tổng Chi tiêu</p>
              <p className="text-2xl font-headline font-black text-tertiary">{formatCurrency(82300000)}</p>
              <div className="flex items-center gap-1 text-tertiary text-[10px] mt-2 font-bold">
                <TrendingUp size={12} />
                <span>+4.2% so với tháng trước</span>
              </div>
            </Card>
            
            <Card variant="low" className="p-6">
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Số dư ròng</p>
              <p className="text-2xl font-headline font-black text-on-surface">{formatCurrency(42200000)}</p>
              <div className="flex items-center gap-1 text-primary text-[10px] mt-2 font-bold">
                <CheckCircle size={12} />
                <span>92% mục tiêu tiết kiệm</span>
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Card className="h-full bg-primary text-white p-8 relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-primary/20">
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-headline font-bold">Tóm tắt báo cáo</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Dựa trên dữ liệu tháng này, bạn đã tối ưu hóa 15% chi tiêu không cần thiết so với quý trước. Hãy duy trì đà này!
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 border-none shadow-lg px-8">
                <Download size={16} className="mr-2" />
                Tải xuống PDF
              </Button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </Card>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Comparison */}
        <Card variant="lowest" className="lg:col-span-7 p-8 shadow-xl border border-outline-variant/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-headline font-bold text-on-surface">Thu nhập vs Chi tiêu</h3>
            <select className="bg-surface-container-low border-none rounded-full text-[10px] font-bold py-2 px-4 focus:ring-0 uppercase tracking-widest">
              <option>6 tháng qua</option>
              <option>12 tháng qua</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e3e4" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#6e7976' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#6e7976' }}
                  tickFormatter={(value) => `₫${value / 1000000}Tr`}
                />
                <Tooltip 
                  cursor={{ fill: '#f2f4f5' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="income" fill="#004f46" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="expense" fill="#822200" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Thu nhập</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Chi tiêu</span>
            </div>
          </div>
        </Card>

        {/* Expense Distribution */}
        <Card variant="lowest" className="lg:col-span-5 p-8 shadow-xl border border-outline-variant/5">
          <h3 className="text-lg font-headline font-bold text-on-surface mb-8">Phân bổ chi tiêu</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em]">Tổng cộng</p>
              <p className="text-xl font-headline font-black text-on-surface">82.3Tr</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-xs font-medium text-on-surface">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Insights Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-headline font-extrabold text-on-surface tracking-tighter">Thông tin từ Atelier</h3>
          <Button variant="tertiary" size="sm" className="text-primary font-bold">Xem tất cả</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="low" className="p-8 space-y-6 group hover:bg-secondary-container/30 transition-all cursor-pointer border-none shadow-sm">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-secondary shadow-md group-hover:scale-110 transition-transform">
              <Lightbulb size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-on-surface text-lg">Tối ưu hóa lãi suất</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Bạn có ₫50Tr trong tài khoản thanh toán. Chuyển sang kế hoạch tiết kiệm linh hoạt có thể giúp bạn kiếm thêm ₫200,000 mỗi tháng.
              </p>
            </div>
          </Card>

          <Card variant="low" className="p-8 space-y-6 group hover:bg-tertiary-container/10 transition-all cursor-pointer border-none shadow-sm">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-tertiary shadow-md group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-on-surface text-lg">Cảnh báo chi tiêu</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Chi phí ăn uống của bạn đang vượt 15% ngân sách. Hãy cân nhắc một tuần tự nấu ăn tại nhà để cân bằng lại dòng tiền.
              </p>
            </div>
          </Card>

          <Card variant="low" className="p-8 space-y-6 group hover:bg-primary/5 transition-all cursor-pointer border-none shadow-sm">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-primary shadow-md group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-on-surface text-lg">Đầu tư thông minh</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Thị trường đang có sự điều chỉnh lành mạnh. Đây là thời điểm vàng để tái cân bằng danh mục đầu tư ETF tập trung vào ESG của bạn.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
