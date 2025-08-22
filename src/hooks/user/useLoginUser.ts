import { useEffect, useState } from "react";
import { useToast } from "../../contexts/ToastContext";

import { useAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";

export const useLoginUser = () => {
  const { login, isAuthenticated, error, loading } = useAuthStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    await login(formData);
  };

  useEffect(() => {
    // Si la petición ha terminado (loading es false) y hay un mensaje de error
    if (loading === false && error) {
      showToast(error, "error");
      setIsSubmitting(false);
    } else if (loading === false && isAuthenticated) {
      showToast("¡Registro exitoso!", "success");
      navigate("/dashboard");
    }
  }, [loading, error, isAuthenticated]);

  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit,
  };
};
