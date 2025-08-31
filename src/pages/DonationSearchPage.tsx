import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { MainCard } from "../components/Main/MainCard";
import { CardDonation } from "../components/Donation/CardDonation";
import { useDonationStore } from "../store/DonationStore";
import { useCategoryStore } from "../store/CategoryStore";

import type { Donation } from "../domain/interfaces/Donation";
import { getCurrentLocation } from "../utils/getCurrenLocation";
import { getDistanceInKm } from "../utils/getDistanceInKm";

export const DonationSearchPage = () => {
  const { donationPagination } = useDonationStore();
  const { categories } = useCategoryStore();

  // Hook para gestionar parámetros en la URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtenemos el valor de búsqueda desde la URL
  const search = searchParams.get("search") || "";

  // Estados para categoría y distancia
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectDistance, setSelectDistance] = useState(
    searchParams.get("distance") || "100"
  );

  const [isChecked, setIsChecked] = useState(false);

  const [MyLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked; // true si está marcado, false si no
    setIsChecked(checked);

    // Llamas a tu función aquí según el estado
    if (checked) {
      const { lat, lng } = await getCurrentLocation();
      setMyLocation({ lat, lng });
    } else {
      // llamar función B
    }
  };

  // Actualiza la URL cuando se cambian filtros
  const updateURLParams = (newParams: {
    category?: string;
    distance?: string;
  }) => {
    setSearchParams({
      search, // siempre mantenemos el valor de búsqueda de la URL
      category: newParams.category ?? selectedCategory,
      distance: newParams.distance ?? selectDistance,
    });
  };

  // Manejar cambio de categoría
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    updateURLParams({ category: newCategory });
  };

  // Manejar cambio de distancia (cuando lo implementes)
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDistance = e.target.value;
    setSelectDistance(newDistance);
    updateURLParams({ distance: newDistance });
  };

  // Filtrado de donaciones
  const filteredDonations = donationPagination.data
    // Filtro por categoría
    .filter((donation: Donation) => {
      if (!selectedCategory || selectedCategory === "Todas") return true;
      const category = categories.find((cat) => cat.id === donation.categoryId);
      return category?.title
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());
    })
    // Filtro por texto de búsqueda desde la URL
    .filter((donation: Donation) => {
      if (!search) return true;
      return donation.title.toLowerCase().includes(search.toLowerCase());
    })
    // Filtro por distancia
    .filter((donation: Donation) => {
      if (!isChecked || !MyLocation) return true; // solo filtra si está activado y tenemos ubicación
      const donationCoord = { lat: donation.latitude, lng: donation.longitude };
      const distanceKm = getDistanceInKm(MyLocation, donationCoord);
      return distanceKm <= Number(selectDistance); // mantiene solo donaciones dentro del rango
    });

  // Renderizado de tarjetas
  const donationCards = filteredDonations.map((donation) => (
    <CardDonation donation={donation} key={donation.id} />
  ));

  return (
    <div className="bg-gray-100">
      {/* Barra de filtros */}
      <div className="flex flex-col md:flex-row justify-center gap-6 p-5 mb-8 w-full">
        {/* Filtro por categoría */}
        <div className="form-control w-full md:w-1/2">
          <label className="label">
            <span className="label-text font-semibold text-lg">Category</span>
          </label>
          <select
            className="select select-bordered w-full rounded-xl focus:outline-none"
            value={selectedCategory}
            onChange={handleCategoryChange}>
            <option value="Todas">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por distancia*/}
        <div className="form-control w-full md:w-1/2">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-lg"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="label-text font-semibold text-lg">
              Distance ({selectDistance} km)
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="5"
            max="100"
            value={selectDistance}
            onChange={handleDistanceChange}
            className="range range-primary range-xs rounded-full w-full"
          />

          {/* Labels under slider */}
          {/* <div className="w-full flex justify-between text-xs px-2 mt-1">
            <span>5 km</span>
            <span>25 km</span>
            <span>50 km</span>
          </div> */}
        </div>
      </div>

      {/* Listado de resultados */}
      <MainCard
        title={
          search
            ? `Resultados para "${search}"`
            : "Mostrando todas las donaciones"
        }
        layout="grid"
        description={`Se encontraron ${filteredDonations.length} donaciones.`}>
        {donationCards.length > 0 ? (
          donationCards
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron donaciones.
          </p>
        )}
      </MainCard>
    </div>
  );
};
