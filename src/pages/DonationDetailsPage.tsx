import { DonationInfo } from '../components/Donation/DonationDetails/DonationInfo';
import { AditionalInformation } from "../components/Donation/DonationDetails/AditionalInformation";
import { ContactDonor } from "../components/Donation/DonationDetails/ContatDonor";
import { AboutDonor } from "../components/Donation/DonationDetails/AboutDonor";

import { donations } from "../data/donations";

import { useParams } from "react-router-dom";

export const DonationDetailsPage = () => {
  const { id } = useParams();


  const donation = donations.find((donation) => donation.id === parseInt(id));

  if (!donation) {
    return <div>Donation not found</div>;
  }


 return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
 
      <div className="space-y-8 justify-self-center">
        <DonationInfo donation={donation} />
        <AditionalInformation donation={donation} />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor donation={donation} />
        <AboutDonor donation={donation} />
      </div>
    </div>
  );
};
