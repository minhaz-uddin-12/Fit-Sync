import { Link } from "react-router-dom";

export function Logo({ className = "" }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="FitSync home">
      <img src="/Logo.svg" alt="" className="h-9 w-9 rounded-lg bg-white ring-1 ring-white/10 transition-transform duration-300 group-hover:rotate-[-8deg]" />
      <span className="font-display text-2xl font-bold uppercase tracking-wide text-white">
        Fit<span className="text-brand-500">Sync</span>
      </span>
    </Link>
  );
}
