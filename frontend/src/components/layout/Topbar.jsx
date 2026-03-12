import { CalendarDays, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useMonth } from '../../context/MonthContext';

export default function Topbar({ title, subtitle = 'Làm chủ tiền bạc theo cách rõ ràng và chủ động hơn mỗi ngày.', action, showSearch = false }) {
  const {
    selectedDateDisplay,
    isCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
  } = useMonth();

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

          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-textSub" id="monthDisplay">
            <CalendarDays size={15} /> {selectedDateDisplay}
          </div>

          <button id="previousMonthBtn" type="button" onClick={goToPreviousMonth} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-textMain transition hover:bg-white/10">
            <ChevronLeft size={14} className="mr-1 inline" />Tháng trước
          </button>
          <button id="currentMonthBtn" type="button" onClick={goToCurrentMonth} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-textMain transition hover:bg-white/10">
            Tháng này
          </button>
          <button id="nextMonthBtn" type="button" onClick={goToNextMonth} disabled={isCurrentMonth} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-textMain transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45">
            Tháng sau<ChevronRight size={14} className="ml-1 inline" />
          </button>

          {action}
        </div>
      </div>
    </div>
  );
}
