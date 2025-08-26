import type {
  User,
  UserCredential,
  NewUser,
  UserUpdate,
  PasswordChange,
} from "../interfaces/User";

export interface UserRepository {
  login(credentials: UserCredential): Promise<User>;
  register(newUser: NewUser): Promise<User>;
  getById(id: string): Promise<User>;
  refreshToken(token: string): Promise<{ accessToken: string }>;
  update(id: string, user: UserUpdate): Promise<User | undefined>;
  changePassword(id: string, passwords: PasswordChange): Promise<User | undefined>;
  delete(id: string): Promise<void>;
  getAll(): Promise<User[]>;
}
