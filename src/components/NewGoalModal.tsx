import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from './Button';
import { Input } from './Input';
import { cn, formatCurrency } from '../lib/utils';

interface NewGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: {
    title: string;
    targetAmount: number;
    category?: string;
    deadline?: string;
    icon?: string;
  }) => void;
}

const ICON_OPTIONS = [
  { id: 'laptop', label: 'Công nghệ', icon: '📷' },
  { id: 'car', label: 'Phương tiện', icon: '🚗' },
  { id: 'home', label: 'Nhà ở', icon: '🏠' },
  { id: 'party', label: 'Sự kiện', icon: '🎉' },
  { id: 'health', label: 'Sức khỏe', icon: '💗' },
  { id: 'more', label: 'Khác', icon: '＋' },
];

export const NewGoalModal = ({ isOpen, onClose, onSave }: NewGoalModalProps) => {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState<number | ''>('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('Tiết kiệm');
  const [iconId, setIconId] = useState<string>('laptop');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setTargetAmount('');
      setDeadline('');
      setCategory('Tiết kiệm');
      setIconId('laptop');
      setError('');
    }
  }, [isOpen]);

  const selectedIcon = useMemo(() => ICON_OPTIONS.find((i) => i.id === iconId)?.icon, [iconId]);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Vui lòng nhập tên mục tiêu');
      return;
    }
    if (!targetAmount || targetAmount <= 0) {
      setError('Số tiền mục tiêu phải lớn hơn 0');
      return;
    }
    setError('');
    onSave({
      title: title.trim(),
      targetAmount,
      category,
      deadline,
      icon: selectedIcon,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-on-surface/35 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="w-full max-w-2xl bg-surface-bright rounded-xl ambient-shadow overflow-hidden">
              <div className="px-8 pt-10 pb-6 space-y-2">
                <h2 className="headline-font text-3xl font-extrabold text-primary tracking-tight">Tạo mục tiêu mới</h2>
                <p className="text-on-surface-variant font-medium">Bắt đầu hành trình tài chính mới của bạn một cách có kế hoạch.</p>
                {error && <p className="text-tertiary font-semibold text-sm">{error}</p>}
              </div>

              <div className="px-8 pb-10 space-y-6">
                <Input
                  label="Tên mục tiêu"
                  placeholder="Ví dụ: Mua MacBook Pro"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-surface-container-lowest border-none text-lg"
                />

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Số tiền mục tiêu (VND)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 focus:ring-primary/40 rounded-md px-5 pr-16 py-4 text-on-surface placeholder:text-outline text-lg font-mono outline-none"
                      placeholder="0"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-outline font-bold text-sm">VND</span>
                  </div>
                  {targetAmount ? (
                    <p className="text-xs text-on-surface-variant px-1">Dự kiến: {formatCurrency(targetAmount)}</p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Danh mục"
                    placeholder="Ví dụ: Giáo dục, Nhà ở"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-surface-container-lowest border-none"
                  />
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Hạn hoàn thành</label>
                    <input
                      type="date"
                      className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/15 focus:ring-primary/40 rounded-md px-4 py-3 text-on-surface outline-none"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Chọn biểu tượng</label>
                  <div className="flex flex-wrap gap-3">
                    {ICON_OPTIONS.map((option) => {
                      const isActive = option.id === iconId;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setIconId(option.id)}
                          className={cn(
                            'w-14 h-14 rounded-full border transition-all flex items-center justify-center text-xl',
                            isActive
                              ? 'bg-primary text-white border-primary'
                              : 'bg-surface-container-low text-on-surface-variant border-outline-variant/40 hover:border-primary/60 hover:text-primary'
                          )}
                          type="button"
                        >
                          <span>{option.icon}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="px-8 py-8 bg-surface-container-low flex flex-col-reverse sm:flex-row gap-4 sm:justify-end">
                <Button variant="tertiary" onClick={onClose} className="px-8">
                  Hủy
                </Button>
                <Button onClick={handleSave} className="px-10">
                  Tạo mục tiêu
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
