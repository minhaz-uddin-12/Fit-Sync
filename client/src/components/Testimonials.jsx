import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaArrowRight } from "react-icons/fa";
import { testimonials } from "../data/site";
import { SectionHeading } from "./ui/Section";

function Testimonials() {
  return (
    <>
      <section className="section bg-ink-900">
        <div className="container-x">
          <SectionHeading
            eyebrow="Testimonials"
            title="Real people. Real results."
            description="Hear from members who changed their routine and their lives with FitSync."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex flex-col p-8"
              >
                <div className="flex items-center justify-between">
                  <FaQuoteLeft className="h-7 w-7 text-brand-500/40" />
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-6 flex-1 text-base leading-relaxed text-zinc-200">
                  &ldquo;{t.review}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-white/5 pt-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-semibold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-zinc-500">{t.title}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/10 px-8 py-16 text-center sm:px-16"
          >
            <img src="/Hero.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/80 via-ink-950/80 to-ink-950" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="heading-lg">Your first step starts today</h2>
              <p className="lead mt-4 text-zinc-300">
                Create a free account, check your BMI and pick a plan. We&apos;ll handle the rest.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/register" className="btn-primary px-8 py-4">
                  Become a member <FaArrowRight className="h-3 w-3" />
                </Link>
                <Link to="/bmicalculator" className="btn-secondary px-8 py-4">Check your BMI</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
