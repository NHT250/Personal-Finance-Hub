export default function InputField({ label, ...props }) {
  return (
    <label className="space-y-2 text-sm text-textSub">
      <span>{label}</span>
      <input
        className="w-full rounded-xl border border-white/10 bg-surface/70 px-3 py-2 text-textMain outline-none ring-primary/60 focus:ring"
        {...props}
      />
    </label>
  );
}
