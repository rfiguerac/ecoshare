import { useState } from "react";
import { ReportsTable } from "../components/Dashboard/ReportsTable";
import type { Report } from "../domain/interfaces/Report";

export const DashboardReports = () => {

    const reportsRecived = [
        {
            id: 1,
            reporter: "Juan Pérez",
            reportType: "Bug",
            description: "El botón de guardar no funciona correctamente en la vista de perfil.",
            idDonation: 1,
        },
        {
            id: 2,
            reporter: "María López",
            reportType: "Sugerencia",
            description: "Sería útil tener un modo oscuro en la aplicación.",
            idDonation: 2,
        },
        {
            id: 3,
            reporter: "Carlos Sánchez",
            reportType: "Error de seguridad",
            description: "La contraseña se muestra en texto plano al hacer login.",
            idDonation: 3,
        },
        {
            id: 4,
            reporter: "Ana Torres",
            reportType: "Bug",
            description: "En la vista móvil, la tabla de usuarios se desborda.",
            idDonation: 4,
        },
        {
            id: 5,
            reporter: "Luis Fernández",
            reportType: "Otro",
            description: "El sistema tarda mucho en cargar al iniciar sesión.",
            idDonation: 5,
        },
    ];

    const [reports, setReports] = useState<Report[]>(reportsRecived)

    const deleteDonation = (idDonation: number) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta publicación?");
        if (!confirmDelete) return;
        //codigo eliminacion de publicacion
    };

    const reportRevised = (idReport: number) => {
        const confirmDelete = window.confirm("¿Seguro que quieres marcar este reporte como revisado?");
        if (!confirmDelete) return;
        //codigo de marcar reporte 

        const newReportsList = reports.filter( report  => report.id !== idReport)
        setReports(newReportsList)

    };
    return (
        <div className="container mx-auto p-4 bg-base-100 rounded-box shadow-xl min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">
                    Gestión de Reportes
                </h1>
            </div>

            <ReportsTable  reportsRecived={reports} deleteDonation={deleteDonation} reportRevised={reportRevised}/>
        </div>
    )
}