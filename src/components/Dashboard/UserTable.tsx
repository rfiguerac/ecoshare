import { useAuthStore } from "../../store/AuthStore";


export const UsersTable = () => {
    const { allProfiles } = useAuthStore();
    const tableData = allProfiles;
  

    return (
        <div className="card w-full shadow-lg rounded-2xl bg-base-200">
            <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold mb-4">Recent Users</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="font-semibold text-base-content/80">ID</th>
                                <th className="font-semibold text-base-content/80">Name</th>
                                <th className="font-semibold text-base-content/80">Email</th>
                                <th className="font-semibold text-base-content/80">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><span className="badge badge-secondary badge-outline">{user.role}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};