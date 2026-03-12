import { createContext, useContext, useMemo, useState } from 'react';

const MonthContext = createContext(null);

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

export function MonthProvider({ children }) {
  const today = useMemo(() => new Date(), []);
  const currentMonthStart = useMemo(() => startOfMonth(today), [today]);
  const [selectedMonthStart, setSelectedMonthStart] = useState(currentMonthStart);

  const selectedDate = useMemo(() => {
    const lastDay = new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth() + 1, 0).getDate();
    const day = Math.min(today.getDate(), lastDay);
    return new Date(selectedMonthStart.getFullYear(), selectedMonthStart.getMonth(), day);
  }, [selectedMonthStart, today]);

  const isCurrentMonth =
    selectedMonthStart.getMonth() === currentMonthStart.getMonth() &&
    selectedMonthStart.getFullYear() === currentMonthStart.getFullYear();

  const goToPreviousMonth = () => {
    setSelectedMonthStart((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    if (isCurrentMonth) return;
    setSelectedMonthStart((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToCurrentMonth = () => {
    setSelectedMonthStart(currentMonthStart);
  };

  const setMonthFromInput = (yyyyMm) => {
    const selected = new Date(`${yyyyMm}-01`);
    if (Number.isNaN(selected.getTime())) return;
    if (selected > currentMonthStart) {
      setSelectedMonthStart(currentMonthStart);
      return;
    }
    setSelectedMonthStart(startOfMonth(selected));
  };

  const value = useMemo(
    () => ({
      selectedMonthStart,
      selectedDate,
      currentMonthStart,
      isCurrentMonth,
      goToPreviousMonth,
      goToNextMonth,
      goToCurrentMonth,
      setMonthFromInput,
      selectedMonthLabel: selectedMonthStart.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' }),
      selectedDateDisplay: selectedDate.toLocaleDateString('vi-VN'),
    }),
    [selectedMonthStart, selectedDate, currentMonthStart, isCurrentMonth]
  );

  return <MonthContext.Provider value={value}>{children}</MonthContext.Provider>;
}

export const useMonth = () => useContext(MonthContext);
