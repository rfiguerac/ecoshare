import { DonationInfo } from "../components/Donation/DonationDetails/DonationInfo";
import { AditionalInformation } from "../components/Donation/DonationDetails/AditionalInformation";
import { useParams } from "react-router-dom";
import { ContactDonor } from "../components/donor/ContatDonor";
import { AboutDonor } from "../components/donor/AboutDonor";
import { useEffect, useState } from "react";
import { ReportForm } from "../components/Donation/DonationDetails/ReportForm";
import { useDonationStore } from "../store/DonationStore";
import { getAddressFromCoords } from "../utils/getAddressFromCoords";
import { useAuthStore } from "../store/AuthStore";

export const DonationDetailsPage = () => {
  // **Todos los hooks deben ir al principio del componente**
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [donationSaved, setDonationSaved] = useState(false);
  const { id } = useParams();
  const users = useAuthStore.getState().allProfiles;
  const donations = useDonationStore.getState().donationPagination.data;
  const [address, setAddress] = useState<string>("Cargando dirección...");
  const { getFetchAddress } = getAddressFromCoords();

  // Primer useEffect para la carga de datos
  useEffect(() => {
    useAuthStore.getState().fetchAllProfiles();
    useDonationStore.getState().fetchDonations();
  }, []);

  // Buscamos la donación y el usuario
  const donation = donations.find((donation) => donation.id === Number(id));
  const user = users?.find(
    (user) => String(user.id) === String(donation?.donorId)
  );

  // **Este useEffect que depende de la donación debe ir después de la lógica de búsqueda de la donación, pero antes de los retornos condicionales.**
  useEffect(() => {
    const fetchAddress = async () => {
      if (donation?.latitude && donation?.longitude) {
        const resolvedAddress = await getFetchAddress(
          Number(donation.latitude),
          Number(donation.longitude)
        );
        setAddress(resolvedAddress);
      } else {
        setAddress("Dirección no disponible");
      }
    };

    if (donation) {
      fetchAddress();
    }
  }, [donation]);

  // **Ahora, los retornos condicionales pueden ir después de todos los hooks y la lógica de búsqueda de datos.**
  if (!donation) {
    return <div>Cargando información de la donación...</div>;
  }

  if (!user) {
    return <div>Cargando información del donante...</div>;
  }

  const saveDonation = (saved: boolean) => {
    setDonationSaved(saved);
  };

  const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("Link copied to clipboard"))
      .catch(() => alert("Error copying link"));
  };

  return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
      <div className="space-y-8 justify-self-center">
        {/* Button back*/}
        <button
          onClick={() => window.history.back()}
          className="text-sm text-gray-500 cursor-pointer">
          &larr; Volver
        </button>
        <DonationInfo
          donation={donation}
          donationSaved={donationSaved}
          setDonationSaved={saveDonation}
          copyUrl={copyUrl}
          direction={address}
          user={user}
        />
        <AditionalInformation donation={donation} address={address} />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor
          setOpen={setReportFormOpen}
          donationSaved={donationSaved}
          setDonationSaved={saveDonation}
          copyUrl={copyUrl}
        />
        <AboutDonor user={user} />
        <ReportForm
          open={reportFormOpen}
          setOpen={setReportFormOpen}
          idDonationRecived={Number(id)}
          idUserRecived={1}
        />
      </div>
    </div>
  );
};
