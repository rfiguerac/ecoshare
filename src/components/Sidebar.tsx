import * as LucideIconsAll from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useDonationStore } from "../store/DonationStore";
import { useAuthStore } from "../store/AuthStore";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Filtramos solo los iconos exportados (omitimos createLucideIcon)
const LucideIcons = Object.fromEntries(
  Object.entries(LucideIconsAll).filter(([key]) => key !== "createLucideIcon")
) as Record<string, React.ComponentType<any>>;

export const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const { donationPagination } = useDonationStore();
  const { user } = useAuthStore();

  const menuItemUser = [
    { name: "Dashboard", path: "/dashboard", icon: "Home" },
    //{ name: "Donations", path: "/dashboard/donations", icon: "HeartHandshake" },
    { name: "My Donations", path: "/dashboard/my-donations", icon: "Heart" },
    { name: "Received", path: "/dashboard/recieved-donations", icon: "Gift" },
    {
      name: "Requested",
      path: "/dashboard/requested-donations",
      icon: "Handshake",
    },
    //{ name: "Users", path: "/dashboard/users", icon: "User" },
    //{ name: "Categories", path: "/dashboard/categories", icon: "Grid" },
    { name: "Messages", path: "/dashboard/chats", icon: "MessageCircle" },
    //{ name: "Reports", path: "/dashboard/reports", icon: "BarChart" },
    { name: "Settings", path: "/dashboard/settings", icon: "Settings" },
  ];

  const menuItemAdmin = [
    { name: "Dashboard", path: "/dashboard", icon: "Home" },
    { name: "Donations", path: "/dashboard/donations", icon: "HeartHandshake" },
    { name: "My Donations", path: "/dashboard/my-donations", icon: "Heart" },
    { name: "Received", path: "/dashboard/recieved-donations", icon: "Gift" },
    {
      name: "Requested",
      path: "/dashboard/requested-donations",
      icon: "Handshake",
    },
    { name: "Users", path: "/dashboard/users", icon: "User" },
    { name: "Categories", path: "/dashboard/categories", icon: "Grid" },
    { name: "Messages", path: "/dashboard/chats", icon: "MessageCircle" },
    { name: "Reports", path: "/dashboard/reports", icon: "BarChart" },
    { name: "Settings", path: "/dashboard/settings", icon: "Settings" },
  ];

  const menuItems = user?.role === "Admin" ? menuItemAdmin : menuItemUser;

  const numberOfPendingRequests = () => {
    if (!user) return 0;
    const userId = Number(user.id);
    return donationPagination.data.filter(
      (tx) => tx.status === "Reserved" && tx.donorId === userId
    ).length;
  };

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:top-24 top-16 left-0 h-screen bg-base-200 shadow-lg z-10 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-48 w-48`}>
        <nav className="mt-4 px-4">
          <ul className="menu p-0">
            {menuItems.map((item) => {
              const Icon = LucideIcons[item.icon];
              return (
                <li key={item.path} className="relative">
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 rounded-lg hover:bg-primary hover:text-white transition-all p-2"
                    onClick={() => setIsOpen(false)}>
                    {Icon && <Icon size={20} />}
                    <span>{item.name}</span>
                    {item.name === "Requested" &&
                      numberOfPendingRequests() !== 0 && (
                        <span className="badge badge-warning ">
                          {numberOfPendingRequests()}
                        </span>
                      )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
