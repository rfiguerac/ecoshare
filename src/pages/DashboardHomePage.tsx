import { ReportsTable } from "../components/Dashboard/ReportTable";
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
import { useDonationStore } from "../store/DonationStore";
import { useAuthStore } from "../store/AuthStore";

import type { Donation } from "../domain/interfaces/Donation";

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
  const { donationPagination, fetchDonations } = useDonationStore();
  const { allProfiles, fetchAllProfiles } = useAuthStore();

  const { user } = useAuthStore();

  const [isAdmin, setIsAdmin] = useState(user?.role === "Admin");
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  //obtener todos los datos del usuario autentificado asi:

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchDonations();
        fetchAllProfiles();

        //Total active donations
        const totalActiveDonations = (donationPagination.data ?? []).filter(
          (donation: Donation) => donation.status === "Available"
        ).length;
        // Total closed donations
        const totalClosedDonations = (donationPagination.data ?? []).filter(
          (donation: Donation) => donation.status === "Donated"
        ).length;

        // Total users
        const totalUsers = allProfiles!.length;

        if (isAdmin) {
          setAdminStats({
            activeDonations: totalActiveDonations,
            closedDonations: totalClosedDonations,
            users: totalUsers,
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
    <div className="flex w-full max-w-7xl">
      <div className="flex-1">
        <p className="text-lg font-semibold mb-4">
          Hola {user?.name || "Usuario"}, Me alegro de verte!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {isAdmin ? (
            <>
              <Stats
                title="Active Donations"
                value={adminStats?.activeDonations.toString() ?? "0"}
                icon={<HandHeart />}
                color="bg-primary/50 text-black"
              />
              <Stats
                title="Closed Donations"
                value={adminStats?.closedDonations.toString() ?? "0"}
                icon={<Archive />}
                color="bg-primary/30 text-black"
              />
              <Stats
                title="Registered Users"
                value={adminStats?.users.toString() ?? "0"}
                icon={<Users />}
                color="bg-primary/20 text-black"
              />
              <Stats
                title="Unreviwed    "
                value={adminStats?.reports.toString() ?? "0"}
                icon={<FileWarning />}
                color="bg-info/20 text-base"
              />
            </>
          ) : (
            <>
              <Stats
                title="Published Donations"
                value={userStats?.publishedDonations.toString() ?? "0"}
                icon={<HandHeart />}
                color="bg-primary/50 text-black"
              />
              <Stats
                title="Closed Donations"
                value={userStats?.closedDonations.toString() ?? "0"}
                icon={<Archive />}
                color="bg-primary/30 text-black"
              />
              <Stats
                title="Saved Donations"
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
