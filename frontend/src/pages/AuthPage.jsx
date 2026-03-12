import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function AuthPage({ mode = 'login' }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Người dùng demo', email: 'demo@pfh.app' }, 'demo-token');
    navigate('/app/dashboard');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="glass w-full max-w-md rounded-3xl p-8">
        <p className="mb-1 text-sm text-secondary">{isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}</p>
        <h1 className="mb-6 text-2xl font-semibold text-textMain">{isLogin ? 'Đăng nhập để tiếp tục' : 'Tham gia Trung tâm Tài chính Cá nhân'}</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && <InputField label="Họ và tên" placeholder="Nhập họ và tên" required />}
          <InputField label="Email" type="email" placeholder="ban@example.com" required />
          <InputField label="Mật khẩu" type="password" placeholder="••••••••" required />
          <Button type="submit" className="w-full">{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</Button>
        </form>
        <p className="mt-4 text-sm text-textSub">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <Link to={isLogin ? '/register' : '/login'} state={{ from: location.pathname }} className="text-secondary">
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </Link>
        </p>
      </div>
    </div>
  );
}
