import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { equipmentCategories } from "../data/site";
import { SectionHeading } from "./ui/Section";

const Equipments = () => {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="The floor"
          title="World-class equipment"
          description="Commercial-grade machines and free weights for every style of training."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {equipmentCategories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to="/equipments"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-white/5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="font-display text-3xl font-bold uppercase">{item.title}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <ul className="flex flex-wrap gap-2 overflow-hidden">
                      {item.details.map((detail) => (
                        <li key={detail} className="chip mt-3 bg-ink-950/60 backdrop-blur">{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-400">
                    View equipment <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipments;
