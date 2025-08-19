import type { Category } from "../domain/interfaces/Category";
import type { CategoryRepository } from "../domain/repositories/CategoryRepository";

export const categoryService = (respository: CategoryRepository) => {
  const getCategories = async () => {
    return await respository.getAllCategories();
  };

  const getCategoryById = async (id: string) => {
    return await respository.getCategoryById(id);
  };

  const createCategory = async (category: Category) => {
    return await respository.createCategory(category);
  };

  const updateCategory = async (id: string, category: Category) => {
    return await respository.updateCategory(id, category);
  };

  const deleteCategory = async (id: string) => {
    return await respository.deleteCategory(id);
  };

  return {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
