import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMars, FaVenus, FaCalculator, FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { PageHeader } from "../components/ui/Section";
import { useNotification } from "../contexts/NotificationContext";

// Status steps (validated for the dark surface); each segment is always labeled.
const SCALE_MIN = 15;
const SCALE_MAX = 40;
const ranges = [
  { name: "Underweight", short: "Under", from: 15, to: 18.5, color: "#3987e5", text: "text-[#6da7ec]" },
  { name: "Normal weight", short: "Normal", from: 18.5, to: 25, color: "#0ca30c", text: "text-[#3fc43f]" },
  { name: "Overweight", short: "Over", from: 25, to: 30, color: "#fab219", text: "text-[#fab219]" },
  { name: "Obese", short: "Obese", from: 30, to: 40, color: "#d03b3b", text: "text-[#e66767]" },
];

const pct = (v) => ((Math.min(Math.max(v, SCALE_MIN), SCALE_MAX) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight || !height || !age) {
      showNotification("Please enter weight, height, and age.", "error");
      return;
    }

    setIsCalculating(true);
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const heightInMeters = height / 100;
      let bmiResult = weight / (heightInMeters * heightInMeters);

      // Adjust BMI based on age and gender
      if (age < 18) {
        bmiResult *= 0.95; // Slightly lower BMI for children
      } else if (age > 50) {
        bmiResult *= 1.05; // Slightly higher BMI for older adults
      }

      if (gender === "female") {
        bmiResult *= 0.95; // Women tend to have lower BMI due to body composition
      }

      setBmi(bmiResult.toFixed(1));
      const { category, advice } = getBMICategory(bmiResult);
      setCategory(category);
      setAdvice(advice);
      setIsCalculating(false);
    }, 500);
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return {
        category: "Underweight",
        advice: "Consider eating a balanced diet with more protein and healthy fats to reach a normal weight.",
      };
    } else if (bmiValue < 25) {
      return {
        category: "Normal weight",
        advice: "Great job! Maintain a healthy lifestyle with a balanced diet and regular exercise.",
      };
    } else if (bmiValue < 30) {
      return {
        category: "Overweight",
        advice: "Consider a healthy diet and increased physical activity to reduce excess weight.",
      };
    } else {
      return {
        category: "Obese",
        advice: "It is recommended to seek professional health advice and focus on lifestyle changes.",
      };
    }
  };

  const current = ranges.find((r) => r.name === category);

  const genderOption = (value, label, Icon) => (
    <button
      type="button"
      onClick={() => setGender(value)}
      aria-pressed={gender === value}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
        gender === value
          ? "border-brand-500 bg-brand-500/10 text-white"
          : "border-white/10 bg-ink-900 text-zinc-400 hover:border-white/20"
      }`}
    >
      <Icon className={gender === value ? "text-brand-400" : ""} /> {label}
    </button>
  );

  return (
    <>
      <PageHeader
        eyebrow="Health tools"
        title="BMI calculator"
        description="Calculate your Body Mass Index to see where you stand and get a personalized recommendation."
      />

      <section className="section pt-16">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="card p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold uppercase">Your details</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <span className="label">Gender</span>
                <div className="flex gap-3">
                  {genderOption("male", "Male", FaMars)}
                  {genderOption("female", "Female", FaVenus)}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { id: "age", label: "Age", unit: "yrs", value: age, set: setAge, placeholder: "25" },
                  { id: "weight", label: "Weight", unit: "kg", value: weight, set: setWeight, placeholder: "70" },
                  { id: "height", label: "Height", unit: "cm", value: height, set: setHeight, placeholder: "175" },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="label">{f.label}</label>
                    <div className="relative">
                      <input
                        id={f.id}
                        type="number"
                        min="1"
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        className="input pr-12"
                        placeholder={f.placeholder}
                        required
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs text-zinc-500">
                        {f.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={isCalculating} className="btn-primary w-full py-3.5">
                <FaCalculator className="h-3.5 w-3.5" />
                {isCalculating ? "Calculating…" : "Calculate BMI"}
              </button>
            </form>

            <p className="mt-8 flex gap-3 rounded-xl bg-white/[0.03] p-4 text-xs leading-relaxed text-zinc-500">
              <FaInfoCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              This calculator provides an estimate and does not replace medical advice. BMI doesn&apos;t
              distinguish between muscle and fat.
            </p>
          </div>

          <div className="card flex flex-col p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold uppercase">Your result</h2>

            {bmi ? (
              <motion.div
                key={bmi}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-1 flex-col"
              >
                <div className="flex items-end gap-4">
                  <span className="font-display text-8xl font-bold leading-none text-white">{bmi}</span>
                  <span className="pb-2">
                    <span className="block text-xs uppercase tracking-widest text-zinc-500">BMI</span>
                    <span className={`block text-lg font-semibold ${current?.text}`}>{category}</span>
                  </span>
                </div>

                <div className="mt-10" role="img" aria-label={`BMI ${bmi}, ${category}`}>
                  <div className="relative">
                    <div className="flex h-3 gap-[2px] overflow-hidden rounded-full">
                      {ranges.map((r) => (
                        <div
                          key={r.name}
                          style={{ width: `${pct(r.to) - pct(r.from)}%`, backgroundColor: r.color }}
                          className={`h-full transition-opacity ${r.name === category ? "opacity-100" : "opacity-30"}`}
                        />
                      ))}
                    </div>
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: `${pct(parseFloat(bmi))}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -top-1.5 h-6 w-1.5 -translate-x-1/2 rounded-full bg-white ring-2 ring-ink-850"
                    />
                  </div>
                  <div className="mt-3 flex text-[11px] text-zinc-500">
                    {ranges.map((r) => (
                      <div key={r.name} style={{ width: `${pct(r.to) - pct(r.from)}%` }} className="truncate">
                        <span className={r.name === category ? "font-semibold text-zinc-200" : ""}>{r.short}</span>
                        <span className="block tabular-nums">{r.from}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                  <p className="text-sm font-semibold text-white">Recommendation</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{advice}</p>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                  <Link to="/plans" className="btn-primary flex-1">
                    Find a plan <FaArrowRight className="h-3 w-3" />
                  </Link>
                  <Link to="/support" className="btn-secondary flex-1">Talk to a coach</Link>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">
                  <FaCalculator className="h-8 w-8" />
                </div>
                <p className="mt-6 max-w-xs text-sm text-zinc-400">
                  Enter your details and calculate your BMI to see your health assessment here.
                </p>
                <ul className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3 text-left text-xs">
                  {ranges.map((r) => (
                    <li key={r.name} className="flex items-center gap-2 rounded-lg border border-white/5 px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="text-zinc-300">{r.name}</span>
                      <span className="ml-auto tabular-nums text-zinc-500">
                        {r.to === 40 ? `${r.from}+` : `${r.from}–${r.to}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BMICalculator;
