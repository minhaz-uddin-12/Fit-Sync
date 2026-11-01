import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { AuthLayout } from "../components/ui/AuthLayout";
import { Spinner } from "../components/ui/Spinner";
import { authService } from "../services/auth.service";
import { useNotification } from "../contexts/NotificationContext";

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const onSubmit = async ({ email }) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      setResult({ email, devResetUrl: response.devResetUrl });
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // The dev link points at the API's CLIENT_URL; keep the user on this origin
  const devPath = result?.devResetUrl && new URL(result.devResetUrl).pathname;

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter the email linked to your account and we'll send you a reset link."
      footer={
        <>
          Remembered your password?{" "}
          <Link to="/login" className="font-semibold text-brand-400 hover:text-brand-300">Back to login</Link>
        </>
      }
    >
      {result ? (
        <div className="card p-8 text-center">
          <FaEnvelopeOpenText className="mx-auto h-10 w-10 text-brand-500" />
          <h2 className="mt-4 font-display text-2xl font-bold uppercase">Check your inbox</h2>
          <p className="mt-2 text-sm text-zinc-400">
            If an account exists for <span className="text-white">{result.email}</span>, a reset link is on
            its way. It expires in one hour.
          </p>
          {devPath && (
            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-left text-xs text-amber-200">
              <p className="font-semibold">Development mode</p>
              <p className="mt-1 text-amber-200/80">Email sending isn&apos;t configured, so here is the link directly:</p>
              <Link to={devPath} className="mt-3 inline-block font-semibold text-white underline underline-offset-4">
                Open reset link
              </Link>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              {...register("email", { required: "Email is required" })}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`input ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>
          <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5">
            {isLoading ? <Spinner size="sm" color="white" /> : "Send reset link"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

export default ForgotPassword;
