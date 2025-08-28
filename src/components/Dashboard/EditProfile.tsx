import type { User } from "../../domain/interfaces/User";
import { useUpdatePassword } from "../../hooks/user/useUpdatePassword";
import { useUpdateProfile } from "../../hooks/user/useUpdateProfile";

interface EditProfileProps {
    user: User
}

export const EditProfile = ({ user }: EditProfileProps) => {

    const { formData: profileForm, errors: profileError, isSubmitting: isSubmittingProfile, handleChange: handleProfileChange, handleSubmit: submitProfile } = useUpdateProfile(user);
    const { formData: passwordForm, errors: passwordError, handleChange: handlePasswordChange, handleSubmit: submitPassword } = useUpdatePassword()

    return (
        <div className="flex flex-col justify-center md:flex-row gap-6 p-6 md:p-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="card w-full bg-base-100 shadow-xl border border-base-300">
                    <form onSubmit={submitProfile} className="card-body">
                        <h2 className="card-title text-2xl font-bold mb-4">Edit Profile</h2>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                value={profileForm.name}
                                onChange={handleProfileChange}
                            />
                            {profileError.name && (
                                <p className="mt-1 text-sm text-red-600">{profileError.name}</p>
                            )}
                        </div>
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                            />
                            {profileError.email && (
                                <p className="mt-1 text-sm text-red-600">{profileError.email}</p>
                            )}
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card w-full bg-base-100 shadow-xl border border-base-300">
                    <form onSubmit={submitPassword} className="card-body">
                        <h2 className="card-title text-2xl font-bold mb-4">Change Password</h2>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Old Password</span>
                            </label>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder="Your actual password"
                                className="input input-bordered w-full"
                                value={passwordForm.oldPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Your new password"
                                className="input input-bordered w-full"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                            />
                            {passwordError.password && (
                                <p className="mt-1 text-sm text-red-600">{passwordError.password}</p>
                            )}
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-warning">
                                Change password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}