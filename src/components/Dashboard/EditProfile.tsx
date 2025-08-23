import { useEffect, useState } from "react";
import type { User } from "../../domain/interfaces/User"

interface EditProfileProps {
    user: User,
    saveUser: (updatedUser: User) => void
}

export const EditProfile = ({ user, saveUser }: EditProfileProps) => {

    const [localUser, setLocalUser] = useState<User>(user);

    useEffect(() => {
        setLocalUser(user);
    }, [user]);

    const handleChange = (field: keyof User, value: string) => {
        setLocalUser({ ...localUser, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveUser({
            ...localUser,
            updatedAt: new Date(),
        });
    };

    return (
        <div className="flex justify-center">
            <div className="card min-w-100 shadow-xl bg-base-100">
                <div className="card-body">
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={localUser.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                value={localUser.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                required
                            />
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
        </div>
    );
}