import { CalendarDays, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useMonth } from '../../context/MonthContext';

const periodButtons = [
  { id: 'todayBtn', value: 'day', label: 'Ngày hôm nay' },
  { id: 'thisWeekBtn', value: 'week', label: 'Tuần này' },
  { id: 'thisMonthBtn', value: 'month', label: 'Tháng này' },
  { id: 'thisYearBtn', value: 'year', label: 'Năm này' },
];

export default function Topbar({ title, subtitle = 'Làm chủ tiền bạc theo cách rõ ràng và chủ động hơn mỗi ngày.', action, showSearch = false }) {
  const {
    timePeriod,
    setPeriod,
    selectedDateDisplay,
    selectedRangeLabel,
    timePeriodDisplay,
    isCurrentPeriod,
    goToPreviousPeriod,
    goToNextPeriod,
    goToCurrentPeriod,
  } = useMonth();

  return (
    <div className="glass mb-5 rounded-3xl p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-textMain lg:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-textSub">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {showSearch && (
            <label className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-textSub">
              <Search size={15} />
              <input placeholder="Tìm nhanh..." className="w-32 bg-transparent text-textMain outline-none placeholder:text-textSub md:w-44" />
            </label>
          )}

          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-textSub" id="monthDisplay">
            <CalendarDays size={15} /> {selectedDateDisplay}
          </div>
          <div className="glass rounded-xl px-3 py-2 text-xs text-textSub" id="timePeriodDisplay">
            {timePeriodDisplay}: {selectedRangeLabel}
          </div>

          <button id="previousMonthBtn" type="button" onClick={goToPreviousPeriod} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-textMain transition hover:bg-white/10">
            <ChevronLeft size={14} className="mr-1 inline" />Trước
          </button>
          <button id="currentMonthBtn" type="button" onClick={goToCurrentPeriod} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-textMain transition hover:bg-white/10">
            Hiện tại
          </button>
          <button id="nextMonthBtn" type="button" onClick={goToNextPeriod} disabled={isCurrentPeriod} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-textMain transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-45">
            Sau<ChevronRight size={14} className="ml-1 inline" />
          </button>

          {periodButtons.map((period) => (
            <button
              key={period.value}
              id={period.id}
              type="button"
              onClick={() => setPeriod(period.value)}
              className={`rounded-xl px-3 py-2 text-sm transition ${timePeriod === period.value
                ? 'border border-primary/40 bg-primary/20 text-textMain'
                : 'border border-white/10 bg-white/5 text-textSub hover:bg-white/10 hover:text-textMain'
                }`}
            >
              {period.label}
            </button>
          ))}

          {action}
        </div>
      </div>
    </div>
  );
}
