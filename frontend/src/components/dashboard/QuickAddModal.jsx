import { useState } from 'react';
import Modal from '../ui/Modal';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

export default function QuickAddModal({ open, onClose }) {
  const [type, setType] = useState('expense');

  const submit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} title="Thêm nhanh" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-textSub">Thêm giao dịch mới chỉ trong vài giây.</p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setType('expense')} className={`rounded-xl p-2 text-sm ${type === 'expense' ? 'bg-danger/20 text-danger' : 'bg-white/5 text-textSub'}`}>Chi tiêu</button>
          <button type="button" onClick={() => setType('income')} className={`rounded-xl p-2 text-sm ${type === 'income' ? 'bg-success/20 text-success' : 'bg-white/5 text-textSub'}`}>Thu nhập</button>
        </div>
        <InputField label="Tiêu đề" required placeholder="Ví dụ: Cà phê, Lương..." />
        <InputField label="Số tiền" type="number" required placeholder="Nhập số tiền" />
        <InputField label="Danh mục" required placeholder="Ví dụ: Ăn uống, Di chuyển..." />
        <Button className="w-full" type="submit">Thêm giao dịch</Button>
      </form>
    </Modal>
  );
}
