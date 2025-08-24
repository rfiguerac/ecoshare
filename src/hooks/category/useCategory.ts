import { useState } from "react";
import type { Category } from "../../domain/interfaces/Category";
import { useCategoryStore } from "../../store/CategoryStore";
import { useToast } from "../../contexts/ToastContext";

export const useCategory = (
  handleShowModal: () => void,
  edit: boolean,
  category?: Category
) => {
  const { createCategory, error, updateCategory } = useCategoryStore();
  const { showToast } = useToast();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = {
    title: category?.title || "",
    icon: category?.icon || "Folder",
    description: category?.description || "",
  };

  const [formData, setFormData] = useState<Category>(initialData);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.icon) newErrors.title = "Icon is required";
    if (!formData.title) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: typeof formData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
    }

    if (edit && category?.id) {
      const res = await updateCategory(String(category?.id), formData);
      if (res) {
        showToast("¡Actualización exitosa!", "success");
      } else {
        showToast("Error: " + error, "error");
      }
    } else {
      const res = await createCategory(formData);
      if (res) {
        showToast("¡Registro exitoso!", "success");
      } else {
        showToast("Error: " + error, "error");
      }
    }
    setIsSubmitting(false);
    handleShowModal();
  };

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
  };
};
