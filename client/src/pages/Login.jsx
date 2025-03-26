import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900" style={{ backgroundImage: 'url("/Login & Register.png")' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">Login</h2>
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
            {...register("password", { required: "Password is required" })}
            type="password"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Login
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