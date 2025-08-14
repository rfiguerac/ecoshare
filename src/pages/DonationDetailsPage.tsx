import { DonationInfo } from '../components/DonationDetails/DonationInfo';
import { AditionalInformation } from "../components/DonationDetails/AditionalInformation";
import { ContactDonor } from "../components/DonationDetails/ContatDonor";
import { AboutDonor } from "../components/DonationDetails/AboutDonor";

export const DonationDetailsPage = () => {

  return <div className="bg-[#EAF6EF] grid grid-cols-1  gap-8 justify-items-center">
    <DonationInfo />
    <AditionalInformation />
    <ContactDonor />
    <AboutDonor/>
  </div>;
};
