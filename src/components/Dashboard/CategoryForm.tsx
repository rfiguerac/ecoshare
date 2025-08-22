import * as Icons from "lucide-react";
import type { Category } from "../../domain/interfaces/Category";
import { useEffect, useState } from "react";

type IconName = keyof typeof Icons;
const allIcons: IconName[] = Object.keys(Icons) as IconName[];

type CategoryFormProps = {
    open: boolean,
    setOpen: (x: boolean) => void,
    edit: boolean,
    category: Partial<Category>,
    finishForm: (cat: Partial<Category>) => void,
};

export const CategoryForm = ({ open, setOpen, edit, category, finishForm }: CategoryFormProps) => {

    const [localCategory, setLocalCategory] = useState<Partial<Category>>({});

    useEffect(() => {
        if (open) {
            if (edit) {
                setLocalCategory(category)
            } else {
                setLocalCategory({})
            }
        }
    }, [open, edit, category]);

    const handleChange = (field: keyof Category, value: string) => {
        setLocalCategory({ ...localCategory, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const categoryWithId = {
            ...localCategory,
            id: localCategory.id ?? Date.now(),
            createdAt: localCategory.createdAt ?? new Date(),
        };
        finishForm(categoryWithId);
        alert(edit ? "Updated category" : "Created category");
        setOpen(false);
    };

    return (
        <>
            {open && (
                <dialog id="my_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">{edit ? "Edit category" : "Create category"}</h3>

                        <form
                            method="dialog"
                            className="space-y-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre categoría"
                                    className="input input-bordered w-full"
                                    value={localCategory.title || ""}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Icon</span>
                                </label>
                                <select
                                    name="icon"
                                    className={`select select-bordered w-full`}
                                    value={localCategory.icon || ""}
                                    onChange={(e) => handleChange("icon", e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Selecciona un icono</option>
                                    {allIcons.sort().map((iconName) => (
                                        <option key={iconName} value={iconName}>
                                            {iconName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Descripción de la categoria"
                                    value={localCategory.description || ""}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {edit ? "Update" : "Create"}
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
};