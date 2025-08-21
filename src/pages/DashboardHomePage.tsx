import { ReportsTable } from "../components/Dashboard/ReportsTable";
import { Stats } from "../components/Dashboard/Stats";
import { UsersTable } from "../components/Dashboard/UserTable";
import { DonationDone } from "../components/Dashboard/DonationsDone";
import { DonationRecibed } from "../components/Dashboard/DonationRecibed";
import {
  Users,
  HandHeart,
  Archive,
  FileWarning,
  Star,
  Bookmark,
} from "lucide-react";
import { useEffect, useState } from "react";

type AdminStats = {
  activeDonations: number;
  closedDonations: number;
  users: number;
  reports: number;
};

type UserStats = {
  publishedDonations: number;
  closedDonations: number;
  savedDonations: number;
  reputation: number;
};

export const DashboardHome = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch por implementar

        if (isAdmin) {
          setAdminStats({
            activeDonations: 1000,
            closedDonations: 2000,
            users: 4000,
            reports: 50,
          });
        } else {
          setUserStats({
            publishedDonations: 20,
            closedDonations: 5,
            savedDonations: 7,
            reputation: 4.8,
          });
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex w-full max-w-7xl mt-10">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isAdmin ? (
            <>
              <Stats
                title="Donaciones Activas"
                value={adminStats?.activeDonations.toString() ?? "0"}
                icon={<HandHeart />}
                color="bg-primary/20 text-primary"
              />
              <Stats
                title="Donaciones Cerrdas"
                value={adminStats?.closedDonations.toString() ?? "0"}
                icon={<Archive />}
                color="bg-secondary/20 text-secondary"
              />
              <Stats
                title="Usuarios Registrados"
                value={adminStats?.users.toString() ?? "0"}
                icon={<Users />}
                color="bg-accent/20 text-accent"
              />
              <Stats
                title="Reportes sin revisar"
                value={adminStats?.reports.toString() ?? "0"}
                icon={<FileWarning />}
                color="bg-info/20 text-base"
              />
            </>
          ) : (
            <>
              <Stats
                title="Donaciones Publicadas"
                value={userStats?.publishedDonations.toString() ?? "0"}
                icon={<HandHeart />}
                color="bg-primary/20 text-primary"
              />
              <Stats
                title="Donaciones Cerrdas"
                value={userStats?.closedDonations.toString() ?? "0"}
                icon={<Archive />}
                color="bg-secondary/20 text-secondary"
              />
              <Stats
                title="Donaciones Guardadas"
                value={userStats?.savedDonations.toString() ?? "0"}
                icon={<Bookmark />}
                color="bg-accent/20 text-accent"
              />
              <Stats
                title="Reputacionr"
                value={userStats?.reputation.toString() ?? "0"}
                icon={<Star />}
                color="bg-info/20 text-base"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isAdmin ? (
            <>
              <UsersTable />
              <ReportsTable />
            </>
          ) : (
            <>
              <DonationDone />
              <DonationRecibed />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
