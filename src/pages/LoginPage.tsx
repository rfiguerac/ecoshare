import { useEffect, useState } from "react";
import { useLoginUser } from "../hooks/user/useLoginUser";
import { useCreateProfile } from "../hooks/user/useCreateProfile";

export const LoginPage = () => {

  const { formData, isSubmitting, errors, handleChange, handleSubmit } =
    useLoginUser();

  const {
    formData: registerData,
    confirmPassword,
    setConfirmPassword,
    errors: registerErrors,
    isSubmitting: registerSubmiting,
    handleChange: registerHandleChange,
    handleSubmit: registerHandleSubmit,
    setErrors,
  } = useCreateProfile();

  useEffect(() => {
    // Create a temporary object to hold validation errors for this render
    const newErrors: Record<string, string> = {};

    // Validate password
    if (registerData.password && registerData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    } else if (registerData.password && !/[a-zA-Z]/.test(registerData.password)) {
      newErrors.password = "Password must contain at least one letter.";
    }

    // Validate confirm password
    if (confirmPassword && registerData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Use a function to merge the new errors, ensuring we keep other errors (e.g., name/email)
    // but overwrite the password and confirmPassword errors correctly.
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: newErrors.password,
      confirmPassword: newErrors.confirmPassword,
    }));
  }, [registerData.password, confirmPassword]);

  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      {isLogin ? (
        <div className="flex justify-center items-start bg-gray-100 p-16">
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
                    onClick={() => setIsLogin(false)}
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
      )
        :
        (
          <div className="flex justify-center items-start bg-gray-100 p-16">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 className="text-3xl font-bold text-center text-gray-800">
                Create Your Profile
              </h2>
              <p className="text-gray-600 text-center">
                Tell us about yourself to join the community.
              </p>
              {registerSubmiting && (
                <div className="flex justify-center">
                  <span className="loading loading-spinner loading-xl"></span>
                </div>
              )}

              <div className="mb-4">
                <form onSubmit={registerHandleSubmit} className="space-y-4">
                  <fieldset disabled={registerSubmiting}>
                    {/* Name */}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={registerHandleChange}
                        placeholder="Full Name"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
                      />
                      {registerErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{registerErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={registerHandleChange}
                        placeholder="Email"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
                      />
                      {registerErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{registerErrors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={registerHandleChange}
                        placeholder="Password"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
                      />
                      {registerErrors.password && (
                        <p className="mt-1 text-sm text-red-600">
                          {registerErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-semibold text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 "
                      />
                      {registerErrors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {registerErrors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={registerSubmiting}
                      className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md transition-colors duration-300 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed">
                      {registerSubmiting ? "Creating Profile..." : "Create Profile"}
                    </button>
                  </fieldset>
                </form>
              </div>
              </div>
            </div>
            )
      }
          </>
        );
};

      export default LoginPage;
