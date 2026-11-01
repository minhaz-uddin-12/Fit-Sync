import { motion } from "framer-motion";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export function SectionHeading({ eyebrow, title, description, align = "center", className = "" }) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <motion.div {...fadeUp} className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="heading-lg">{title}</h2>
      {description && <p className="lead">{description}</p>}
    </motion.div>
  );
}

export function PageHeader({ eyebrow, title, description, image }) {
  return (
    <header className="relative overflow-hidden border-b border-white/5 pb-16 pt-36 sm:pb-20 sm:pt-44">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
      )}
      <div className="absolute inset-0 bg-grid-fade bg-[size:56px_56px] mask-fade-b" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/70 to-ink-950" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]"
        aria-hidden="true"
      />
      <motion.div {...fadeUp} className="container-x relative flex flex-col items-center gap-5 text-center">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="heading-xl max-w-4xl">{title}</h1>
        {description && <p className="lead max-w-2xl">{description}</p>}
      </motion.div>
    </header>
  );
}
