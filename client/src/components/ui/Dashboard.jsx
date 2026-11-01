import { motion } from "framer-motion";

export function DashboardShell({ eyebrow, title, subtitle, actions, children }) {
  return (
    <section className="min-h-screen pb-20 pt-28 sm:pt-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-8 sm:flex-row sm:items-end">
          <div>
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">{eyebrow}</p>}
            <h1 className="mt-2 font-display text-4xl font-bold uppercase sm:text-5xl">{title}</h1>
            {subtitle && <p className="mt-2 text-zinc-400">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-3">{actions}</div>}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function StatCard({ icon: Icon, label, value, hint, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-4 font-display text-4xl font-bold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </motion.div>
  );
}

export function Panel({ title, action, children, className = "" }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 font-semibold text-white">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-zinc-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
