import { useEffect, useState } from "react";
import type { NewUser } from "../../domain/interfaces/User";


export const useCreateProfile = () => {


  const [formData, setFormData] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {}, []);

  return {
    formData,
    setFormData,
  };
};
