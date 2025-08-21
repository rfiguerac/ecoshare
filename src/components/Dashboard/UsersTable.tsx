import type { User } from "../../domain/interfaces/User";

type UsersTableProps = {
  usersRecived: User[];
  setEdit: (idUser: string) => void;
  setOpen: (x: boolean) => void;
  deleteUser: (idUser: string) => void;
};

export const UsersTable = ({ usersRecived, setEdit, setOpen, deleteUser }: UsersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usersRecived.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="flex gap-2 justify-center">
                <button
                  className="btn btn-sm btn-info text-info-content"
                  onClick={() => {
                    if (user.id) {
                      setEdit(user.id);
                      setOpen(true);
                    }
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-error text-error-content"
                  onClick={() => {
                    if (user.id) {
                      deleteUser(user.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
