import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import { fadeUp } from "./ui/Section";

const highlights = [
  "Certified coaches for every goal",
  "Smart progress and workout tracking",
  "Flexible plans with no hidden fees",
  "Open early, close late, seven days a week",
];

const marquee = ["Strength", "Cardio", "HIIT", "Mobility", "Nutrition", "Yoga", "Conditioning", "Recovery"];

const Welcome = () => {
  return (
    <>
      <div className="overflow-hidden border-y border-white/5 bg-brand-500 py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-wide text-ink-950">
          {[...marquee, ...marquee].map((word, i) => (
            <span key={i} className="flex items-center gap-10">
              {word} <span className="text-white">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <motion.div {...fadeUp} className="flex flex-col items-start gap-6">
            <span className="eyebrow">Welcome to FitSync</span>
            <h2 className="heading-lg">
              Train like a champion. <span className="text-zinc-500">Live like one too.</span>
            </h2>
            <p className="lead">
              We help disciplined people turn ambition into results. Expert coaching, modern equipment
              and a supportive community, built around one goal: your progress.
            </p>
            <ul className="grid w-full gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
                    <FaCheck className="h-2.5 w-2.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary mt-2">
              Discover our story <FaArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp} className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="/ab1.png" alt="Member using a smart treadmill" className="h-64 w-full rounded-2xl object-cover" />
              <img src="/ab3.png" alt="Group training session" className="h-48 w-full rounded-2xl object-cover" />
            </div>
            <div className="space-y-4 pt-12">
              <img src="/ab2.png" alt="Strength training" className="h-48 w-full rounded-2xl object-cover" />
              <img src="/ab4.png" alt="Coach with a client" className="h-64 w-full rounded-2xl object-cover" />
            </div>
            <div className="card absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 px-6 py-4 backdrop-blur">
              <span className="font-display text-4xl font-bold text-brand-500">10+</span>
              <span className="text-sm leading-tight text-zinc-400">
                Years helping
                <br />
                people get fit
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
