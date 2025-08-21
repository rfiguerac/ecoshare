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
        alert("Enlace copiada al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        alert("Error al copiar el enlace");
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


  if (!donation) {
    return <div>Donation not found</div>;
  }

  return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
      <div className="space-y-8 justify-self-center">
        <DonationInfo donation={donation} donationSaved={donationSaved} setDonationSaved={saveDonation} copyUrl={copyUrl} direction={direction}/>
        //todo: los componentes no estan adaptados para recibir props
        <AditionalInformation donation={donation}  direction={direction}/>
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor setOpen={setReportFormOpen} donationSaved={donationSaved} setDonationSaved={saveDonation} copyUrl={copyUrl}/>
        <AboutDonor donation={donation} />
        <ReportForm open={reportFormOpen} setOpen={setReportFormOpen} idDonationRecived={Number(id)} idUserRecived={1} />
      </div>
    </div>
  );
};
