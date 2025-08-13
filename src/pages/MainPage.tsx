import BrowseCategory from "../components/Main/BrowseCategory";
import FeaturedDonation from "../components/Main/FeaturedDonation";
import UrgentDonation from "../components/Main/UrgentDonation";

import { donations } from "../components/donations";

export const MainPage = () => {

  return <div>
    <BrowseCategory />
    <UrgentDonation donations={donations} /> 
    <FeaturedDonation />
  </div>;
};
