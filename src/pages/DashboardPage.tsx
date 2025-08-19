import { ReportsTable } from "../components/Dashboard/ReportsTable";
import { Stats } from "../components/Dashboard/Stats";
import { UsersTable } from "../components/Dashboard/UserTable";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DonationDone } from "../components/Dashboard/DonationsDone";
import { DonationRecibed } from "../components/Dashboard/DonationRecibed";
import { Users, HandHeart, Archive, FileWarning, Star, Bookmark } from "lucide-react";
export const Dashboard = () => {
    const isAdmin = false

    return (
        <DashboardLayout isAdmin={isAdmin}>
            <div className="flex w-full max-w-7xl">
                <div className="flex-1">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {isAdmin ?
                            (
                                <>
                                    <Stats title="Donaciones Activas" value="1.000" icon={<HandHeart />} color="bg-primary/20 text-primary" />
                                    <Stats title="Donaciones Cerrdas" value="2.000" icon={<Archive />} color="bg-secondary/20 text-secondary" />
                                    <Stats title="Usuarios Registrados" value="4.000" icon={<Users />} color="bg-accent/20 text-accent" />
                                    <Stats title="Reportes sin revisar" value="50" icon={<FileWarning />} color="bg-info/20 text-base" />
                                </>
                            )
                            :
                            (
                                <>
                                    <Stats title="Donaciones Publicadas" value="20" icon={<HandHeart />} color="bg-primary/20 text-primary" />
                                    <Stats title="Donaciones Cerrdas" value="5" icon={<Archive />} color="bg-secondary/20 text-secondary" />
                                    <Stats title="Donaciones Guardadas" value="7" icon={<Bookmark />} color="bg-accent/20 text-accent" />
                                    <Stats title="Reputacionr" value="4.8" icon={<Star />} color="bg-info/20 text-base" />
                                </>
                            )
                        }
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {isAdmin ?
                            (
                                <>
                                    <UsersTable />
                                    <ReportsTable />
                                </>
                            )
                            :
                            (
                                <>
                                <DonationDone/>
                                <DonationRecibed/>
                                </>
                            )

                        }
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}