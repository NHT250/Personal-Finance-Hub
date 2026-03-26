import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { Input } from './Input';
import { NotificationsPopover } from './NotificationsPopover';
import { ProfilePopover } from './ProfilePopover';

interface TopBarProps {
  onLogout: () => void;
  onNavigateToSettings: () => void;
}

export const TopBar = ({ onLogout, onNavigateToSettings }: TopBarProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glassmorphism ambient-shadow flex items-center justify-between w-full px-10 h-24">
      <div className="flex-1 max-w-xl">
        <Input
          placeholder="Tìm kiếm giao dịch, mục tiêu..."
          icon={<Search size={18} />}
          className="bg-surface-container-low/50 rounded-full py-3"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors relative"
          >
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-surface"></span>
          </button>
          <NotificationsPopover 
            isOpen={isNotificationsOpen} 
            onClose={() => setIsNotificationsOpen(false)} 
          />
        </div>

        <button 
          onClick={onNavigateToSettings}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors"
        >
          <Settings size={22} />
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-3 pr-1 py-1 bg-surface-container-low/30 hover:bg-primary/5 rounded-full transition-all duration-300 group border border-on-surface/5"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-headline font-bold text-on-surface tracking-tight">DAT</p>
              <p className="text-[9px] font-black text-primary uppercase tracking-widest">Cao cấp</p>
            </div>
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer group-hover:border-primary transition-all shadow-lg">
              <img
                 src="https://i.pinimg.com/1200x/87/74/8f/87748f16c63d66482143b3bbf6373298.jpg" 
                alt="Profile"
                className="w-full h-full object-cover grayscale-[0.2]"
                referrerPolicy="no-referrer"
              />
            </div>
            <ChevronDown size={14} className="text-on-surface-variant/40 group-hover:text-primary transition-colors" />
          </button>
          <ProfilePopover 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            onLogout={onLogout}
            onNavigateToSettings={onNavigateToSettings}
          />
        </div>
      </div>
    </header>
  );
};
