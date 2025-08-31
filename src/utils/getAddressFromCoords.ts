export const getAddressFromCoords = () => {
  const getFetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();

      if (data.address) {
        const { road, house_number, suburb, city, town, village } =
          data.address;

        const shortAddress = [
          road,
          house_number,
          suburb,
          city || town || village,
        ]
          .filter(Boolean)
          .join(", ");

        return shortAddress;
      } else {
        return "Dirección no encontrada";
      }
    } catch (error) {
      console.error("Error obteniendo la dirección:", error);

      return "Error al cargar la dirección";
    }
  };

  return {
    getFetchAddress,
  };
};
