import { useEffect, useState } from "react";
import type { Category } from "../../domain/interfaces/Category";

export const createEditCategory = (initialData: Partial<Category>, open: boolean, edit:boolean) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<Category>({
        title: initialData!!.title || "",
        icon: initialData?.icon || "Folder", //icono por defecto
        description: initialData?.description || "",
    });

    useEffect(() => {
        
        if (open && initialData && Object.keys(initialData).length > 0) {
            setFormData({
                title: initialData.title || "",
                icon: initialData.icon || "Folder",
                description: initialData.description || "",
            });
        } else {
            setFormData({
                title: "",
                icon: "Folder",
                description: "",
            });
        }

        setErrors({});
    }, [open, initialData]);


    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.icon) newErrors.title = "Icon is required";
        if (!formData.title) newErrors.description = "Description is required"
        return newErrors
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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

        console.log("errores", validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
        }

        //codigo para enviar categoria al servidors 
        console.log("se creado/editado  la categoria")
    };

    const resetForm = () => {
        setFormData({
            title: "",
            icon: "Folder",
            description: "",
        });
    };


    return {
        formData,
        isSubmitting,
        errors,
        handleChange,
        handleSubmit,
        resetForm
    }
}