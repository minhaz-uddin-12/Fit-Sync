import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaLock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import ConfirmationModal from "../components/ConfirmationModal";
import { Spinner } from "../components/ui/Spinner";
import { formatPrice } from "../data/site";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { membershipService } from "../services/fitsync.service";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated, updateUser } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (!plan) {
      const t = setTimeout(() => navigate("/plans"), 2000);
      return () => clearTimeout(t);
    }
  }, [plan, navigate]);

  const handleConfirmPayment = async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);
    try {
      const updated = await membershipService.enroll(plan.title);
      updateUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setPaid(true);
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceed = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout", state: { plan } } } });
      return;
    }
    if (user.role !== "member") {
      showNotification("Only member accounts can enroll in a plan.", "error");
      return;
    }
    setIsModalOpen(true);
  };

  if (!plan) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center pt-24 text-center">
        <div>
          <h1 className="heading-md">No plan selected</h1>
          <p className="mt-2 text-zinc-400">Redirecting you to our plans…</p>
        </div>
      </section>
    );
  }

  if (paid) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center px-5 pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card max-w-md p-10 text-center">
          <FaCheckCircle className="mx-auto h-14 w-14 text-emerald-400" />
          <h1 className="mt-6 font-display text-4xl font-bold uppercase">You&apos;re in!</h1>
          <p className="mt-3 text-zinc-400">
            Your <span className="text-white">{plan.title}</span> membership is active. Pay{" "}
            <span className="text-white">{formatPrice(plan)}</span> at the front desk on your first visit and
            we&apos;ll mark it as paid.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/dashboard" className="btn-primary flex-1">Go to dashboard</Link>
            <Link to="/profile" className="btn-secondary flex-1">View membership</Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="section pt-32 sm:pt-40">
      <div className="container-x max-w-5xl">
        <Link to="/plans" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <FaArrowLeft className="h-3 w-3" /> Back to plans
        </Link>
        <h1 className="heading-lg mt-4">Checkout</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="card p-8 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Selected plan</p>
                <h2 className="mt-1 font-display text-4xl font-bold uppercase">{plan.title}</h2>
              </div>
              <span className="chip border-brand-500/30 text-brand-300">{plan.period}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-400">{plan.tagline}</p>
            <ul className="mt-8 grid gap-3 border-t border-white/5 pt-8 text-sm sm:grid-cols-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-zinc-300">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
                    <FaCheck className="h-2.5 w-2.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside className="card h-fit p-8 lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Order summary</h3>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-400">{plan.title} · {plan.period}</dt>
                <dd className="text-white">{formatPrice(plan)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-400">Joining fee</dt>
                <dd className="text-emerald-400">Free</dd>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-4 text-base">
                <dt className="font-semibold text-white">Total</dt>
                <dd className="font-display text-2xl font-bold text-white">{formatPrice(plan)}</dd>
              </div>
            </dl>
            {user?.membership && new Date(user.membership.endDate) > new Date() && (
              <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                You currently have the {user.membership.plan} plan. Confirming will switch you to {plan.title}.
              </p>
            )}
            <button onClick={handleProceed} disabled={isSubmitting} className="btn-primary mt-6 w-full py-3.5">
              {isSubmitting ? <Spinner size="sm" color="white" /> : <><FaLock className="h-3 w-3" /> {isAuthenticated ? "Confirm enrollment" : "Log in to continue"}</>}
            </button>
            <p className="mt-4 text-center text-xs text-zinc-500">Payment is collected at the front desk · No joining fee</p>
          </aside>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmPayment}
        title="Confirm enrollment"
        confirmLabel="Enroll now"
        message={`Enroll in the ${plan.title} plan for ${plan.period.toLowerCase()} (${formatPrice(plan)}, paid at the front desk)?`}
      />
    </section>
  );
}

export default Checkout;
