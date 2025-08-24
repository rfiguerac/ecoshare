import { useEffect, useState } from "react";
import type { Category } from "../domain/interfaces/Category";

import { CategoryForm } from "../components/Dashboard/CategoryForm";
import { Table } from "../components/Table";
import { useCategoryStore } from "../store/CategoryStore";

export const DashboardCategory = () => {
  const { categories, fetchCategories } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState<Partial<Category>>({});

  const handleDeleteCategory = (idCategory: number | string) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta categoría?"
    );
    if (!confirmDelete) return;
  };

  const handleEditCategory = (category: Category) => {};

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          Category Management
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalOpen(true);
            setEditing(false);
          }}>
          Create Category
        </button>
      </div>

      <Table
        headers={[
          { key: "title", label: "Título" },
          { key: "icon", label: "Ícono" },
          { key: "description", label: "Descripción" },
          { key: "createdAt", label: "Fecha de Creación" },
        ]}
        dataTable={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />

      <CategoryForm
        open={modalOpen}
        setOpen={setModalOpen}
        edit={editing}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
};
