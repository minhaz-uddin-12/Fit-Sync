import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { PageHeader, SectionHeading } from "../components/ui/Section";
import { ServiceCard } from "../components/Services";
import { services } from "../data/site";

const steps = [
  { title: "Assess", desc: "Start with a BMI check and a goal-setting consultation with a coach." },
  { title: "Plan", desc: "Get a training and nutrition plan matched to your schedule." },
  { title: "Train", desc: "Work with coaches and classes that keep you consistent." },
  { title: "Track", desc: "Log workouts and watch your progress build week after week." },
];

function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything you need to reach your goals"
        description="Professional coaching and programs designed to support every stage of your fitness journey."
        image="/Cardio.jpg"
      />

      <section className="section">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} detailed />
          ))}
        </div>
      </section>

      <section className="section bg-ink-900">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Four steps to a stronger you" />
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative border-t-2 border-white/10 pt-6">
                <span className="absolute -top-[2px] left-0 h-0.5 w-12 bg-brand-500" />
                <span className="font-display text-5xl font-bold text-white/10">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold uppercase">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex justify-center">
            <Link to="/plans" className="btn-primary">
              View membership plans <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
