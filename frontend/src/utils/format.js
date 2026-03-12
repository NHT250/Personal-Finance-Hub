export const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 }).format(amount) + ' đ';

export const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN');
