import React from 'react';
import { User, Shield, LogOut, ChevronRight, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';

interface ProfilePopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigateToSettings: () => void;
}

export const ProfilePopover = ({ isOpen, onClose, onLogout, onNavigateToSettings }: ProfilePopoverProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-4 w-80 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50 ring-1 ring-black/5"
          >
            {/* Profile Section */}
            <div className="p-8 bg-surface-container-low/50 border-b border-on-surface/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl">
                  <img 
                     src="https://i.pinimg.com/1200x/87/74/8f/87748f16c63d66482143b3bbf6373298.jpg"  
                    alt="Alexandra Sterling" 
                    className="w-full h-full object-cover grayscale-[0.2]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-on-surface text-lg tracking-tight">Bui Tien Dat</h4>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Thành viên Cao cấp</p>
                </div>
              </div>
            </div>

            {/* Options List */}
            <div className="py-4">
              <button 
                onClick={() => {
                  onNavigateToSettings();
                  onClose();
                }}
                className="w-full flex items-center gap-4 px-8 py-5 hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Settings size={20} />
                </div>
                <div className="flex-grow text-left">
                  <p className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors">Cài đặt hồ sơ</p>
                  <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">Quản lý atelier của bạn</p>
                </div>
                <ChevronRight size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
              </button>

              <button className="w-full flex items-center gap-4 px-8 py-5 hover:bg-primary/5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                  <Shield size={20} />
                </div>
                <div className="flex-grow text-left">
                  <p className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors">Giao thức bảo mật</p>
                  <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest">Chủ quyền & Quyền riêng tư</p>
                </div>
                <ChevronRight size={16} className="text-on-surface-variant group-hover:text-primary transition-colors" />
              </button>
            </div>

            {/* Footer Action */}
            <div className="p-8 border-t border-on-surface/5 bg-surface-container-low/30">
              <Button 
                variant="tertiary"
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-tertiary hover:bg-tertiary/5 transition-all active:scale-95 shadow-sm border border-tertiary/10"
              >
                <LogOut size={16} />
                Đăng xuất
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
