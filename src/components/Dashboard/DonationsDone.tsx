export const DonationDone = () => {

    const tableData = [
  {
    reporter: "Campaña Escolar 2025",
    type: "Recolección de útiles escolares para niños de bajos recursos",
    title: "Educación"
  },
  {
    reporter: "Alimento para Refugio Canino",
    type: "Donación de croquetas y medicinas para perros rescatados",
    title: "Animales"
  },
  {
    reporter: "Apoyo a Familias Afectadas por Inundaciones",
    type: "Entrega de despensas, ropa y agua embotellada",
    title: "Desastres Naturales"
  },
  {
    reporter: "Medicamentos para Adultos Mayores",
    type: "Campaña de recolección de medicinas no caducadas",
    title: "Salud"
  },
  {
    reporter: "Juguetes para Sonrisas",
    type: "Donación de juguetes nuevos y usados en buen estado",
    title: "Niños"
  }
];

    return(
         <div className="card w-full shadow-lg rounded-2xl bg-base-200">
            <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold mb-4">Donaciones Publicadas</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="font-semibold text-base-content/80">Tiutulo</th>
                                <th className="font-semibold text-base-content/80">Descripcion</th>
                                <th className="font-semibold text-base-content/80">Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((donation) => (
                                <tr key={donation.reporter}>
                                    <td>{donation.reporter}</td>
                                    <td>{donation.type}</td>
                                    <td>{donation.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}