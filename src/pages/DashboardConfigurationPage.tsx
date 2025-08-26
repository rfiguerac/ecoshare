import { EditProfile } from "../components/Dashboard/EditProfile"
import { useAuthStore } from "../store/AuthStore"

export const DashboardConfiguration = () => {

    const { user } = useAuthStore();
    return (
        <div className="container mx-auto p-4 bg-base-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">
                    Edit Profile
                </h1>
            </div>
            {user && <EditProfile user={user} />}

        </div>
    )
} 