import React from 'react';
import { Bell, Check, Info, AlertTriangle, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsPopover = ({ isOpen, onClose }: NotificationsPopoverProps) => {
  const alerts = [
    {
      id: '1',
      title: 'Đã nhận lương',
      desc: 'Khoản lương 35.000.000₫ tháng này đã về tài khoản.',
      time: '2 giờ trước',
      icon: TrendingUp,
      color: 'text-primary bg-primary/10',
      isNew: true
    },
    {
      id: '2',
      title: 'Vượt ngân sách Ăn uống',
      desc: 'Bạn đã vượt hạn mức ăn uống tháng thêm 250.000₫.',
      time: '5 giờ trước',
      icon: AlertTriangle,
      color: 'text-tertiary bg-tertiary/10',
      isNew: true
    },
    {
      id: '3',
      title: 'Tiến độ mục tiêu: Quỹ khẩn cấp đạt 70%',
      desc: 'Tuyệt vời! Bạn chỉ còn cách mục tiêu 35.000.000₫.',
      time: 'Hôm qua',
      icon: Check,
      color: 'text-secondary bg-secondary/10',
      isNew: false
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-4 w-96 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-outline-variant/20 overflow-hidden z-50 ring-1 ring-black/5"
          >
            <div className="px-8 py-6 border-b border-on-surface/5 flex justify-between items-center bg-surface-container-low/50">
              <h4 className="font-headline font-bold text-on-surface text-lg tracking-tight">Thông báo gần đây</h4>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                3 mới
              </span>
            </div>
            <div className="flex flex-col max-h-[480px] overflow-y-auto">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className="px-8 py-6 flex items-start gap-6 hover:bg-primary/5 transition-all cursor-pointer group border-b border-on-surface/5 last:border-0"
                >
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner", alert.color)}>
                    <alert.icon size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-headline font-bold text-on-surface leading-snug group-hover:text-primary transition-colors">
                      {alert.title}
                    </p>
                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                      {alert.desc}
                    </p>
                    <span className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-widest mt-2">
                      {alert.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-5 text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all border-t border-on-surface/5 bg-surface-container-low/30">
              Đánh dấu tất cả đã đọc
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
