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
  const { id } = useParams();
  const { allProfiles, fetchAllProfiles } = useAuthStore();

    useEffect(() => {
  
    const fetchData = () => {
      fetchAllProfiles();
    };

    fetchData();
  }, []); 

  const { donationPagination } = useDonationStore();

  const donation = donationPagination.data.find(
    (donation) => donation.id === Number(id)
  );

  const user = allProfiles!.find(
              (user) => String(user.id) == String(donation!.donorId)
            );

  const fullAddress = AddressFromCoords({
    lat: Number(donation?.latitude!),
    lng: Number(donation?.longitude!),
  });

  const parts = fullAddress.split(",").map(part => part.trim());

  // Get city and region
  // Assuming city is second-to-last and region is last before country
  const area = parts[parts.length - 7]; // "Eixample"
  const city = parts[parts.length - 4]; // "Barcelona"
  const region = parts[parts.length - 3]; // "Catalunya"

  const address = `${area}, ${city}, ${region}`;

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
        <AditionalInformation donation={donation} address={address} />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor
          setOpen={setReportFormOpen}
          donationSaved={donationSaved}
          setDonationSaved={saveDonation}
          copyUrl={copyUrl}
        />
        <AboutDonor user={user!} />
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
