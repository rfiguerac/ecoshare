import { useEffect } from "react";
import BrowseCategory from "../components/category/BrowseCategory";

import Banner from "../components/Main/banner/Banner";
import HeroSection from "../components/Main/HeroSection";
import { donations } from "../data/donations";
import { useCategoryStore } from "../store/CategoryStore";
import UrgentDonation from "../components/Donation/donation/UrgentDonation";
import FeaturedDonation from "../components/Donation/donation/FeaturedDonation";

export const MainPage = () => {
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  console.log(categories);

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
