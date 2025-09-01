import { useLoginUser } from "../hooks/user/useLoginUser";

export const LoginPage = () => {

    const { formData, isSubmitting, errors, handleChange, handleSubmit } =
      useLoginUser();
  
  return (
      <div className="flex justify-center items-start  bg-gray-100 p-16">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Log In
          {/* The close button is removed for a non-modal page */}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Welcome back! Please enter your details.
        </p>

        {isSubmitting && (
          <div className="flex justify-center my-4">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md transition-colors duration-300 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>

            {/* Registration Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?
              <button
                // onClick={handleRegister}
                type="button"
                className="text-sm text-blue-500 hover:underline ml-1"
              >
                Register Now
              </button>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
