import { DonationInfo } from "../components/Donation/DonationDetails/DonationInfo";
import { AditionalInformation } from "../components/Donation/DonationDetails/AditionalInformation";

import { useParams } from "react-router-dom";
import { ContactDonor } from "../components/donor/ContatDonor";
import { AboutDonor } from "../components/donor/AboutDonor";
import { useEffect, useState } from "react";
import { ReportForm } from "../components/Donation/DonationDetails/ReportForm";
import { useDonationStore } from "../store/DonationStore";
import { AddressFromCoords } from "../utils/getAddress";
import { useAuthStore } from "../store/AuthStore";

export const DonationDetailsPage = () => {
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [donationSaved, setDonationSaved] = useState(false);

  const user = useAuthStore((state) => state.user);

  const { id } = useParams();

  const { donationPagination } = useDonationStore();

  const donation = donationPagination.data.find(
    (donation) => donation.id === Number(id)
  );

  const address = AddressFromCoords({
    lat: Number(donation?.latitude!),
    lng: Number(donation?.longitude!),
  });

  const saveDonation = (saved: boolean) => {
    //codigo para gurdar donacion
    setDonationSaved(saved);
  };

  const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Error while copying:", err);
        alert("Error copying link");
      });
  };

  if (!donation) {
    return <div>Donation not found</div>;
  }

  return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
      <div className="space-y-8 justify-self-center">
        <DonationInfo
          donation={donation}
          donationSaved={donationSaved}
          setDonationSaved={saveDonation}
          copyUrl={copyUrl}
          direction={address}
          user={user!}
        />
        <AditionalInformation donation={donation} direction={address} />
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
