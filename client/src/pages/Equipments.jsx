import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { PageHeader } from "../components/ui/Section";

const equipmentData = [
  {
    category: "Cardio",
    items: [
      { img: "/Equipments/Cardio/Symbio Runner.png", name: "Symbio Runner", type: "Treadmill" },
      { img: "/Equipments/Cardio/Aspire Runner.png", name: "Aspire Runner", type: "Treadmill" },
      { img: "/Equipments/Cardio/Integrity Cross Trainer.png", name: "Integrity Cross Trainer", type: "Elliptical" },
      { img: "/Equipments/Cardio/IC5 Cycle.png", name: "IC5 Cycle", type: "Bikes & Indoor Cycles" },
      { img: "/Equipments/Cardio/Ride CX.png", name: "Ride CX", type: "Bikes & Indoor Cycles" },
      { img: "/Equipments/Cardio/Total Body Arc Trainer.png", name: "Total Body Arc Trainer", type: "Arc Trainers" },
      { img: "/Equipments/Cardio/Stair Powermill Climber.png", name: "Stair Powermill Climber", type: "Stair Climber & Stepper" },
      { img: "/Equipments/Cardio/Heat Performance Rower.png", name: "Heat Performance Rower", type: "Rowers" },
    ],
  },
  {
    category: "Strength Training",
    items: [
      { img: "/Equipments/Strength Training/Ground Jammer.png", name: "Ground Jammer", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Glute Drive.png", name: "Glute Drive", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Shoulder Press.png", name: "Iso-Lateral Shoulder Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/HD Elite Athletics Half NX Rack.png", name: "HD Elite Athletics Half NX Rack", type: "Racks, Rigs & Platforms" },
      { img: "/Equipments/Strength Training/Hack Squat.png", name: "Hack Squat", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Adjustable Bench.png", name: "Adjustable Bench", type: "Benches" },
      { img: "/Equipments/Strength Training/Olympic Decline Bench.png", name: "Olympic Decline Bench", type: "Benches" },
      { img: "/Equipments/Strength Training/Flat Bench.png", name: "Flat Bench", type: "Benches" },
      { img: "/Equipments/Strength Training/Plate Loaded T-Bar Row.png", name: "Plate Loaded T-Bar Row", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Bench Press.png", name: "Iso-Lateral Bench Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Abdominal Oblique Crunch.png", name: "Abdominal Oblique Crunch", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Chest-Back Combo.png", name: "Iso-Lateral Chest-Back Combo", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Front Lat Pulldown.png", name: "Iso-Lateral Front Lat Pulldown", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Flat Bench Press.png", name: "Iso-Lateral Flat Bench Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Incline Press.png", name: "Iso-Lateral Incline Press", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Kneeling Leg Curl.png", name: "Iso-Lateral Kneeling Leg Curl", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Low Row.png", name: "Iso-Lateral Low Row", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Iso-Lateral Wide Chest.png", name: "Iso-Lateral Wide Chest", type: "Plate Loaded" },
      { img: "/Equipments/Strength Training/Linear Leg Press.png", name: "Linear Leg Press", type: "Plate Loaded" },
    ],
  },
  {
    category: "Accessories",
    items: [
      { img: "/Equipments/Accessories/Studio Dumbbells.png", name: "Studio Dumbbells", type: "Dumbbells & Fixed Barbells" },
      { img: "/Equipments/Accessories/Rubber Hex Dumbbells.png", name: "Rubber Hex Dumbbells", type: "Dumbbells & Fixed Barbells" },
      { img: "/Equipments/Accessories/Olympic Weightlifting Bars.png", name: "Olympic Weightlifting Bars", type: "Barbells & Plates" },
      { img: "/Equipments/Accessories/Training Bars.png", name: "Training Bars", type: "Barbells & Plates" },
      { img: "/Equipments/Accessories/Battle Ropes.png", name: "Battle Ropes", type: "Conditioning Accessories" },
      { img: "/Equipments/Accessories/Core Mat.png", name: "Core Mat", type: "Mobility Accessories" },
      { img: "/Equipments/Accessories/Foam Rollers.png", name: "Foam Rollers", type: "Mobility Accessories" },
      { img: "/Equipments/Accessories/Stability Balls.png", name: "Stability Balls", type: "Mobility Accessories" },
    ],
  },
];

const ALL = "All";
const tabs = [ALL, ...equipmentData.map((s) => s.category)];

const Equipments = () => {
  const [active, setActive] = useState(ALL);

  const items = equipmentData
    .filter((s) => active === ALL || s.category === active)
    .flatMap((s) => s.items.map((item) => ({ ...item, category: s.category })));

  return (
    <>
      <PageHeader
        eyebrow="Equipment"
        title="Gear for every type of training"
        description="Commercial-grade cardio, strength and accessory equipment, maintained daily and ready when you are."
        image="/Strength Training.jpg"
      />

      <section className="section pt-12">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-ink-900 p-1.5" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active === tab}
                  onClick={() => setActive(tab)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active === tab ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {active === tab && (
                    <motion.span layoutId="equip-tab" className="absolute inset-0 rounded-full bg-brand-500" />
                  )}
                  <span className="relative">{tab}</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-zinc-500">{items.length} items</p>
          </div>

          <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.article
                  layout
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="card card-hover group overflow-hidden"
                >
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-300 p-6">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-400">{item.type}</p>
                    <h3 className="mt-1 text-base font-semibold text-white">{item.name}</h3>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="card mt-20 flex flex-col items-start justify-between gap-6 p-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold uppercase">Need help choosing equipment?</h3>
              <p className="mt-2 max-w-2xl text-zinc-400">
                Our coaches can recommend the right equipment for your goals, whether you&apos;re just
                starting out or training for competition.
              </p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              Talk to a coach <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Equipments;
