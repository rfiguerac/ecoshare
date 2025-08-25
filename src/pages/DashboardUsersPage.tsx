import { useState } from "react";
import type { User } from "../domain/interfaces/User";
import { UserForm } from "../components/Dashboard/UserForm";
import { useAuthStore } from "../store/AuthStore";
import { Table } from "../components/Table";

export const DashboardUser = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<Partial<User>>({});

  const { allProfiles } = useAuthStore();

  const editButtonClick = (idUser: string) => {
    const userSelected = allProfiles!.find((user) => user.id === idUser);
    if (userSelected) setUser(userSelected);
    setEditing(true);
  };

  const finishForm = (user: Partial<User>) => {
    if (editing) {
    } else {
    }

    setUser({});
    setEditing(false);
  };

  const deleteUser = (idUser: number | string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
  };

  return (
    <div className="container mx-auto p-4  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">
          User Management
        </h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalOpen(true);
            setEditing(false);
          }}>
          Crear Usuario
        </button>
      </div>

      <Table
        headers={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "createdAt", label: "Created At" },
        ]}
        dataTable={allProfiles!}
        onEdit={editButtonClick}
        onDelete={deleteUser}
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
