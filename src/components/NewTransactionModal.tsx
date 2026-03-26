import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './Input';
import { Button } from './Button';
import { Transaction, TransactionType } from '../types';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: Transaction) => void;
}

const categories = ['Ăn uống', 'Di chuyển', 'Mua sắm', 'Hóa đơn', 'Thu nhập', 'Giải trí'];
const methods = ['Thẻ tín dụng', 'Chuyển khoản', 'Ví điện tử', 'Tiền mặt'];

export const NewTransactionModal = ({ isOpen, onClose, onSave }: NewTransactionModalProps) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState(categories[0]);
  const [method, setMethod] = useState(methods[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory(categories[0]);
    setMethod(methods[0]);
    setDate(new Date().toISOString().slice(0, 16));
    setNote('');
    setError('');
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Vui lòng nhập nội dung giao dịch');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Số tiền phải lớn hơn 0');
      return;
    }

    const tx: Transaction = {
      id: crypto.randomUUID(),
      title: title.trim(),
      category,
      amount,
      type,
      date: new Date(date).toISOString(),
      method,
    };

    onSave(tx);
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
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="w-full max-w-2xl bg-surface-bright rounded-xl ambient-shadow overflow-hidden">
              <div className="px-8 pt-10 pb-6 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Giao dịch mới</p>
                <h2 className="text-3xl font-headline font-extrabold text-primary tracking-tight">Thêm giao dịch</h2>
                <p className="text-on-surface-variant">Ghi nhận dòng tiền và cập nhật sổ cái ngay lập tức.</p>
                {error && <p className="text-tertiary text-sm font-semibold">{error}</p>}
              </div>

              <div className="px-8 pb-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Loại</label>
                    <div className="grid grid-cols-2 gap-3">
                      {([
                        { value: 'income', label: 'Thu' },
                        { value: 'expense', label: 'Chi' },
                      ] as const).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setType(opt.value)}
                          className={
                            `px-4 py-3 rounded-full font-bold text-sm transition-all border ` +
                            (type === opt.value
                              ? 'bg-primary text-white border-transparent shadow-lg shadow-primary/15'
                              : 'bg-surface-container-low text-on-surface-variant border-outline-variant/15 hover:bg-surface-container')
                          }
                          type="button"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Danh mục</label>
                    <select
                      className="w-full bg-surface-container-lowest rounded-md px-4 py-3 text-on-surface border border-outline-variant/15 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Input
                      label="Số tiền (VND)"
                      placeholder="0"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      label="Nội dung"
                      placeholder="Ví dụ: Cafe sáng, lương tháng..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Phương thức</label>
                    <select
                      className="w-full bg-surface-container-lowest rounded-md px-4 py-3 text-on-surface border border-outline-variant/15 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                    >
                      {methods.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Ngày giờ</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-surface-container-lowest rounded-md px-4 py-3 text-on-surface border border-outline-variant/15 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Ghi chú</label>
                    <textarea
                      className="w-full bg-surface-container-lowest rounded-md px-4 py-3 text-on-surface border border-outline-variant/15 focus:border-primary/40 focus:ring-2 focus:ring-primary/15 min-h-[96px]"
                      placeholder="Ghi chú thêm (tuỳ chọn)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-surface-container-low flex flex-col sm:flex-row gap-3 sm:justify-end">
                <Button variant="tertiary" onClick={() => { reset(); onClose(); }} className="px-8">
                  Hủy
                </Button>
                <Button onClick={handleSave} className="px-10">
                  Lưu giao dịch
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
