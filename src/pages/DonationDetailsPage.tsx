import { DonationInfo } from '../components/DonationDetails/DonationInfo';
import { AditionalInformation } from "../components/DonationDetails/AditionalInformation";
import { ContactDonor } from "../components/DonationDetails/ContatDonor";
import { AboutDonor } from "../components/DonationDetails/AboutDonor";

export const DonationDetailsPage = () => {

 return (
    <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-[auto_auto] gap-8 2xl:gap-0 p-8 items-start">
 
      <div className="space-y-8 justify-self-center">
        <DonationInfo />
        <AditionalInformation />
      </div>

      <div className="space-y-8 justify-self-center">
        <ContactDonor />
        <AboutDonor />
      </div>
    </div>
  );
};
