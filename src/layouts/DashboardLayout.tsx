import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Dashboard/Sidebar";
export const DashboardLayout = () => {
   
    return (
        <Sidebar>
            <Outlet/>
        </Sidebar>
    )
        
}