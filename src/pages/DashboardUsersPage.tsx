import { useState } from "react";
import type { User } from "../domain/interfaces/User";
import { UsersTable } from "../components/Dashboard/UsersTable";
import { UserForm } from "../components/Dashboard/UserForm";

const initialUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "Admin",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "María Gómez",
    email: "maria@example.com",
    role: "User",
    createdAt: new Date(),
  },
];

export const DashboardUser = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<Partial<User>>({});

  const editButtonClick = (idUser: string) => {
    const userSelected = users.find((user) => user.id === idUser);
    if (userSelected) setUser(userSelected);
    setEditing(true);
  };

  const finishForm = (user: Partial<User>) => {
    if (editing) {
      const newUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...user } : u
      );
      setUsers(newUsers);
    } else {
      const newUsers = [...users, user as User];
      setUsers(newUsers);
    }

    setUser({});
    setEditing(false);
  };

  const deleteUser = (idUser: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setUsers(users.filter((u) => u.id !== idUser));
  };

  return (
    <div className="container mx-auto p-4 bg-base-100 rounded-box shadow-xl min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          User Management
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalOpen(true);
            setEditing(false);
          }}
        >
          Crear Usuario
        </button>
      </div>

      <UsersTable
        usersRecived={users}
        setEdit={editButtonClick}
        setOpen={setModalOpen}
        deleteUser={deleteUser}
      />
      <UserForm
        open={modalOpen}
        setOpen={setModalOpen}
        edit={editing}
        user={user}
        finishForm={finishForm}
      />
    </div>
  );
};
