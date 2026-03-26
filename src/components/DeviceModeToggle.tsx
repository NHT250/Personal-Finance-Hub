import { useEffect, useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { Button } from './Button';

/**
 * DeviceModeToggle toggles a global "mobile-mode" class on the <html> element.
 * This lets CSS (index.css) switch layouts (hide sidebar, stack content, adjust paddings)
 * without forcing a full rerender of the app layout.
 */
export const DeviceModeToggle = () => {
  const [isMobileMode, setIsMobileMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isMobileMode) {
      root.classList.add('mobile-mode');
    } else {
      root.classList.remove('mobile-mode');
    }
    return () => {
      root.classList.remove('mobile-mode');
    };
  }, [isMobileMode]);

  return (
    <Button
      variant="secondary"
      size="sm"
      className="btn-mobile flex items-center gap-2 rounded-full"
      onClick={() => setIsMobileMode((v) => !v)}
      aria-pressed={isMobileMode}
    >
      {isMobileMode ? <Monitor size={16} /> : <Smartphone size={16} />}
      <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">
        {isMobileMode ? 'Desktop' : 'Điện thoại'}
      </span>
    </Button>
  );
};
