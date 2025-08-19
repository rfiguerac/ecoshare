import { ecoshareApi } from "../api/ecoshareApi";
import type { CategoryRepository } from "../domain/repositories/CategoryRepository";
import type { Category } from "../domain/interfaces/Category";

export const categoryRepositoryImpl: CategoryRepository = {
  getAllCategories: async () => {
    const response = await ecoshareApi.get("/categories");
    return response.data;
  },
  getCategoryById: async (id: string) => {
    const response = await ecoshareApi.get(`/categories/${id}`);
    return response.data;
  },
  createCategory: async (category: Category) => {
    const response = await ecoshareApi.post("/categories", category);
    return response.data;
  },
  updateCategory: async (id: string, category: Category) => {
    const response = await ecoshareApi.put(`/categories/${id}`, category);
    return response.data;
  },
  deleteCategory: async (id: string) => {
    const response = await ecoshareApi.delete(`/categories/${id}`);
    return response.status === 204;
  },
};
