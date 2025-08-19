import { Home, Users, Settings, FileWarning, Tags, Bookmark, HandHeart, Package } from "lucide-react";

export const DashboardLayout = ({ children, isAdmin }: { children: React.ReactNode, isAdmin: boolean }) => {

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
                    {isAdmin ?
                        (<>
                            <li>
                                <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                                    <FileWarning size={20} />
                                    Reportes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                                    <Tags size={20} />
                                    Categorias
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                                    <Users size={20} />
                                    Usuarios
                                </a>
                            </li>
                        </>
                        )
                        :
                        (
                            <>
                                <li>
                                    <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                                        <HandHeart size={20} />
                                        Mis donaciones
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                                        <Package size={20} />
                                        Donaciones recibidas
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                                        <Bookmark size={20} />
                                        Donaciones guardadas
                                    </a>
                                </li>
                            </>
                        )}
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