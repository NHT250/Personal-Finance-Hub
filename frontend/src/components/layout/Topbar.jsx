import { CalendarDays, Search } from 'lucide-react';

export default function Topbar({ title, subtitle = 'Làm chủ tiền bạc theo cách rõ ràng và chủ động hơn mỗi ngày.', action, showSearch = false }) {
  return (
    <div className="glass mb-5 rounded-3xl p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-textMain lg:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-textSub">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {showSearch && (
            <label className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-textSub">
              <Search size={15} />
              <input placeholder="Tìm nhanh..." className="w-32 bg-transparent text-textMain outline-none placeholder:text-textSub md:w-44" />
            </label>
          )}
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-textSub">
            <CalendarDays size={15} /> Tháng này
          </div>
          {action}
        </div>
      </div>
    </div>
  );
}
