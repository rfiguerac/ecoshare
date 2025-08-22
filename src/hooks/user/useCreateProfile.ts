import { useEffect, useState } from "react";
import type { NewUser } from "../../domain/interfaces/User";
import { useAuthStore } from "../../store/AuthStore";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
// Asegúrate de importar tu hook de toast

export const useCreateProfile = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  // Extrae 'error' del store junto con 'register' y 'loading'
  const { register, loading, error, isAuthenticated } = useAuthStore();
  const { showToast } = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter.";
    }

    if (formData.password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newUser = { ...formData, password: formData.password };
      await register(newUser);
    }
  };

  // Usa useEffect para mostrar el toast cuando la petición termine y haya un error
  useEffect(() => {
    // Si la petición ha terminado (loading es false) y hay un mensaje de error
    if (loading === false && error) {
      showToast(error, "error");
    } else if (loading === false && isAuthenticated) {
      showToast("¡Registro exitoso!", "success");
      navigate("/dashboard");
    }
  }, [loading, error, isAuthenticated]);

  return {
    formData,
    setFormData,
    isSubmitting: loading,
    errors,
    setErrors,
    confirmPassword,
    setConfirmPassword,
    handleChange,
    handleSubmit,
  };
};
