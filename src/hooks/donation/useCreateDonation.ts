import { useEffect, useState } from "react";
import type { NewDonation } from "../../domain/interfaces/Donation";
import { getCurrentLocation } from "../../utils/getCurrenLocation";

export const useCreateDonation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [errorLocation, setErrorLocation] = useState<string | null>(null);

  const handleGetLocation = async () => {
    setErrorLocation(null);

    try {
      const coords = await getCurrentLocation();
      setLocation(coords);
    } catch (err: any) {
      setErrorLocation(err.message);
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const [formData, setFormData] = useState<NewDonation>({
    title: "",
    description: "",
    idCategory: 1,
    state: "Available",
    imageUrl: "",
    urgent: false,
    latitude: location?.lat || 41.3851,
    longitude: location?.lng || 2.1734,
    expiryDate: null,
  });

  useEffect(() => {}, []);

  return {
    formData,
    setFormData,
    errorLocation,
  };
};
