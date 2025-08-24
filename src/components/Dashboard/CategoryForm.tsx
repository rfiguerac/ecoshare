import * as Icons from "lucide-react";
import type { Category } from "../../domain/interfaces/Category";
import { useCategory } from "../../hooks/category/useCategory";

type IconName = keyof typeof Icons;
const allIcons: IconName[] = Object.keys(Icons) as IconName[];

type CategoryFormProps = {
  handleShowModal: () => void;
  edit: boolean;
  category?: Category;
};

export const CategoryForm = ({
  handleShowModal,
  edit,
  category,
}: CategoryFormProps) => {
  const { formData, isSubmitting, errors, handleChange, handleSubmit } =
    useCategory(handleShowModal, edit, category);

  const handleClose = () => {
    handleShowModal();
  };

  return (
    <>
      <dialog id="my_modal" className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {edit ? "Edit category" : "Create category"}
          </h3>

          <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting}></fieldset>
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Nombre categoría"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Icon</span>
              </label>
              <select
                name="icon"
                className={`select select-bordered w-full`}
                value={formData.icon}
                onChange={handleChange}>
                <option value="" disabled>
                  Selecciona un icono
                </option>
                {allIcons.sort().map((iconName) => (
                  <option key={iconName} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </select>
              {errors.icon && (
                <p className="mt-1 text-sm text-red-600">{errors.icon}</p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                name="description"
                placeholder="Descripción de la categoria"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {edit ? "Update" : "Create"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => handleClose()}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
