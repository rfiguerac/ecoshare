import type { FC } from "react";
import type { Category } from "../../domain/interfaces/Category";
import type { LucideProps } from "lucide-react";
import * as Icons from "lucide-react";

type CategoriesTableProps = {
    categoriesRecived: Category[],
    setEdit: (idCategory: number) => void,
    setOpen: (x: boolean) => void,
    deleteCategory: (idCat: number) => void
};

export const CategoriesTable = ({ categoriesRecived, setEdit, setOpen, deleteCategory }: CategoriesTableProps) => {

const searchIcon = (iconName: string) : FC<LucideProps> => {

        const iconComponent = (Icons as any)[iconName]
        return iconComponent
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
                <thead>
                    <tr className="bg-base-200">
                        <th>ID</th>
                        <th>Icon</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesRecived.map((category) => {
                        const Icon = searchIcon(category.icon)
                        return (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>
                                    <Icon className="w-5 h-5" />
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
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error text-error-content"
                                        onClick={() => {
                                            if (category.id) {
                                                deleteCategory(category.id)
                                            }
                                        }}
                                    >
                                        Delete
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