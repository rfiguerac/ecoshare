export interface LocationData {
  lat: number;
  lng: number;
}

export interface LocationError {
  code: number;
  message: string;
}

/**
 * Obtiene la ubicación actual del usuario usando la API de Geolocation.
 * @returns Promesa que resuelve con la ubicación o rechaza con un error.
 */
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    // Verificamos si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: "La geolocalización no está soportada en este navegador.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let message = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Debes permitir el acceso a la ubicación.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "La información de ubicación no está disponible.";
            break;
          case error.TIMEOUT:
            message = "La solicitud de ubicación ha tardado demasiado.";
            break;
          default:
            message = "Ocurrió un error desconocido.";
        }

        reject({
          code: error.code,
          message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};
