import { EditProfile } from "../components/Dashboard/EditProfile"
import type { User } from "../domain/interfaces/User";

const mockUser: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    createdAt: new Date(),
};

export const DashboardConfiguration = () => {

    const handleSave = (user: User) => {
        console.log("Updated user:", user);
    };


    return (
        <div className="container mx-auto p-4 bg-base-100 rounded-box shadow-xl min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">
                    Edit Profile
                </h1>
            </div>
            <EditProfile user={mockUser} saveUser={handleSave} />

        </div>
    )
} 