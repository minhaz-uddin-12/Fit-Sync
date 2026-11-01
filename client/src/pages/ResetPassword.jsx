import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthLayout } from "../components/ui/AuthLayout";
import { Spinner } from "../components/ui/Spinner";
import { authService } from "../services/auth.service";
import { useAuth, dashboardPath } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

const passwordValidation = {
  required: "Password is required",
  minLength: { value: 8, message: "Password must be at least 8 characters" },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    message: "Use an uppercase letter, a lowercase letter, a number and a special character (!@#$%^&*)"
  }
};

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async ({ password }) => {
    setIsLoading(true);
    try {
      const user = await authService.resetPassword(token, password);
      login(user);
      showNotification("Your password has been updated.", "success");
      navigate(dashboardPath(user.role), { replace: true });
    } catch (error) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Pick a strong password you haven't used before."
      footer={
        <>
          Link expired?{" "}
          <Link to="/forgotpassword" className="font-semibold text-brand-400 hover:text-brand-300">Request a new one</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="password" className="label">New password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password", passwordValidation)}
            className={`input ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && <p className="field-error">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirm" className="label">Confirm password</label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            {...register("confirm", {
              validate: (v) => v === watch("password") || "Passwords do not match"
            })}
            className={`input ${errors.confirm ? "input-error" : ""}`}
          />
          {errors.confirm && <p className="field-error">{errors.confirm.message}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5">
          {isLoading ? <Spinner size="sm" color="white" /> : "Update password"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
