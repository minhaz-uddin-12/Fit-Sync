import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../services/auth.service";
import { Spinner } from "../components/ui/Spinner";
import { useState } from "react";

function Register() {
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 8, message: "Password must be at least 8 characters" },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character (!@#$%^&*)"
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      if (response?.data) {
        showNotification("Registration successful! Please login to continue.", "success");
        navigate('/login', { replace: true });
      }
    } catch (error) {
      const errorMessage = error.response?.status === 409
        ? "Email is already registered. Please try logging in instead."
        : error.response?.data?.message || "Registration failed. Please try again.";
      
      showNotification(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900" style={{ backgroundImage: 'url("/Login & Register.png")' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">Register</h2>

        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Password</label>
          <input
            {...register("password", passwordValidation)}
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Create a password (8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          {isLoading ? <Spinner /> : "Register"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;