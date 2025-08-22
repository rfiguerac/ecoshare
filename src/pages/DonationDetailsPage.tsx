import { DonationInfo } from "../components/Donation/DonationDetails/DonationInfo";
import { AditionalInformation } from "../components/Donation/DonationDetails/AditionalInformation";

import { donations } from "../data/donations";

import { useParams } from "react-router-dom";
import { ContactDonor } from "../components/donor/ContatDonor";
import { AboutDonor } from "../components/donor/AboutDonor";
import { useEffect, useState } from "react";
import { ReportForm } from "../components/Donation/DonationDetails/ReportForm";

export const DonationDetailsPage = () => {

  const [reportFormOpen, setReportFormOpen] = useState(false)
  const [donationSaved, setDonationSaved] = useState(false)
  const [direction, setDirection] = useState("")

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
        alert("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Error while copying:", err);
        alert("Error copying link");
      });
  }

  async function coordenadasADireccion(lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    const response = await fetch(url, { headers: { "User-Agent": "EcoSahe" } });
    const data = await response.json();

    if (data && data.display_name) {
      const { road, house_number, city, town, village, state, country } = data.address;

      const localidad = city || town || village; //localidad puede llegar como una de las 3 opciones

      return `${road ?? ""} ${house_number ?? ""}, ${localidad ?? state ?? ""}, ${country ?? ""}`.trim();
    } else {
      return "Dirección no encontrada";
    }
  }

  useEffect(() => {
    coordenadasADireccion(40.4168, -3.7038).then(direction => setDirection(direction))
  }, []);

  const fakeUser = {
    id: "u123",
    name: "Carlos Ramírez",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    donations: 85,
    joined: "March 2023",
  };


  if (!donation) {
    return <div>Donation not found</div>;
  }

  return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
      <div className="space-y-8 justify-self-center">
        <DonationInfo donation={donation} donationSaved={donationSaved} setDonationSaved={saveDonation} copyUrl={copyUrl} direction={direction} />
        //todo: los componentes no estan adaptados para recibir props
        <AditionalInformation donation={donation} direction={direction} />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor setOpen={setReportFormOpen} donationSaved={donationSaved} setDonationSaved={saveDonation} copyUrl={copyUrl} />
        <AboutDonor user={fakeUser} />
        <ReportForm open={reportFormOpen} setOpen={setReportFormOpen} idDonationRecived={Number(id)} idUserRecived={1} />
      </div>
    </div>
  );
};
