import BrowseCategory from "../components/Main/BrowseCategory";
import FeaturedDonation from "../components/Main/FeaturedDonation";
import UrgentDonation from "../components/Main/UrgentDonation";
import Banner from "../components/Main/Banner";
import HeroSection from "../components/Main/HeroSection";

import { donations } from "../components/donations";
import { useCategoryStore } from "../store/CategoryStore";
import { useEffect } from "react";

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
