export type UserRole = "Admin" | "User";



export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  accessToken?: string;
  refreshToken?: string;
}

export interface UserCredential {
  email: string;
  password?: string;
}

export interface NewUser {
  name: string;
  email: string;
  password?: string;
}
export interface UserUpdate
  extends Partial<
    Omit<
      User,
      "id" | "role" | "createdAt" | "updatedAt" | "accessToken" | "refreshToken"
    >
  > {}
export interface PasswordChange {
  oldPassword: string;
  newPassword: string;
}

export interface NewUser extends Omit<User, "id" | "createdAt" | "updatedAt"> {}
