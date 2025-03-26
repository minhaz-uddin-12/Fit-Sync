import { useForm } from "react-hook-form";

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can add the logic to send a password reset email or perform any other action.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 dark:bg-gray-900" style={{ backgroundImage: 'url("/Login & Register.png")' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">Forgot Password</h2>

        <div className="mt-4">
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">
          Reset Password
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
