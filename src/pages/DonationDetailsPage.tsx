// src/pages/DonationDetailsPage.tsx
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
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [donationSaved, setDonationSaved] = useState(false);
  const { id } = useParams();
  const users = useAuthStore.getState().allProfiles;
  const { donationPagination } = useDonationStore();
  const [address, setAddress] = useState<string>("Cargando dirección...");
  const { getFetchAddress } = getAddressFromCoords();
  const { user } = useAuthStore();

  useEffect(() => {
    useAuthStore.getState().fetchAllProfiles();
    useDonationStore.getState().fetchDonations();
  }, []);

  const donation = donationPagination.data.find(
    (donation) => donation.id === Number(id)
  );
  const userDonor = users?.find(
    (user) => String(user.id) === String(donation?.donorId)
  );

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

  if (!donation) {
    return <div>Cargando información de la donación...</div>;
  }

  if (!userDonor) {
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
          userDonor={userDonor}
        />
        <AditionalInformation donation={donation} address={address} />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor
          setOpen={setReportFormOpen}
          donationSaved={donationSaved}
          setDonationSaved={saveDonation}
          copyUrl={copyUrl}
          donorId={donation.donorId}
        />
        <AboutDonor user={userDonor} />
        <ReportForm
          open={reportFormOpen}
          setOpen={setReportFormOpen}
          idDonationRecived={Number(id)}
          idUserRecived={Number(user?.id)}
        />
      </div>
    </div>
  );
};
