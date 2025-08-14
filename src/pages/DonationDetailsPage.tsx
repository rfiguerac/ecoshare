import { DonationInfo } from '../components/DonationDetails/DonationInfo';
import { AditionalInformation } from "../components/DonationDetails/AditionalInformation";

export const DonationDetailsPage = () => {

  return <div className="bg-[#EAF6EF] grid grid-cols-1  gap-8 justify-items-center">
    <DonationInfo/>
    <AditionalInformation/>
  </div>;
};
