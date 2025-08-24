import { useUpdateProfile } from "../../hooks/user/useUpdateProfile";


export const EditProfile = () => {

    const { profileForm, passwordForm, profileError, passwordError, handleProfileChange, handlePasswordChange, submitProfile, submitPassword } = useUpdateProfile()
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
            <div className="card max-w-100 bg-base-100 shadow-xl p-6">
                <h2 className="text-xl font-bold mb-4">Cambiar Contraseña</h2>
                <form onSubmit={submitPassword} className="space-y-4">
                    <input
                        type="password"
                        name="oldPassword"
                        value={passwordForm.oldPassword}
                        onChange={handlePasswordChange}
                        placeholder="Contraseña actual"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Nueva contraseña"
                        className="input input-bordered w-full"
                    />
                     {passwordError.password && (
                                <p className="mt-1 text-sm text-red-600">{passwordError.password}</p>
                            )}
                    <button className="btn btn-secondary">Cambiar contraseña</button>
                </form>
            </div>

        </div>
    );
}