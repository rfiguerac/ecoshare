import { useEffect } from "react";
import BrowseCategory from "../components/category/BrowseCategory";

import Banner from "../components/Main/banner/Banner";
import HeroSection from "../components/Main/HeroSection";
import { donations } from "../data/donations";
import { useCategoryStore } from "../store/CategoryStore";
import UrgentDonation from "../components/Donation/UrgentDonation";
import FeaturedDonation from "../components/Donation/FeaturedDonation";

export const MainPage = () => {
  const { fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div>
      <HeroSection />
      <BrowseCategory />
      <UrgentDonation donations={donations} />
      <FeaturedDonation />
      <Banner />
    </div>
  );
};
