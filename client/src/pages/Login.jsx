import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { authService } from "../services/auth.service";
import { Spinner } from "../components/ui/Spinner";
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Add default role as 'member' to credentials
      const credentials = { ...data, role: 'member' };
      const response = await authService.login(credentials);
      
      if (response?.data) {
        login(response.data);
        showNotification('Login successful!', 'success');
        const redirectPath = response.data.role === 'admin' 
          ? '/admin/dashboard'
          : response.data.role === 'trainer'
          ? '/trainer/dashboard'
          : '/dashboard';
        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      showNotification(error.message || 'Invalid credentials', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900" style={{ backgroundImage: 'url("/Login & Register.png")' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">Login</h2>
        
        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Password</label>
          <input
            {...register("password", { 
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            })}
            type="password"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
        
        <div className="mt-4 text-center">
          <a href="/forgotpassword" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">Register Now</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;