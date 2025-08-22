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
        <EditProfile user={mockUser} saveUser={handleSave}/>
    )
} 