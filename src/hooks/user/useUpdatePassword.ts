import { useEffect, useState } from "react";
import type { PasswordChange } from "../../domain/interfaces/User";
import { useAuthStore } from "../../store/AuthStore";
import { useToast } from "../../contexts/ToastContext";

export const useUpdatePassword = () => {

    const { changePassword, loading, error } = useAuthStore();
    const { showToast } = useToast();

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<PasswordChange>({
        oldPassword: "",
        newPassword: "",
    });

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.newPassword) {
            newErrors.password = "Password is required.";
        } else if (formData.newPassword.length < 5) {
            newErrors.password = "Password must be at least 5 characters long.";
        } else if (!/[a-zA-Z]/.test(formData.newPassword)) {
            newErrors.password = "Password must contain at least one letter.";
        }

        return newErrors;

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: typeof formData) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate()
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const res = await changePassword(formData);
            res ? showToast("Password Changed", "success") : showToast("Error: " + error, "error");
        }


    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    }

}