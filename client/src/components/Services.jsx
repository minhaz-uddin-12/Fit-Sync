import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { services } from "../data/site";
import { SectionHeading } from "./ui/Section";

export function ServiceCard({ service, index, detailed = false }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="card card-hover group relative overflow-hidden p-8"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-500/20" />
      <span className="font-display text-sm font-semibold text-zinc-600">0{index + 1}</span>
      <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 ring-1 ring-brand-500/20 transition group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{service.desc}</p>
      {detailed && <p className="mt-4 border-t border-white/5 pt-4 text-sm text-zinc-500">{service.extra}</p>}
    </motion.article>
  );
}

function Services() {
  return (
    <section className="section relative bg-ink-900">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="What we offer"
            title="Programs built around you"
            description="From one-on-one coaching to nutrition guidance, every program is designed to fit your goals and schedule."
          />
          <Link to="/services" className="btn-secondary shrink-0">
            All services <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
