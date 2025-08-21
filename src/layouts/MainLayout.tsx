import { Outlet } from "react-router-dom";

import { Footer } from "../components/Main/Footer";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  return (
    <div className="place-items-center">
      <main className="container">
        <div className="pt-8 mb-5">
          <Navbar />
        </div>
        <div className="container pt-7">
          <Outlet />
        </div>

        {/* footer */}
        <div className="container pt-2">
          <Footer />
        </div>
      </main>
    </div>
  );
};
