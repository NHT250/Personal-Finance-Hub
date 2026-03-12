import { useEffect, useMemo, useState } from 'react';
import { Camera, Edit3, KeyRound } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const defaultAvatar =
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=120&q=80';

export default function AccountPanel() {
  const { user, setUser, updateUser } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [toast, setToast] = useState('');

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [avatarUrl, setAvatarUrl] = useState('');
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('pfh_token');
        if (!token) return;

        let res;
        try {
          res = await api.get('/api/account');
        } catch {
          res = await api.get('/account');
        }

        const profile = res?.data?.data;
        if (profile) {
          setUser(profile);
          setForm({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '' });
          setAvatarUrl(profile.profile_image || '');
        }
      } catch {
        if (!user) {
          const demo = { name: 'Người dùng demo', email: 'demo@pfh.app', phone: '0123456789', profile_image: '' };
          setUser(demo);
          setForm({ name: demo.name, email: demo.email, phone: demo.phone });
        }
      }
    };

    load();
  }, []);

  const avatarPreview = useMemo(() => avatarUrl || user?.profile_image || defaultAvatar, [avatarUrl, user]);

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2200);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      let res;
      try {
        res = await api.put('/api/account', form);
      } catch {
        res = await api.put('/account', form);
      }
      updateUser(res?.data?.data || form);
      setOpenEdit(false);
      notify('Thông tin đã được cập nhật thành công!');
    } catch {
      notify('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const saveAvatar = async (e) => {
    e.preventDefault();
    try {
      const payload = { profile_image: avatarUrl };
      let res;
      try {
        res = await api.put('/api/account', payload);
      } catch {
        res = await api.put('/account', payload);
      }
      updateUser(res?.data?.data || payload);
      setOpenAvatar(false);
      notify('Thông tin đã được cập nhật thành công!');
    } catch {
      notify('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const uploadAvatarFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      try {
        await api.put('/api/account/password', passwordForm);
      } catch {
        await api.put('/account/password', passwordForm);
      }
      setPasswordForm({ current_password: '', new_password: '' });
      setOpenPassword(false);
      notify('Thông tin đã được cập nhật thành công!');
    } catch {
      notify('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  return (
    <>
      <aside className="glass mt-auto w-full rounded-2xl border border-white/10 bg-surface/75 p-3 shadow-card">
        <div className="flex items-start gap-3">
          <button onClick={() => setOpenAvatar(true)} className="relative shrink-0" aria-label="Thay đổi ảnh đại diện">
            <img src={avatarPreview} alt="Ảnh đại diện" className="h-14 w-14 rounded-full border border-white/20 object-cover" />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1 text-white"><Camera size={11} /></span>
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-textSub">Quản lý tài khoản</p>
            <p className="truncate font-semibold text-textMain">{user?.name || 'Người dùng'}</p>
            <p className="truncate text-xs text-textSub">{user?.email || 'Bạn chưa đăng nhập'}</p>
            <p className="text-xs text-textSub">{user?.phone || 'Chưa cập nhật số điện thoại'}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button variant="ghost" className="px-3 py-1 text-xs" onClick={() => setOpenEdit(true)}><Edit3 size={12} className="mr-1 inline" /> Chỉnh sửa</Button>
              <Button variant="ghost" className="px-3 py-1 text-xs" onClick={() => setOpenPassword(true)}><KeyRound size={12} className="mr-1 inline" /> Đổi mật khẩu</Button>
            </div>
          </div>
        </div>
      </aside>

      <Modal open={openEdit} title="Chỉnh sửa tài khoản" onClose={() => setOpenEdit(false)}>
        <form className="space-y-3" onSubmit={saveProfile}>
          <InputField label="Tên người dùng" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <InputField label="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
          <InputField label="Số điện thoại" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Ví dụ: 0123456789" />
          <Button className="w-full" type="submit">Lưu thay đổi</Button>
        </form>
      </Modal>

      <Modal open={openAvatar} title="Thay đổi ảnh đại diện" onClose={() => setOpenAvatar(false)}>
        <form className="space-y-3" onSubmit={saveAvatar}>
          <img src={avatarPreview} alt="Xem trước" className="mx-auto h-24 w-24 rounded-full border border-white/20 object-cover" />
          <InputField label="URL ảnh đại diện" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
          <label className="space-y-2 text-sm text-textSub">
            <span>Tải ảnh từ máy</span>
            <input type="file" accept="image/*" onChange={(e) => uploadAvatarFile(e.target.files?.[0])} className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain" />
          </label>
          <Button className="w-full" type="submit">Cập nhật ảnh đại diện</Button>
        </form>
      </Modal>

      <Modal open={openPassword} title="Đổi mật khẩu" onClose={() => setOpenPassword(false)}>
        <form className="space-y-3" onSubmit={changePassword}>
          <InputField label="Mật khẩu hiện tại" type="password" value={passwordForm.current_password} onChange={(e) => setPasswordForm((p) => ({ ...p, current_password: e.target.value }))} required />
          <InputField label="Mật khẩu mới" type="password" value={passwordForm.new_password} onChange={(e) => setPasswordForm((p) => ({ ...p, new_password: e.target.value }))} required />
          <Button className="w-full" type="submit">Cập nhật mật khẩu</Button>
        </form>
      </Modal>

      {toast && <div className="fixed bottom-24 right-5 z-50 rounded-xl border border-success/30 bg-success/20 px-4 py-2 text-sm text-success">{toast}</div>}
    </>
  );
}
