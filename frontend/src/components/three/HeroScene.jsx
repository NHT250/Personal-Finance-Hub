import { motion } from 'framer-motion';

export default function HeroScene() {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-3xl md:h-96">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-secondary blur-[2px]"
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute bottom-8 left-8 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-textSub backdrop-blur-md">
        Năng lượng tài chính theo thời gian thực
      </div>
    </div>
  );
}
