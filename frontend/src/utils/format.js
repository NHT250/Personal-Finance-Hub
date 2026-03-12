export const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(amount) + ' đ';

export const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN');

export const formatDateTime24 = (date) =>
  new Date(date).toLocaleString('vi-VN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
