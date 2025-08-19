import { ReportsTable } from "../components/Dashboard/ReportsTable";
import { Stats } from "../components/Dashboard/Stats";
import { UsersTable } from "../components/Dashboard/UserTable";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Users, HandHeart, Archive, FileWarning } from "lucide-react";
export const Dashboard = () => {
    return (
        <DashboardLayout>
            <div className="flex w-full max-w-7xl">
                <div className="flex-1">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Stats title="Donaciones Activas" value="1.000" icon={<HandHeart />} color="bg-primary/20 text-primary" />
                        <Stats title="Donaciones Cerrdas" value="2.000" icon={<Archive />} color="bg-secondary/20 text-secondary" />
                        <Stats title="Usuarios Registrados" value="4.000" icon={<Users />} color="bg-accent/20 text-accent" />
                        <Stats title="Reportes sin revisar" value="50" icon={<FileWarning />} color="bg-info/20 text-base" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <UsersTable />
                        <ReportsTable/>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}