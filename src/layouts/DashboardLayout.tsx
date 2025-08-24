import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Navbar } from "../components/Navbar";
export const DashboardLayout = () => {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className="pt-20">
        <Sidebar>
          <div className="pl-4 pr-4">
            <Outlet />
          </div>
        </Sidebar>
      </div>
    </>
  );
};
