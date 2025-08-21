export const ReportsTable = () => {

    const tableData = [
        {
            reporter: "Juan Pérez",
            type: "Contenido inapropiado",
            description: "Publicación ofensiva en el grupo",
        },
        {
            reporter: "María López",
            type: "Spam",
            description: "Publicidad repetitiva en comentarios",
        },
        {
            reporter: "Carlos Gómez",
            type: "Falso perfil",
            description: "Cuenta sospechosa con fotos robadas",
        },
        {
            reporter: "Ana Torres",
            type: "Lenguaje de odio",
            description: "Comentario discriminatorio en una publicación",
        },
    ];


    return (
        <div className="card w-full shadow-lg rounded-2xl bg-base-200">
            <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold mb-4">Reportes sin revisar</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="font-semibold text-base-content/80">Denunciante</th>
                                <th className="font-semibold text-base-content/80">Tipo de Reporte</th>
                                <th className="font-semibold text-base-content/80">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((report) => (
                                <tr key={report.reporter}>
                                    <td>{report.reporter}</td>
                                    <td>{report.type}</td>
                                    <td>{report.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}