import { create } from "zustand";
import { categoryService } from "../services/categoryService";
import type { Category } from "../domain/interfaces/Category";
import { categoryRepositoryImpl } from "../data/CategoryRepository.impl";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategory: (category: Category) => Promise<Category | undefined>;
  updateCategory: (
    id: string,
    category: Category
  ) => Promise<Category | undefined>;
  deleteCategory: (id: string) => Promise<Category | undefined>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    set({ loading: true });
    const repo = categoryRepositoryImpl;
    const service = categoryService(repo);
    const data = await service.getCategories();
    set({ categories: data, loading: false });
  },
  createCategory: async (category: Category) => {
    try {
      set({ loading: true, error: null });
      const repo = categoryRepositoryImpl;
      const service = categoryService(repo);
      const res = await service.createCategory(category);
      return res;
    } catch (error) {
      console.error("Error creating category:", error);
      set({ loading: false, error: "Error creating category" });
    }
  },
  updateCategory: async (id: string, category: Category) => {
    try {
      set({ loading: true, error: null });
      const repo = categoryRepositoryImpl;
      const service = categoryService(repo);
      const res = await service.updateCategory(id, category);
      return res ? res : undefined;
    } catch (error) {
      console.error("Error updating category:", error);
      set({ loading: false, error: "Error updating category" });
    }
  },
  deleteCategory: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const repo = categoryRepositoryImpl;
      const service = categoryService(repo);
      const res = await service.deleteCategory(id);
      return res ? res : undefined;
    } catch (error) {
      console.error("Error deleting category:", error);
      set({ loading: false, error: "Error deleting category" });
    }
  },
}));
