import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { PageHeader, SectionHeading } from "../components/ui/Section";
import { PlanGrid } from "../components/Plans";

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade at any time and only pay the difference for the remaining period.",
  },
  {
    q: "Is there a joining fee?",
    a: "No. The price you see is the price you pay. There are no registration or hidden fees.",
  },
  {
    q: "What are the gym hours?",
    a: "We're open 6:00 AM – 11:00 PM on weekdays and 8:00 AM – 9:00 PM on weekends.",
  },
  {
    q: "Do I get a personal trainer?",
    a: "Premium members get a dedicated personal trainer. Other plans can book sessions with our coaches separately.",
  },
];

function Plans() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Choose the plan that fits you"
        description="Flexible memberships with personalized guidance and great value. No joining fee, cancel anytime."
      />

      <section className="section pt-16">
        <div className="container-x">
          <PlanGrid />
        </div>
      </section>

      <section className="section bg-ink-900">
        <div className="container-x max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-12 divide-y divide-white/5 border-y border-white/5">
            {faqs.map((faq, i) => (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-base font-semibold text-white">{faq.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-brand-400">
                    {open === i ? <FaMinus className="h-3 w-3" /> : <FaPlus className="h-3 w-3" />}
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Plans;
