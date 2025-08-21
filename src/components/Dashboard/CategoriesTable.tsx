import type { Category } from "../../domain/interfaces/Category";

type CategoriesTableProps = {
    categoriesRecived: Category[],
    setEdit: (idCategory: number) => void,
    setOpen: (x: boolean) => void,
    deleteCategory: (idCat: number) => void
};

export const CategoriesTable = ({ categoriesRecived, setEdit, setOpen, deleteCategory }: CategoriesTableProps ) => {

    return (
        <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
                <thead>
                    <tr className="bg-base-200">
                        <th>ID</th>
                        <th>Icono</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesRecived.map((category) => {

                        return (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>
                                    icono
                                </td>
                                <td>{category.title}</td>
                                <td>{category.description}</td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        className="btn btn-sm btn-info text-info-content"
                                        onClick={() => {
                                            if (category.id) {
                                                setEdit(category.id)
                                                setOpen(true)
                                            }
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error text-error-content"
                                        onClick={() => {
                                            if (category.id) {
                                                deleteCategory(category.id)
                                            }
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}