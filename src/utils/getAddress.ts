import { useEffect, useState } from "react";

interface Props {
  lat: number;
  lng: number;
}

export const AddressFromCoords = ({ lat, lng }: Props) => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        setAddress(data.display_name || "Dirección no encontrada");
      } catch (error) {
        console.error("Error obteniendo la dirección:", error);
        setAddress("Error al cargar la dirección");
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return address;
};
