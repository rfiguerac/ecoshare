import BrowseCategory from "../components/category/BrowseCategory";
import FeaturedDonation from "../components/donation/donation/FeaturedDonation";
import UrgentDonation from "../components/donation/donation/UrgentDonation";
import Banner from "../components/Main/banner/Banner";
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
