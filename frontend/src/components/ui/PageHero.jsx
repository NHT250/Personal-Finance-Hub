import { motion } from 'framer-motion';

export default function PageHero({ badge, title, description, metricA, metricB, action }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative overflow-hidden rounded-3xl p-6 lg:p-8"
    >
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-16 right-20 h-44 w-44 rounded-full bg-secondary/15 blur-3xl" />
      <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {badge && <p className="mb-3 inline-flex rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary">{badge}</p>}
          <h2 className="text-2xl font-semibold leading-tight text-textMain lg:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-textSub lg:text-base">{description}</p>
          <div className="mt-5">{action}</div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {metricA && <div className="rounded-2xl border border-white/10 bg-white/5 p-4">{metricA}</div>}
          {metricB && <div className="rounded-2xl border border-white/10 bg-white/5 p-4">{metricB}</div>}
        </div>
      </div>
    </motion.section>
  );
}
