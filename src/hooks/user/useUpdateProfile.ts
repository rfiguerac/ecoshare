import { useState } from "react";
import type { User, UserUpdate } from "../../domain/interfaces/User";
import { useAuthStore } from "../../store/AuthStore";
import { useToast } from "../../contexts/ToastContext";

export const useUpdateProfile = (user: User) => {

    const { updateProfile, error, loading } = useAuthStore();
    const { showToast } = useToast();

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setformData] = useState<UserUpdate>({
        name: user.name,
        email: user.email,
    });

    const validate= () => {
        const newErrors: Record<string, string> = {}
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.name) newErrors.name = "Name is required.";
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setformData((prevState: typeof formData) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate()
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
           const response =  await updateProfile(formData);
           response ? showToast("Porfile Updated", "success") : showToast( "Error: " + error, "error");
        }
    };

    return {
        formData,
        errors,
        isSubmitting:loading,
        handleChange,
        handleSubmit,
    };
}