import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Lock, User, ShieldCheck, Github } from 'lucide-react';

interface SignUpPageProps {
  onSignUp: () => void;
  onNavigateToLogin: () => void;
}

export const SignUpPage = ({ onSignUp, onNavigateToLogin }: SignUpPageProps) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary-container/20 rounded-full blur-[150px] pointer-events-none"></div>

      <main className="w-full max-w-[480px] z-10 animate-in fade-in zoom-in duration-500">
        {/* Brand Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 premium-gradient rounded-xl mb-6 shadow-2xl shadow-primary/10">
            <span className="font-headline font-black text-white text-3xl">PFH</span>
          </div>
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary mb-2">Tham gia PFH</h1>
          <p className="text-on-surface-variant font-medium tracking-wide">Bắt đầu hành trình làm chủ tài chính của bạn</p>
        </div>

        {/* Sign Up Card */}
        <Card variant="lowest" className="p-10 md:p-12 shadow-2xl border border-outline-variant/10">
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-8">Tạo Tài khoản</h2>
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSignUp(); }}>
            <Input
              label="Họ và Tên"
              placeholder="Alex Nguyen"
              icon={<User size={18} />}
              type="text"
              required
            />
            
            <Input
              label="Địa chỉ Email"
              placeholder="ten@vidu.com"
              icon={<Mail size={18} />}
              type="email"
              required
            />

            <Input
              label="Mật khẩu"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              type="password"
              required
            />

            <Input
              label="Xác nhận Mật khẩu"
              placeholder="••••••••"
              icon={<ShieldCheck size={18} />}
              type="password"
              required
            />

            <Button type="submit" className="w-full py-5 text-base mt-4">
              Bắt đầu Hành trình
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-surface-container-lowest text-on-surface-variant/60 font-bold uppercase tracking-widest">Hoặc đăng ký với</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 px-4 border border-outline-variant/30 rounded-md bg-surface-container-lowest hover:bg-surface-container-low transition-all group">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
              <span className="text-sm font-bold text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-4 px-4 border border-outline-variant/30 rounded-md bg-surface-container-lowest hover:bg-surface-container-low transition-all group">
              <Github size={20} className="text-on-surface" />
              <span className="text-sm font-bold text-on-surface">GitHub</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-on-surface-variant font-medium">
              Đã là thành viên? 
              <button onClick={onNavigateToLogin} className="text-primary font-bold hover:underline underline-offset-4 ml-2">
                Đăng nhập thay thế
              </button>
            </p>
          </div>
        </Card>

        {/* Support Footer */}
        <footer className="mt-10 py-8 text-on-surface-variant/60 text-[10px] font-bold tracking-widest uppercase flex flex-wrap justify-center gap-8">
          <a href="#" className="hover:text-primary transition-colors">Chính sách Bảo mật</a>
          <a href="#" className="hover:text-primary transition-colors">Điều khoản Dịch vụ</a>
          <span>© 2024 Emerald Ledger</span>
        </footer>
      </main>
    </div>
  );
};
