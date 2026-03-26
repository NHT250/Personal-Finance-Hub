import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User, Mail, Phone, Shield, Bell, Camera, ChevronRight, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

export const Settings = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter">Cài đặt Hồ Sơ</h1>
        <p className="text-on-surface-variant font-medium text-lg">Quản lý thông tin cá nhân và các giao thức bảo mật của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <Card variant="lowest" className="p-10 flex flex-col items-center text-center shadow-2xl border border-outline-variant/10">
            <div className="relative mb-8">
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary/10 shadow-inner">
                <img 
                  src="https://i.pinimg.com/1200x/87/74/8f/87748f16c63d66482143b3bbf6373298.jpg" 
                  alt="Bui Tien Dat" 
                  className="w-full h-full object-cover grayscale-[0.2]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-full shadow-2xl border-4 border-white active:scale-90 transition-transform">
                <Camera size={20} />
              </button>
            </div>
            <div className="space-y-1 mb-8">
              <h3 className="text-2xl font-headline font-bold text-on-surface">Bui Tien Dat</h3>
              <p className="text-on-surface-variant font-medium">dat@gmail.com</p>
            </div>
            <Button variant="tertiary" className="w-full border border-outline-variant/30 py-3 font-bold uppercase tracking-widest text-[10px]">
              Thay đổi Ảnh đại diện
            </Button>
          </Card>

          <Card variant="lowest" className="p-10 shadow-xl border border-outline-variant/10">
            <h4 className="font-headline font-bold text-primary mb-8 flex items-center gap-3">
              <Shield size={20} />
              Giao thức Bảo mật
            </h4>
            <div className="space-y-6">
              <button className="w-full flex items-center justify-between p-5 bg-surface-container-low rounded-2xl group hover:bg-primary/5 transition-all">
                <div className="text-left">
                  <p className="text-sm font-bold text-on-surface">Thay đổi Mật khẩu</p>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Cập nhật lần cuối 3 tháng trước</p>
                </div>
                <ChevronRight size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
              </button>
              <div className="flex items-center justify-between px-2">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-on-surface">Xác thực 2 Yếu tố</p>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Tăng cường Chủ quyền</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Forms & Preferences */}
        <div className="lg:col-span-2 space-y-10">
          {/* Personal Info */}
          <Card variant="lowest" className="p-10 shadow-2xl border border-outline-variant/10">
            <h4 className="font-headline font-bold text-primary mb-10 text-2xl tracking-tighter">Thông tin Cá nhân</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Họ và Tên"
                defaultValue="Alexandra Sterling"
                icon={<User size={18} />}
              />
              <Input
                label="Địa chỉ Email"
                defaultValue="alexandra@atelier.com"
                icon={<Mail size={18} />}
              />
              <div className="md:col-span-2">
                <Input
                  label="Số Điện thoại"
                  defaultValue="+84 901 234 567"
                  icon={<Phone size={18} />}
                />
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card variant="lowest" className="p-10 shadow-2xl border border-outline-variant/10">
            <h4 className="font-headline font-bold text-primary mb-10 text-2xl tracking-tighter">Tùy chọn Liên lạc</h4>
            <div className="space-y-6">
              {[
                { icon: Mail, title: 'Thông báo Email', desc: 'Bản tin tài chính hàng tuần và tóm tắt sổ cái.', checked: true },
                { icon: Bell, title: 'Thông báo Đẩy', desc: 'Cảnh báo tức thì cho các sự kiện dòng tiền quan trọng.', checked: false },
              ].map((pref) => (
                <div key={pref.title} className="flex items-center justify-between p-6 bg-surface-container-low rounded-2xl group hover:bg-white transition-all shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <pref.icon size={24} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-headline font-bold text-on-surface">{pref.title}</p>
                      <p className="text-xs text-on-surface-variant font-medium">{pref.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={pref.checked} />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-6 pt-4">
            <Button variant="tertiary" className="font-bold uppercase tracking-widest text-xs text-on-surface-variant hover:text-primary">
              Hủy Thay đổi
            </Button>
            <Button className="px-12 py-5 shadow-2xl shadow-primary/20">
              Lưu Cài đặt Atelier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
