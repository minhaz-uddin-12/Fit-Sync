import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, dashboardPath } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { authService } from "../services/auth.service";
import { Spinner } from "../components/ui/Spinner";
import { AuthLayout } from "../components/ui/AuthLayout";
import { useState } from "react";

const passwordRules = [
  { test: (v) => v.length >= 8, label: "8+ characters" },
  { test: (v) => /[A-Z]/.test(v), label: "Uppercase letter" },
  { test: (v) => /[a-z]/.test(v), label: "Lowercase letter" },
  { test: (v) => /\d/.test(v), label: "Number" },
  { test: (v) => /[!@#$%^&*]/.test(v), label: "Special (!@#$%^&*)" },
];

function Register() {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password") || "";

  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 8, message: "Password must be at least 8 characters" },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*)"
    }
  };

  const { login } = useAuth();
  const location = useLocation();
  const from = location.state?.from;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await authService.register(data);
      login(user);
      showNotification(`Welcome to FitSync, ${user.name.split(" ")[0]}! Your account is ready.`, "success");
      if (from?.pathname) {
        navigate(from.pathname, { replace: true, state: from.state });
      } else {
        navigate(dashboardPath(user.role), { replace: true });
      }
    } catch (error) {
      showNotification(error.message || "Registration failed. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join FitSync"
      subtitle="Create your free account and start training smarter today."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" state={location.state} className="font-semibold text-brand-400 hover:text-brand-300">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="name" className="label">Full name</label>
          <input
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
            autoComplete="name"
            placeholder="Jane Doe"
            className={`input ${errors.name ? "input-error" : ""}`}
          />
          {errors.name && <p className="field-error">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Invalid email address" }
            })}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`input ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            {...register("password", passwordValidation)}
            type="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            className={`input ${errors.password ? "input-error" : ""}`}
          />
          <ul className="mt-3 flex flex-wrap gap-2">
            {passwordRules.map((rule) => {
              const ok = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    ok ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-white/10 text-zinc-500"
                  }`}
                >
                  {ok ? "✓ " : ""}{rule.label}
                </li>
              );
            })}
          </ul>
          {errors.password && <p className="field-error">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5">
          {isLoading ? <Spinner size="sm" color="white" /> : "Create account"}
        </button>

        <p className="text-center text-xs text-zinc-500">
          By creating an account you agree to our terms of service and privacy policy.
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;
