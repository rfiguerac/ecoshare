import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Navbar } from "../components/Navbar";
export const DashboardLayout = () => {
  return (
    <>
      <div className="mb-20">
        <Navbar />
      </div>

      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
};
