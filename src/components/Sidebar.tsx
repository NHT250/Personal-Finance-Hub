import { LayoutDashboard, ReceiptText, Target, BarChart3, HelpCircle, LogOut, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './Button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onNewTransaction?: () => void;
}

export const Sidebar = ({ activeTab, onTabChange, onLogout, onNewTransaction }: SidebarProps) => {
  const navItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'transactions', label: 'Giao dịch', icon: ReceiptText },
    { id: 'goals', label: 'Mục tiêu', icon: Target },
    { id: 'analysis', label: 'Phân tích', icon: BarChart3 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 glassmorphism ambient-shadow p-8 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-12">
        <img
          src="https://cdn.postimage.me/2026/03/12/logo.png"
          alt="Emerald Ledger logo"
          className="w-10 h-10 rounded-md object-contain bg-white shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div>
          <h2 className="font-headline font-black text-primary leading-tight">PFH</h2>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold opacity-60">Ledger Atelier</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-300 group',
                isActive
                  ? 'bg-primary text-white shadow-xl shadow-primary/20'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              )}
            >
              <Icon size={20} className={cn('transition-transform duration-300', isActive && 'scale-110')} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-outline-variant/10 space-y-4">
        <Button className="w-full flex items-center gap-2" onClick={onNewTransaction}>
          <Plus size={18} />
          <span>Giao Dịch Mới</span>
        </Button>
        <div className="space-y-1">
          <button 
            onClick={() => onTabChange('support')}
            className={cn(
              "w-full flex items-center gap-4 px-6 py-3 transition-all text-sm font-medium",
              activeTab === 'support' ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
            )}
          >
            <HelpCircle size={18} />
            <span>Hỗ trợ</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-tertiary transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
