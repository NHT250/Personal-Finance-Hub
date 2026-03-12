import { ArrowDownLeft, ArrowUpRight, UtensilsCrossed, ShoppingBag, Car, WalletCards } from 'lucide-react';
import { formatCurrency, formatDate, formatDateTime24 } from '../../utils/format';

const categoryIcons = {
  'Ăn uống': UtensilsCrossed,
  'Mua sắm': ShoppingBag,
  'Di chuyển': Car,
};

export default function TransactionRow({ tx, showTime = false }) {
  const statusText = tx.type === 'income' ? 'Thu nhập' : 'Chi tiêu';
  const DirectionIcon = tx.type === 'income' ? ArrowUpRight : ArrowDownLeft;
  const CategoryIcon = categoryIcons[tx.category] || WalletCards;

  return (
    <div className="grid grid-cols-4 items-center rounded-xl border border-white/10 bg-white/5 p-3 text-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/10">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-white/10 p-2 text-textSub">
          <CategoryIcon size={15} />
        </span>
        <div>
          <p className="text-textMain">{tx.title}</p>
          <p className="text-xs text-textSub">{tx.category}</p>
        </div>
      </div>
      <p className="text-textSub">{showTime ? formatDateTime24(tx.date) : formatDate(tx.date)}</p>
      <p className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${tx.type === 'income' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
        <DirectionIcon size={13} /> {statusText}
      </p>
      <p className={`justify-self-end text-base font-semibold ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
      </p>
    </div>
  );
}
