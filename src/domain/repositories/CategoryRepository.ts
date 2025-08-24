import type { Category } from "../interfaces/Category";

export interface CategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  createCategory(category: Category): Promise<Category>;
  updateCategory(id: string, category: Category): Promise<Category | null>;
  deleteCategory(id: string): Promise<Category | null>;
}
