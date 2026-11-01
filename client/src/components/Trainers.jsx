import { motion } from "framer-motion";
import { FaEnvelope, FaClock, FaAward } from "react-icons/fa";
import { trainers } from "../data/site";
import { SectionHeading } from "./ui/Section";

export function TrainerCard({ trainer, index, detailed = false, onBook }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/4] overflow-hidden">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="h-full w-full object-cover object-top grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
        <span className="chip absolute left-4 top-4 border-brand-500/30 bg-ink-950/70 text-brand-300 backdrop-blur">
          {trainer.experience} experience
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-2">
        <h3 className="font-display text-2xl font-bold uppercase">{trainer.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-400">{trainer.role}</p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">{trainer.about}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {trainer.specialization.map((tag) => (
            <span key={tag} className="chip">{tag}</span>
          ))}
        </div>

        {detailed && (
          <>
            <dl className="mt-6 space-y-3 border-t border-white/5 pt-6 text-sm">
              <div className="flex gap-3">
                <FaAward className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <dd className="text-zinc-400">{trainer.certifications}</dd>
              </div>
              <div className="flex gap-3">
                <FaClock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <dd className="text-zinc-400">{trainer.availability}</dd>
              </div>
              <div className="flex gap-3">
                <FaEnvelope className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <a href={`mailto:${trainer.contact}`} className="text-zinc-300 hover:text-brand-400">{trainer.contact}</a>
              </div>
            </dl>
            <button onClick={() => onBook?.(trainer)} className="btn-primary mt-6 w-full">
              Book a session
            </button>
          </>
        )}
      </div>
    </motion.article>
  );
}

const Trainers = () => {
  return (
    <section className="section bg-ink-900">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our coaches"
          title="Meet your expert trainers"
          description="Certified professionals who bring years of experience and a lot of energy to every session."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {trainers.map((trainer, i) => (
            <TrainerCard key={trainer.id} trainer={trainer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
