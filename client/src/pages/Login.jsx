import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, dashboardPath } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { authService } from "../services/auth.service";
import { Spinner } from "../components/ui/Spinner";
import { AuthLayout } from "../components/ui/AuthLayout";
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const location = useLocation();
  const from = location.state?.from;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await authService.login(data);
      login(user);
      showNotification(`Welcome back, ${user.name.split(" ")[0]}!`, 'success');
      if (from?.pathname) {
        navigate(from.pathname, { replace: true, state: from.state });
      } else {
        navigate(dashboardPath(user.role), { replace: true });
      }
    } catch (error) {
      showNotification(error.message || 'Invalid email or password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to track workouts, manage your plan and book sessions."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link to="/register" state={location.state} className="font-semibold text-brand-400 hover:text-brand-300">Create one</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="label">Email</label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`input ${errors.email ? "input-error" : ""}`}
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="label">Password</label>
            <Link to="/forgotpassword" className="mb-2 text-xs font-medium text-brand-400 hover:text-brand-300">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className={`input ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && <p className="field-error">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5">
          {isLoading ? <Spinner size="sm" color="white" /> : "Log in"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
