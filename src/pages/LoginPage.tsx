import React from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Lock, Eye, ArrowRight, Github } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onNavigateToSignUp: () => void;
}

export const LoginPage = ({ onLogin, onNavigateToSignUp }: LoginPageProps) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-container/20 rounded-full blur-[150px] pointer-events-none"></div>

      <main className="w-full max-w-[480px] z-10 animate-in fade-in zoom-in duration-500">
        {/* Brand Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 premium-gradient rounded-xl mb-6 shadow-2xl shadow-primary/10">
            <span className="font-headline font-black text-white text-3xl">PFH</span>
          </div>
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary mb-2">Chào mừng Trở lại</h1>
          <p className="text-on-surface-variant font-medium tracking-wide">PFH cho Sự giàu có của Bạn</p>
        </div>

        {/* Login Card */}
        <Card variant="lowest" className="p-10 md:p-12 shadow-2xl border border-outline-variant/10">
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-8">Đăng nhập</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <Input
              label="Email hoặc Số điện thoại"
              placeholder="ten@vidu.com"
              icon={<Mail size={18} />}
              type="text"
              required
            />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Mật khẩu</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">Quên mật khẩu?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/60">
                  <Lock size={18} />
                </div>
                <input
                  className="block w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-md focus:ring-2 focus:ring-primary/40 text-on-surface placeholder:text-on-surface-variant/40 transition-all ghost-border ghost-border-focus"
                  placeholder="••••••••"
                  type="password"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant/40 hover:text-on-surface transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full py-5 text-base mt-2">
              Đăng nhập vào Atelier
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-surface-container-lowest text-on-surface-variant/60 font-bold uppercase tracking-widest">Hoặc tiếp tục với</span>
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
          <p className="mt-10 text-center text-sm text-on-surface-variant font-medium">
            Mới sử dụng Atelier? 
            <button onClick={onNavigateToSignUp} className="text-primary font-bold hover:underline underline-offset-4 ml-2">
              Tạo tài khoản
            </button>
          </p>
        </Card>

        {/* Support Footer */}
        <footer className="mt-12 py-8 text-on-surface-variant/60 text-[10px] font-bold tracking-widest uppercase flex flex-wrap justify-center gap-8">
          <a href="#" className="hover:text-primary transition-colors">Bảo mật</a>
          <a href="#" className="hover:text-primary transition-colors">Điều khoản</a>
          <a href="#" className="hover:text-primary transition-colors">Hỗ trợ</a>
          <span>© 2024 Emerald Ledger</span>
        </footer>
      </main>
    </div>
  );
};
