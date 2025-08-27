import { useEffect } from "react";
import BrowseCategory from "../components/category/BrowseCategory";

import Banner from "../components/Main/banner/Banner";
import HeroSection from "../components/Main/HeroSection";
import { useCategoryStore } from "../store/CategoryStore";
import UrgentDonation from "../components/Donation/UrgentDonation";
import FeaturedDonation from "../components/Donation/FeaturedDonation";
import { useDonationStore } from "../store/DonationStore";

export const MainPage = () => {
  const { fetchCategories } = useCategoryStore();

  const { donationPagination} = useDonationStore();


  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <HeroSection />
      <BrowseCategory />
      <UrgentDonation donations={donationPagination.data.filter((donation) => donation.urgent)} />
      <FeaturedDonation donations={donationPagination.data}/>
      <Banner />
    </div>
  );
};
