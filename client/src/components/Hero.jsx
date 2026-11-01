import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay, FaStar } from "react-icons/fa";
import { stats } from "../data/site";

const ease = [0.22, 1, 0.36, 1];

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:items-center sm:pb-24">
      <motion.img
        src="/Hero.jpg"
        alt=""
        aria-hidden="true"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

      <div className="container-x">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 text-xs font-medium text-zinc-300 backdrop-blur"
          >
            <span className="rounded-full bg-brand-500 px-2.5 py-0.5 font-semibold text-white">New</span>
            Personal coaching now included in Premium
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="mt-6 font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-[6.5rem]"
          >
            Transform your body.
            <br />
            <span className="text-gradient">One rep at a time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="lead mt-6 max-w-xl text-zinc-300"
          >
            Join the FitSync community and reach your potential with personalized workouts, expert
            coaches and progress tracking that keeps you moving forward.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link to="/plans" className="btn-primary px-8 py-4 text-base">
              Start your journey <FaArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/services" className="btn-secondary px-8 py-4 text-base">
              <FaPlay className="h-3 w-3 text-brand-400" /> Explore programs
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["/Enayet.jpg", "/Reza.jpg", "/Srishty.jpg"].map((src) => (
                <img key={src} src={src} alt="" className="h-10 w-10 rounded-full border-2 border-ink-950 object-cover" />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              <p className="mt-0.5 text-zinc-400">Loved by 2,500+ members</p>
            </div>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-4 lg:mt-24"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-ink-950/70 px-6 py-5">
              <dt className="text-xs uppercase tracking-widest text-zinc-500">{stat.label}</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

export default Hero;
