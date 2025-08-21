import { DonationInfo } from "../components/Donation/DonationDetails/DonationInfo";
import { AditionalInformation } from "../components/Donation/DonationDetails/AditionalInformation";

import { donations } from "../data/donations";

import { useParams } from "react-router-dom";
import { ContactDonor } from "../components/donor/ContatDonor";
import { AboutDonor } from "../components/donor/AboutDonor";
import { useState } from "react";
import { ReportForm } from "../components/Donation/DonationDetails/ReportForm";

export const DonationDetailsPage = () => {

  const [reportFormOpen, setReportFormOpen] = useState(false)
  const [donationSaved, setDonationSaved] = useState(false)

  const { id } = useParams();

  const donation = donations.find((donation) => donation.id === Number(id));

  const saveDonation = (saved: boolean) => {
    //codigo para gurdar donacion 
    setDonationSaved(saved)
  }

  const copyUrl = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
      .then(() => {
        alert("Enlace copiada al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        alert("Error al copiar el enlace");
      });

  }

  if (!donation) {
    return <div>Donation not found</div>;
  }

  return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
      <div className="space-y-8 justify-self-center">
        <DonationInfo donation={donation} donationSaved={donationSaved} setDonationSaved={saveDonation} copyUrl={copyUrl}/>
        //todo: los componentes no estan adaptados para recibir props
        <AditionalInformation donation={donation} />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor setOpen={setReportFormOpen} donationSaved={donationSaved} setDonationSaved={saveDonation} copyUrl={copyUrl}/>
        <AboutDonor donation={donation} />
        <ReportForm open={reportFormOpen} setOpen={setReportFormOpen} idDonationRecived={Number(id)} idUserRecived={1} />
      </div>
    </div>
  );
};
