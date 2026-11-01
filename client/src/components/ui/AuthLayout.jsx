import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src="/Hero.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/30" />
        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
          <div className="flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="h-4 w-4" />
            ))}
          </div>
          <blockquote className="mt-5 max-w-lg font-display text-4xl font-semibold uppercase leading-tight text-white">
            &ldquo;The coaching and tracking kept me consistent. Best decision I&apos;ve made.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm text-zinc-400">John Doe · FitSync member</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 pb-16 pt-32 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-5xl font-bold uppercase tracking-tight">{title}</h1>
          {subtitle && <p className="mt-3 text-zinc-400">{subtitle}</p>}
          <div className="mt-10">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-zinc-400">{footer}</div>}
        </motion.div>
      </div>
    </section>
  );
}
