import { useState } from "react";
import type { Category } from "../domain/interfaces/Category";
import { CategoriesTable } from "../components/Dashboard/CategoriesTable";
import { CategoryForm } from "../components/Dashboard/CategoryForm";

const initialCategories: Category[] = [
    {
        id: 1,
        title: "Tecnología",
        icon: "Monitor",
        description: "Gadgets y electrónica",
        createdAt: new Date(),
    },
    {
        id: 2,
        title: "Hogar",
        icon: "Home",
        description: "Productos para la casa",
        createdAt: new Date(),
    },
    {
        id: 3,
        title: "Alimentación",
        icon: "UtensilsCrossed",
        description: "Comida y bebida",
        createdAt: new Date(),
    },
];

export const DashboardCategory = () => {

    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [category, setCategory] = useState<Partial<Category>>({})

    const editButtonClick = (idCategory: number) => {
        const categorySelected = categories.find(category => category.id === idCategory)
        if (categorySelected) setCategory(categorySelected)
        setEditing(true)
    }

    const finshForm = (category: Partial<Category>) => {

        if (editing) {
            const newCategories = categories.map((c) =>
                c.id === category.id ? { ...c, ...category } : c
            )
            setCategories(newCategories)
        } else {
            const newCategories = [...categories, (category as Category)]
            setCategories(newCategories)
        }

        setCategory({});
        setEditing(false);
    }

    const deleteCategory = (idCategory: number) => {
        const confirmDelete = window.confirm("¿Seguro que quieres eliminar esta categoría?");
        if (!confirmDelete) return;

        setCategories(categories.filter(cat => cat.id !== idCategory));
    }

    return (
        <div className="container mx-auto p-4 bg-base-100 rounded-box shadow-xl min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">
                    Category Management
                </h1>
                <button className="btn btn-primary" onClick={() => {
                    setModalOpen(true)
                    setEditing(false)
                }}>
                    Create Category
                </button>
            </div>

            <CategoriesTable categoriesRecived={categories} setEdit={editButtonClick} setOpen={setModalOpen} deleteCategory={deleteCategory}/>
            <CategoryForm open={modalOpen} setOpen={setModalOpen} edit={editing} category={category} finishForm={finshForm} />

        </div>
    );
}
