import { useEffect, useState } from "react";
import type { NewDonation } from "../../domain/interfaces/Donation";
import { getCurrentLocation } from "../../utils/getCurrenLocation";
import { useDonationStore } from "../../store/DonationStore";
import { fileServices } from "../../services/fileServices";
import { useToast } from "../../contexts/ToastContext";

export interface FileWithPreview extends File {
  preview: string;
}

interface Props {
  handleShowModal: () => void;
}

export const useCreateDonation = ({ handleShowModal }: Props) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [errorLocation, setErrorLocation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { addDonation } = useDonationStore();

  const { uploadFile } = fileServices();

  const { showToast } = useToast();

  const handleGetLocation = async () => {
    setErrorLocation(null);
    try {
      const coords = await getCurrentLocation();
      setLocation(coords);
    } catch (err: any) {
      setErrorLocation(err.message);
    }
  };

  // Llamamos solo una vez al montar
  useEffect(() => {
    handleGetLocation();
  }, []);

  // Sincronizamos formData cuando cambie la ubicación
  const [formData, setFormData] = useState<NewDonation>({
    title: "",
    description: "",
    categoryId: 1,
    donorId: 1,
    urgent: false,
    latitude: 41.3851, // valor por defecto inicial
    longitude: 2.1734, // valor por defecto inicial
    expiryDate: null,
  });

  useEffect(() => {
    if (location) {
      setFormData((prev) => ({
        ...prev,
        latitude: location.lat,
        longitude: location.lng,
      }));
    }
  }, [location]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (files.length === 0)
      newErrors.images = "At least one image is required.";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, urgent: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Enviar datos al servidor
    // 1: Guardados los datos del formulario, porque necesitamos el id para guardarlos en el servidor

    const newDonation = await addDonation(formData);
    if (newDonation.id) {
      // 2: Si la donación se creó correctamente, subimos las imágenes
      showToast("Donation created successfully!", "success");
      const uploadedImages = await uploadFile(files, newDonation.id);
      console.log(uploadedImages);
      if (uploadedImages.imageUrl) {
        // Aquí puedes hacer algo con las imágenes subidas, como asociarlas a la donación
        showToast("Images uploaded successfully!", "success");
        handleShowModal();
      } else {
        showToast("Error uploading images", "error");
      }
    } else {
      showToast("Error creating donation", "error");
    }
  };

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  return {
    formData,
    setFormData,
    errorLocation,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    errors,
    files,
    setFiles,
    removeFile,
  };
};
