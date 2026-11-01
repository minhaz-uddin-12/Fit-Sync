import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { plans, formatPrice } from "../data/site";
import { SectionHeading } from "./ui/Section";

export function PlanGrid() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/checkout", { state: { plan: selectedPlan } });
    setSelectedPlan(null);
  };

  return (
    <>
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col rounded-3xl p-8 ${
              plan.popular
                ? "bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-glow lg:-my-4 lg:py-12"
                : "card"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
                Most popular
              </span>
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide">{plan.title}</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  plan.popular ? "bg-white/20 text-white" : "bg-white/5 text-zinc-300"
                }`}
              >
                {plan.period}
              </span>
            </div>
            <p className={`mt-2 text-sm ${plan.popular ? "text-white/80" : "text-zinc-400"}`}>{plan.tagline}</p>

            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold text-white">{plan.price.toLocaleString("en-US")}</span>
              <span className={`text-sm font-medium ${plan.popular ? "text-white/80" : "text-zinc-500"}`}>
                {plan.currency} / {plan.period.toLowerCase()}
              </span>
            </div>

            <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-8 text-sm ${plan.popular ? "border-white/20" : "border-white/5"}`}>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      plan.popular ? "bg-white text-brand-600" : "bg-brand-500/15 text-brand-400"
                    }`}
                  >
                    <FaCheck className="h-2.5 w-2.5" />
                  </span>
                  <span className={plan.popular ? "text-white" : "text-zinc-300"}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlan(plan)}
              className={`mt-10 w-full ${
                plan.popular ? "btn bg-white text-brand-600 hover:bg-zinc-100" : "btn-secondary"
              }`}
            >
              Choose {plan.title} <FaArrowRight className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        onConfirm={handleConfirm}
        title="Confirm your plan"
        confirmLabel="Continue to checkout"
        message={
          selectedPlan &&
          `You're about to enroll in the ${selectedPlan.title} plan (${formatPrice(selectedPlan)} for ${selectedPlan.period.toLowerCase()}).`
        }
      />
    </>
  );
}

function Plans() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute left-1/2 top-1/3 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[140px]" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Membership"
          title="Simple, transparent pricing"
          description="Choose the plan that fits your goals. No joining fee, no hidden costs."
        />
        <div className="mt-16">
          <PlanGrid />
        </div>
      </div>
    </section>
  );
}

export default Plans;
