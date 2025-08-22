import { Home, Users, Settings, FileWarning, Tags, Bookmark, HandHeart, Package, AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = ({children} : {children: React.ReactNode}) => {

    const isAdmin = true;
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden self-start mb-4 ml-2">
                    <AlignJustify />
                </label>

                {children}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                 <ul className="space-y-2 min-h-full bg-base-200 min-w-50 p-2">
      <li>
        <Link to="/dashboard" className="btn btn-ghost flex items-center justify-start w-full gap-3">
          <Home size={20} />
          Home
        </Link>
      </li>

      {isAdmin ? (
        <>
          <li>
            <Link to="/dashboard/reports" className="btn btn-ghost flex items-center justify-start w-full gap-3">
              <FileWarning size={20} />
              Reports
            </Link>
          </li>
          <li>
            <Link to="/dashboard/category" className="btn btn-ghost flex items-center justify-start w-full gap-3">
              <Tags size={20} />
              Categories
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" className="btn btn-ghost flex items-center justify-start w-full gap-3">
              <Users size={20} />
              Users
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/dashboard/donations/mis-donaciones" className="btn btn-ghost flex items-center justify-start w-full gap-3">
              <HandHeart size={20} />
              My donations
            </Link>
          </li>
          <li>
            <Link to="/dashboard/donations/recibidas" className="btn btn-ghost flex items-center justify-start w-full gap-3">
              <Package size={20} />
              Donations Recived
            </Link>
          </li>
          <li>
            <Link to="/dashboard/donations/guardadas" className="btn btn-ghost flex items-center justify-start w-full gap-3">
              <Bookmark size={20} />
              Donaciones Saved
            </Link>
          </li>
        </>
      )}

      <li>
        <Link to="/dashboard/settings" className="btn btn-ghost flex items-center justify-start w-full gap-3">
          <Settings size={20} />
          Configuration
        </Link>
      </li>
    </ul>
            </div>
        </div>
    )
}