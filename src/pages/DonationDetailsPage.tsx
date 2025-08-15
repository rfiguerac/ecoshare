import { DonationInfo } from '../components/DonationDetails/DonationInfo';
import { AditionalInformation } from "../components/DonationDetails/AditionalInformation";
import { ContactDonor } from "../components/DonationDetails/ContatDonor";
import { AboutDonor } from "../components/DonationDetails/AboutDonor";

export const DonationDetailsPage = () => {

  return <div className="bg-[#EAF6EF] grid grid-cols-1 lg:grid-cols-2 lg:gap-0 justify-items-center md:justify-items-start">
    <div className="lg:col-start-1 mb-8 md:mt-8 md:ml-8">
      <DonationInfo />
    </div>
    <div className="lg:col-start-1 mb-8 md:mt-8 md:ml-8">
      <AditionalInformation />
    </div>
    <div className="lg:col-start-2 lg:row-start-1  md:mt-8 ">
      <ContactDonor />
    </div>

    <div className="lg:col-start-2 mb-4">
      <AboutDonor />
    </div>
  </div>;
};
