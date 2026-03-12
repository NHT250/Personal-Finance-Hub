import { LayoutDashboard, Target, ReceiptText, Sparkles, Wallet, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Tổng quan' },
  { to: '/app/transactions', icon: ReceiptText, label: 'Giao dịch' },
  { to: '/app/goals', icon: Target, label: 'Mục tiêu' },
  { to: '/app/insights', icon: Sparkles, label: 'Phân tích' },
];

function SidebarContent({ onNavigate, onClose, mobile = false }) {
  return (
    <>
      <div className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-r from-primary/20 to-secondary/10 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Wallet className="text-secondary" />
            <span className="text-lg font-bold text-textMain">PFH</span>
          </div>
          {mobile && (
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={onClose}
              className="rounded-xl bg-white/10 p-2 text-textSub hover:bg-white/20 hover:text-textMain"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-textSub">Không gian tài chính cá nhân hiện đại cho bạn.</p>
      </div>

      <nav className="space-y-2">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'border border-primary/50 bg-gradient-to-r from-primary/30 to-primary/10 text-white shadow-glow'
                  : 'border border-transparent text-textSub hover:border-white/10 hover:bg-white/5 hover:text-textMain'
              }`
            }
          >
            <span className="rounded-xl bg-white/5 p-2 group-hover:bg-white/10">
              <Icon size={16} />
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-xs text-textSub">
        Mẹo: dùng <span className="text-secondary">Thêm nhanh</span> để ghi lại giao dịch trong vài giây.
      </div>
    </>
  );
}

export default function Sidebar({ mobileOpen = false, onCloseMobile = () => {} }) {
  return (
    <>
      <aside className="glass sticky top-4 hidden h-[calc(100vh-2rem)] w-72 flex-col rounded-3xl p-4 lg:flex">
        <SidebarContent />
      </aside>

      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onCloseMobile} />
      <aside
        className={`glass fixed left-0 top-0 z-50 flex h-screen w-[86vw] max-w-xs flex-col rounded-r-3xl p-4 transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent mobile onNavigate={onCloseMobile} onClose={onCloseMobile} />
      </aside>
    </>
  );
}
