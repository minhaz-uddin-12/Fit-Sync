import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBullseye, FaHeart, FaChartLine, FaArrowRight } from "react-icons/fa";
import { PageHeader, SectionHeading, fadeUp } from "../components/ui/Section";
import { stats } from "../data/site";
import Trainers from "../components/Trainers";

const values = [
  {
    icon: FaBullseye,
    title: "Results first",
    desc: "Every program is built around measurable goals, so you always know what you're working toward.",
  },
  {
    icon: FaHeart,
    title: "Community driven",
    desc: "Train alongside people who push you, support you and celebrate your wins.",
  },
  {
    icon: FaChartLine,
    title: "Data informed",
    desc: "Workout tracking and progress insights help you train smarter, not just harder.",
  },
];

const About = () => {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Fitness made simple. Results made possible."
        description="FitSync brings expert coaching, modern technology and a supportive community together under one roof."
        image="/Strength Training.jpg"
      />

      <section className="section">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
            <img src="/ab2.png" alt="Members training" className="h-80 w-full rounded-2xl object-cover" />
            <img src="/ab4.png" alt="Coaching session" className="mt-12 h-80 w-full rounded-2xl object-cover" />
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-col items-start gap-6">
            <span className="eyebrow">Our story</span>
            <h2 className="heading-lg">Built by athletes, for everyone</h2>
            <p className="lead">
              At <span className="font-semibold text-white">FitSync</span>, we&apos;re changing how people
              approach fitness with modern technology, expert coaching and a community that shows up.
              Whether you&apos;re a beginner or a seasoned athlete, our mission is to make your goals
              achievable.
            </p>
            <p className="lead">
              Our platform offers personalized workout plans, progress tracking and practical insights to
              keep you motivated and on track, in the gym and outside it.
            </p>
            <Link to="/register" className="btn-primary mt-2">
              Get started <FaArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900">
        <div className="container-x grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-5xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What drives us" title="Our core values" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-8"
              >
                <Icon className="h-8 w-8 text-brand-500" />
                <h3 className="mt-6 font-display text-2xl font-semibold uppercase">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Trainers />
    </>
  );
};

export default About;
