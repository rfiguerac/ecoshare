import { Home, LayoutGrid, BarChart, Users, Settings, Menu } from "lucide-react";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">

                {children}


                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="space-y-2 min-h-full bg-base-200 min-w-50">
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <Home size={20} />
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <LayoutGrid size={20} />
                                
                        </a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <BarChart size={20} />
                            Analíticas
                        </a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <Users size={20} />
                            Usuarios
                        </a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <Settings size={20} />
                            Configuración
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}