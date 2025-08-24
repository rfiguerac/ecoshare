import { useEffect, useState } from "react";
import type { Category } from "../domain/interfaces/Category";

import { CategoryForm } from "../components/Dashboard/CategoryForm";
import { Table } from "../components/Table";
import { useCategoryStore } from "../store/CategoryStore";
import { useToast } from "../contexts/ToastContext";

export const DashboardCategory = () => {
  const { categories, fetchCategories, deleteCategory } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState<Category>();

  const { showToast } = useToast();

  const handleDeleteCategory = async (id: number | string) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta categoría?"
    );
    console.log(confirmDelete);
    if (confirmDelete) {
      const res = await deleteCategory(String(id));
      if (res) {
        showToast("Category delete successful", "success");
      } else {
        showToast("Category delete failed", "error");
      }
    }
  };

  const handleShowModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleEditCategory = (category: Category) => {
    setCategory(category);
    setEditing(true);
    handleShowModal();
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          Category Management
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleShowModal();
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

      {isOpenModal && (
        <CategoryForm
          handleShowModal={handleShowModal}
          edit={editing}
          category={category}
        />
      )}
    </div>
  );
};
