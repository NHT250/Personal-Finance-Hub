import { createContext, useContext, useMemo, useState } from 'react';

const MonthContext = createContext(null);

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
const startOfYear = (d) => new Date(d.getFullYear(), 0, 1);
const endOfYear = (d) => new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);

const startOfWeek = (d) => {
  const date = startOfDay(d);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diffToMonday);
  return date;
};

const endOfWeek = (d) => {
  const start = startOfWeek(d);
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6, 23, 59, 59, 999);
};

const rangeByPeriod = (anchorDate, period) => {
  if (period === 'day') return { start: startOfDay(anchorDate), end: endOfDay(anchorDate) };
  if (period === 'week') return { start: startOfWeek(anchorDate), end: endOfWeek(anchorDate) };
  if (period === 'year') return { start: startOfYear(anchorDate), end: endOfYear(anchorDate) };
  return { start: startOfMonth(anchorDate), end: endOfMonth(anchorDate) };
};

const periodLabel = {
  day: 'Ngày hôm nay',
  week: 'Tuần này',
  month: 'Tháng này',
  year: 'Năm này',
};

export function MonthProvider({ children }) {
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [timePeriod, setTimePeriod] = useState('month');

  const today = useMemo(() => new Date(), []);
  const currentPeriodRange = useMemo(() => rangeByPeriod(today, timePeriod), [today, timePeriod]);
  const selectedRange = useMemo(() => rangeByPeriod(anchorDate, timePeriod), [anchorDate, timePeriod]);

  const isCurrentPeriod =
    selectedRange.start.getTime() === currentPeriodRange.start.getTime() &&
    selectedRange.end.getTime() === currentPeriodRange.end.getTime();

  const goToPreviousPeriod = () => {
    setAnchorDate((prev) => {
      if (timePeriod === 'day') return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 1);
      if (timePeriod === 'week') return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7);
      if (timePeriod === 'year') return new Date(prev.getFullYear() - 1, prev.getMonth(), prev.getDate());
      return new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
    });
  };

  const goToNextPeriod = () => {
    if (isCurrentPeriod) return;
    setAnchorDate((prev) => {
      if (timePeriod === 'day') return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1);
      if (timePeriod === 'week') return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7);
      if (timePeriod === 'year') return new Date(prev.getFullYear() + 1, prev.getMonth(), prev.getDate());
      return new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
    });
  };

  const goToCurrentPeriod = () => {
    setAnchorDate(new Date());
  };

  const setMonthFromInput = (yyyyMm) => {
    const selected = new Date(`${yyyyMm}-01`);
    if (Number.isNaN(selected.getTime())) return;
    const thisMonthStart = startOfMonth(today);
    if (selected > thisMonthStart) {
      setAnchorDate(today);
      setTimePeriod('month');
      return;
    }
    setAnchorDate(selected);
    setTimePeriod('month');
  };

  const setPeriod = (period) => {
    setTimePeriod(period);
    setAnchorDate(new Date());
  };

  const inSelectedPeriod = (dateInput) => {
    const d = new Date(dateInput);
    return d >= selectedRange.start && d <= selectedRange.end;
  };

  const value = useMemo(
    () => ({
      timePeriod,
      setPeriod,
      selectedRange,
      selectedDateDisplay: anchorDate.toLocaleDateString('vi-VN'),
      selectedRangeLabel:
        timePeriod === 'week'
          ? `${selectedRange.start.toLocaleDateString('vi-VN')} - ${selectedRange.end.toLocaleDateString('vi-VN')}`
          : selectedRange.start.toLocaleDateString('vi-VN'),
      timePeriodDisplay: periodLabel[timePeriod],
      isCurrentPeriod,
      goToPreviousPeriod,
      goToNextPeriod,
      goToCurrentPeriod,
      inSelectedPeriod,
      selectedMonthStart: startOfMonth(anchorDate),
      currentMonthStart: startOfMonth(today),
      selectedMonthLabel: startOfMonth(anchorDate).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
      setMonthFromInput,
    }),
    [timePeriod, selectedRange, anchorDate, isCurrentPeriod, today]
  );

  return <MonthContext.Provider value={value}>{children}</MonthContext.Provider>;
}

export const useMonth = () => useContext(MonthContext);
