export const DonationRecibed = () => {

    const tableData = [
  {
    id: 1,
    title: "Kits Escolares 2025",
    descripcion: "Mochilas y útiles escolares completos para niños de primaria",
    category: "Educación",
    donor: "Fundación Manos Unidas"
  },
  {
    id: 2,
    title: "Alimentos no perecederos",
    descripcion: "Despensas con arroz, frijoles, aceite y enlatados básicos",
    category: "Alimentación",
    donor: "Supermercados La Esperanza"
  },
  {
    id: 3,
    title: "Medicinas Básicas",
    descripcion: "Analgésicos, antibióticos y sueros orales",
    category: "Salud",
    donor: "Farmacia Vida"
  },
  {
    id: 4,
    title: "Ropa de Invierno",
    descripcion: "Chamarras, guantes y bufandas en buen estado",
    category: "Ropa",
    donor: "Colegio San José"
  },
  {
    id: 5,
    title: "Croquetas y Accesorios",
    descripcion: "Alimento, camas y correas para perros rescatados",
    category: "Animales",
    donor: "Asociación Patitas Felices"
  }
];


    return (
        <div className="card w-full shadow-lg rounded-2xl bg-base-200">
            <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold mb-4">Donations Recived</h2>
                <div className="overflow-x-auto"> 
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="font-semibold text-base-content/80">Title</th>
                                <th className="font-semibold text-base-content/80">Description</th>
                                <th className="font-semibold text-base-content/80">Category</th>
                                <th className="font-semibold text-base-content/80">Donor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((donation) => (
                                <tr key={donation.id}>
                                    <td>{donation.title}</td>
                                    <td>{donation.descripcion}</td>
                                    <td>{donation.category}</td>
                                    <td>{donation.donor}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}