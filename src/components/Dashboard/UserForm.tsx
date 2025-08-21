import type { User } from "../../domain/interfaces/User";
import { useEffect, useState } from "react";

type UserFormProps = {
  open: boolean;
  setOpen: (x: boolean) => void;
  edit: boolean;
  user: Partial<User>;
  finishForm: (user: Partial<User>) => void;
};

export const UserForm = ({ open, setOpen, edit, user, finishForm }: UserFormProps) => {
  const [localUser, setLocalUser] = useState<Partial<User>>({});

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setLocalUser({ ...localUser, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userWithId: User = {
      ...localUser,
      id: localUser.id ?? Date.now().toString(),
      createdAt: localUser.createdAt ?? new Date(),
      updatedAt: new Date(),
    } as User;

    finishForm(userWithId);
    alert(edit ? "Usuario actualizado" : "Usuario creado");
    setOpen(false);
  };

  return (
    <>
      {open && (
        <dialog id="user_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {edit ? "Editar Usuario" : "Crear Usuario"}
            </h3>

            <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre del usuario"
                  className="input input-bordered w-full"
                  value={localUser.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="input input-bordered w-full"
                  value={localUser.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              {!edit && (
                <div>
                  <label className="label">
                    <span className="label-text">Contraseña</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="input input-bordered w-full"
                    value={localUser.password || ""}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="label">
                  <span className="label-text">Rol</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={localUser.role || ""}
                  onChange={(e) => handleChange("role", e.target.value)}
                  required
                >
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  {edit ? "Actualizar" : "Crear"}
                </button>
                <button type="button" className="btn" onClick={() => setOpen(false)}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};
