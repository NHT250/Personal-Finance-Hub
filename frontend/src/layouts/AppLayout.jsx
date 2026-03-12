import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

function AppAtmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-[-120px] top-1/3 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-1/3 h-80 w-80 rounded-full bg-primaryDark/20 blur-3xl" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[size:44px_44px] opacity-10" />
    </>
  );
}

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen px-3 py-4 lg:px-6 lg:py-6">
      <AppAtmosphere />

      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Mở menu điều hướng"
          aria-expanded={mobileOpen}
          aria-controls="mobile-sidebar"
          className="glass fixed left-4 top-4 z-50 rounded-xl p-2 text-textMain lg:hidden"
        >
          <Menu size={18} />
        </button>
      )}

      <div className="mx-auto flex w-full max-w-[1600px] gap-4 xl:gap-6">
        <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1 pt-12 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
