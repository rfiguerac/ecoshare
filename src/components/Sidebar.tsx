import * as LucideIconsAll from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// Filtramos solo los iconos exportados (omitimos createLucideIcon)
const LucideIcons = Object.fromEntries(
  Object.entries(LucideIconsAll).filter(([key]) => key !== "createLucideIcon")
) as Record<string, React.ComponentType<any>>;

export const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "Home" },
    { name: "Donations", path: "/dashboard/donations", icon: "Coffee" },
    { name: "Users", path: "/dashboard/users", icon: "User" },
    { name: "Categories", path: "/dashboard/categories", icon: "Grid" },
    { name: "Reports", path: "/dashboard/reports", icon: "BarChart" },
    { name: "Settings", path: "/dashboard/settings", icon: "Settings" },
  ];

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
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                    onClick={() => setIsOpen(false)}>
                    {Icon && <Icon size={20} />}
                    {item.name}
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
