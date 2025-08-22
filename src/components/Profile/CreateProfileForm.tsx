import { X } from "lucide-react";

import { useCreateProfile } from "../../hooks/user/useCreateProfile";
import { useEffect } from "react";

interface ModalProps {
  handleShowModal: () => void;
}

const CreateProfileForm = (props: ModalProps) => {
  const { handleShowModal } = props;

  const {
    formData,
    confirmPassword,
    setConfirmPassword,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setErrors,
  } = useCreateProfile();

  useEffect(() => {
    // Create a temporary object to hold validation errors for this render
    const newErrors: Record<string, string> = {};

    // Validate password
    if (formData.password && formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    } else if (formData.password && !/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter.";
    }

    // Validate confirm password
    if (confirmPassword && formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Use a function to merge the new errors, ensuring we keep other errors (e.g., name/email)
    // but overwrite the password and confirmPassword errors correctly.
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: newErrors.password,
      confirmPassword: newErrors.confirmPassword,
    }));
  }, [formData.password, confirmPassword]);

  return (
    <div>
      <dialog open className="modal">
        <div className="modal-box">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Your Profile
            <X
              onClick={handleShowModal}
              className="float-right text-gray-400 cursor-pointer hover:text-gray-600"
            />
          </h2>
          <p className="text-gray-600 text-center">
            Tell us about yourself to join the community.
          </p>
          {isSubmitting && (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          )}

          <div className="mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset disabled={isSubmitting}>
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
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
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
                    className="block text-sm font-semibold text-gray-700">
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
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
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
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                {/* <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Bio</label>
                <textarea name="bio" onChange={handleChange} rows={3}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
              </div> */}

                {/* Profile Picture Upload */}
                {/* <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture</label>
                  <div
                    {...getRootProps({
                      className:
                        "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors " +
                        (isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"),
                    })}
                  >
                    <input {...getInputProps()} />
                    {file ? (
                      <div className="relative w-32 h-32">
                        <img
                          src={file.preview}
                          alt="Profile Preview"
                          className="object-cover w-full h-full rounded-full"
                        />
                        <button
                          type="button"
                          onClick={removeFile}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadCloud size={32} className="text-gray-400 mb-2" />
                        <span className="text-gray-500">
                          {isDragActive
                            ? "Drop the image here..."
                            : "Drag & drop an image, or click to select"}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">
                          (JPEG/PNG, max 5MB)
                        </span>
                      </div>
                    )}
                  </div>
                  {errors.profilePicture && (
                    <p className="mt-1 text-sm text-red-600">{errors.profilePicture}</p>
                  )}
                </div> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md transition-colors duration-300 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed">
                  {isSubmitting ? "Creating Profile..." : "Create Profile"}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateProfileForm;
