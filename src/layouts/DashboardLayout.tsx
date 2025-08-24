import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 z-50 w-full">
        <Navbar isOpenMenu={isOpen} setIsOpenMenu={setIsOpen} />
      </div>
      <div className="flex mt-10 min-h-screen">
        <div className="">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="flex-grow p-4 pt-20 lg:ml-52 lg:pt-16">
          <main className="w-full h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
