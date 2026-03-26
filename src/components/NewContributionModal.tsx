import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Goal } from '../types';
import { Button } from './Button';
import { formatCurrency } from '../lib/utils';

interface NewContributionModalProps {
  isOpen: boolean;
  goals: Goal[];
  defaultGoalId?: string;
  onClose: () => void;
  onSave: (goalId: string, amount: number) => void;
}

export const NewContributionModal = ({ isOpen, goals, defaultGoalId, onClose, onSave }: NewContributionModalProps) => {
  const firstGoalId = goals[0]?.id;
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>(defaultGoalId || firstGoalId);
  const [amount, setAmount] = useState<number | ''>('');
  const [error, setError] = useState('');

  const selectedGoal = useMemo(
    () => goals.find((g) => g.id === selectedGoalId) || goals[0],
    [goals, selectedGoalId]
  );

  const reset = () => {
    setAmount('');
    setError('');
  };

  const handleSave = () => {
    if (!selectedGoal) {
      setError('Vui lòng chọn mục tiêu');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Số tiền phải lớn hơn 0');
      return;
    }
    onSave(selectedGoal.id, amount);
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-on-surface/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { reset(); onClose(); }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
              <div className="p-8 pb-4 space-y-2">
                <h2 className="text-2xl font-headline font-extrabold tracking-tight text-primary">Thêm tiền vào mục tiêu</h2>
                <p className="text-on-surface-variant">Cập nhật nhanh tiến độ tiết kiệm của bạn.</p>
                {error && <p className="text-tertiary text-sm font-semibold">{error}</p>}
              </div>

              <div className="px-8 pb-8 space-y-8">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-on-surface-variant px-1">Chọn mục tiêu tiết kiệm</label>
                  <select
                    className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface border border-outline-variant/15 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                    value={selectedGoal?.id}
                    onChange={(e) => setSelectedGoalId(e.target.value)}
                  >
                    {goals.map((g) => (
                      <option key={g.id} value={g.id}>{g.title}</option>
                    ))}
                  </select>
                  {selectedGoal && (
                    <div className="flex items-center justify-between text-sm text-on-surface-variant bg-surface-container-lowest rounded-lg p-3 border border-outline-variant/10">
                      <span>Đã tích lũy: <span className="font-bold text-on-surface">{formatCurrency(selectedGoal.currentAmount)}</span></span>
                      <span>Mục tiêu: <span className="font-bold text-on-surface">{formatCurrency(selectedGoal.targetAmount)}</span></span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant px-1">Nhập số tiền (VND)</label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      className="w-full bg-surface-container-low rounded-xl p-4 pl-5 pr-16 text-2xl font-bold text-primary border border-outline-variant/15 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 outline-none placeholder:text-outline-variant/50"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <span className="absolute right-5 font-bold text-on-surface-variant">VND</span>
                  </div>
                  <p className="text-xs text-on-surface-variant px-1">Ví dụ: 1.000.000</p>
                </div>
              </div>

              <div className="px-8 py-6 bg-surface-container-low flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button variant="tertiary" onClick={() => { reset(); onClose(); }} className="px-8">
                  Hủy
                </Button>
                <Button onClick={handleSave} className="px-10">
                  Xác nhận
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
