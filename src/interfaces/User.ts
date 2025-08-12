type UserRole = "admin" | "user";

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
