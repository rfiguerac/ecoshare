import { create } from "zustand";
import { categoryService } from "../services/categoryService";
import type { Category } from "../domain/interfaces/Category";
import { categoryRepositoryImpl } from "../data/CategoryRepository.impl";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  fetchCategories: () => Promise<void>;
  createCategory: (category: Category) => Promise<void>;
  updateCategory: (id: string, category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  fetchCategories: async () => {
    set({ loading: true });
    const repo = categoryRepositoryImpl;
    const service = categoryService(repo);
    const data = await service.getCategories();
    set({ categories: data, loading: false });
  },
  createCategory: async (category: Category) => {
    const repo = categoryRepositoryImpl;
    const service = categoryService(repo);
    await service.createCategory(category);
  },
  updateCategory: async (id: string, category: Category) => {
    const repo = categoryRepositoryImpl;
    const service = categoryService(repo);
    await service.updateCategory(id, category);
  },
  deleteCategory: async (id: string) => {
    const repo = categoryRepositoryImpl;
    const service = categoryService(repo);
    await service.deleteCategory(id);
  },
}));
