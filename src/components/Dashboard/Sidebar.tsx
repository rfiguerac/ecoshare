import { Home, LayoutGrid, BarChart, Users, Settings } from 'lucide-react';

export const Sidebar = () => {
    return (
        <div className="">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                {/* Logo y Título */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-center">Mi Dashboard</h1>
                </div>
                {/* Menú de navegación */}
                <ul className="space-y-2">
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <Home size={20} />
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a href="#" className="btn btn-ghost flex items-center justify-start w-full gap-3">
                            <LayoutGrid size={20} />
                            Proyectos
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