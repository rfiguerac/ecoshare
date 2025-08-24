import { useState } from "react";
import type { PasswordChange, User, UserUpdate } from "../../domain/interfaces/User";

const exampleUpdate: UserUpdate = {
  name: "Nuevo Nombre",
  email: "nuevoemail@example.com",
};
export const useUpdateProfile = () => {

    const [profileError, setProfileErrors] = useState<Record<string, string>>({});
    const [passwordError, setPasswordErrors] = useState<Record<string, string>>({});

    const [profileForm, setProfileForm] = useState<UserUpdate>({
        name: exampleUpdate.name,
        email: exampleUpdate.email,
    });

    const [passwordForm, setPasswordForm] = useState<PasswordChange>({
        oldPassword: "",
        newPassword: "",
    });

    const validateProfile = () => {
        const newErrors: Record<string, string> = {}
        if (!profileForm.email) newErrors.email = "Email is required.";
        if (!profileForm.name) newErrors.name = "Name is required.";
        return newErrors;
    }

    const validatePassword = () => {
        const newErrors: Record<string, string> = {}
        if (!passwordForm.newPassword) {
            newErrors.password = "Password is required.";
        } else if (passwordForm.newPassword.length < 5) {
            newErrors.password = "Password must be at least 5 characters long.";
        } else if (!/[a-zA-Z]/.test(passwordForm.newPassword)) {
            newErrors.password = "Password must contain at least one letter.";
        }

        return newErrors;

    }

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileForm((prevState: typeof profileForm) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm((prevState: typeof passwordForm) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateProfile()
        setProfileErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            //codigp para guardar usuario
        }

    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validatePassword()
        setPasswordErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            //codigp para guardar la nueva contraseña
        }
        setPasswordForm({ oldPassword: "", newPassword: "" });
    };

    return {
        profileForm,
        passwordForm,
        profileError,
        passwordError,
        handleProfileChange,
        handlePasswordChange,
        submitProfile,
        submitPassword,
    };
}