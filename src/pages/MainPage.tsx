import BrowseCategory from "../components/Main/BrowseCategory";
import FeaturedDonation from "../components/Main/FeaturedDonation";
import UrgentDonation from "../components/Main/UrgentDonation";
import Banner from "../components/Main/Banner";
import HeroSection from "../components/Main/HeroSection";


import { donations } from "../data/donations";

export const MainPage = () => {

  return <div>
    <HeroSection />
    <BrowseCategory />
    <UrgentDonation donations={donations} /> 
    <FeaturedDonation />
    <Banner />
  </div>;
};
