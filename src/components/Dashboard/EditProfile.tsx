import type { User } from "../../domain/interfaces/User";
import { useUpdatePassword } from "../../hooks/user/useUpdatePassword";
import { useUpdateProfile } from "../../hooks/user/useUpdateProfile";

interface EditProfileProps {
    user: User
}

export const EditProfile = ({ user }: EditProfileProps) => {

    const { formData:profileForm, errors:profileError, isSubmitting:isSubmittingProfile, handleChange:handleProfileChange, handleSubmit:submitProfile } = useUpdateProfile(user);
    const { formData:passwordForm, errors:passwordError, handleChange:handlePasswordChange, handleSubmit:submitPassword } = useUpdatePassword()
    
    return (
        <div className="flex flex-col justify-center  items-center gap-8">
            <div className="card min-w-100 shadow-xl bg-base-100">
                <div className="card-body">
                    <form className="space-y-4" onSubmit={submitProfile}>

                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                name="name"
                                value={profileForm.name}
                                onChange={handleProfileChange}
                            />
                            {profileError.name && (
                                <p className="mt-1 text-sm text-red-600">{profileError.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                value={profileForm.email}
                                onChange={handleProfileChange}
                                required
                            />
                            {profileError.email && (
                                <p className="mt-1 text-sm text-red-600">{profileError.email}</p>
                            )}
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card min-w-100 shadow-xl bg-base-100">
                <div className="card-body">
                    <form className="space-y-4" onSubmit={submitPassword}>
                        <fieldset disabled={isSubmittingProfile}></fieldset>

                        <div>
                            <label className="label">
                                <span className="label-text">Old Password</span>
                           </label>
                            <input
                                className="input input-bordered w-full"
                                type="password"
                                name="oldPassword"
                                placeholder="Old password"
                                value={passwordForm.oldPassword}
                                onChange={handlePasswordChange}
                            />
                            {profileError.name && (
                                <p className="mt-1 text-sm text-red-600">{profileError.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input
                                className="input input-bordered w-full"
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                            />
                            {passwordError.password && (
                                <p className="mt-1 text-sm text-red-600">{passwordError.password}</p>
                            )}
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}