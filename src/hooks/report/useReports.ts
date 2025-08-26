import { useEffect, useState } from "react";
import type { Report } from "../../domain/interfaces/Report";

export const useReports = () => {
    const [reports, setReports] = useState<Report[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchReports = async () => {
            setLoading(true);
            try {
                const data: Report[] = [
                    {
                        id: 1,
                        userId: 1,
                        description: "El botón de guardar no funciona correctamente en la vista de perfil.",
                        idDonation: 1,
                    },
                    {
                        id: 2,
                        userId: 1,
                        description: "Sería útil tener un modo oscuro en la aplicación.",
                        idDonation: 2,
                    },
                    {
                        id: 3,
                        userId: 1,

                        description: "La contraseña se muestra en texto plano al hacer login.",
                        idDonation: 3,
                    },
                    {
                        id: 4,
                        userId: 1,

                        description: "En la vista móvil, la tabla de usuarios se desborda.",
                        idDonation: 4,
                    },
                    {
                        id: 5,
                        userId: 1,

                        description: "El sistema tarda mucho en cargar al iniciar sesión.",
                        idDonation: 5,
                    },
                ];
            
                setReports(data);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const deleteDonation = (idDonation: number) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta publicación?");
        if (!confirmDelete) return;
    };

    const reportRevised = (idReport: number) => {
        const confirmDelete = window.confirm("¿Seguro que quieres marcar este reporte como revisado?");
        if (!confirmDelete) return;

        setReports(prev => prev.filter(report => report.id !== idReport));
    };

    return {
        reports,
        deleteDonation,
        reportRevised,
    };
};
