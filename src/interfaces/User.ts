export type UserRole = "admin" | "user";

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
