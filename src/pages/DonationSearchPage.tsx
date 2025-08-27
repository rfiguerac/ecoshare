import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { MainCard } from "../components/Main/MainCard";

import categories from "../data/categories";
import type { Donation } from "../domain/interfaces/Donation";
import { CardDonation } from "../components/Donation/CardDonation";
import { useDonationStore } from "../store/DonationStore";
import { Filter } from "../components/Donation/Filter";

export const DonationSearchPage = () => {
  // This hook allows us to read and update URL query parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();

  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [categoryFilter, setCategofryFilter] = useState<number>()
  const [distanceFilter, setDistanceFilter] = useState<number>()

  const { donationPagination } = useDonationStore();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setCategofryFilter(categoryId);
  };

   const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = Number(e.target.value);
    setDistanceFilter(distance);
  };

  useEffect(() => {
    if (!query) {
      // If the query is empty or null, navigate to the main page
      navigate("/");
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const matchedCategory = categories.filter((category) =>
        category.title.toLowerCase().includes(lowerCaseQuery)
      );

      // Filter donations based on the query string
      const filtered: Donation[] = donationPagination.data.filter(
        (donation) => {
          //filter title, or description
          const matchesText =
            donation.title.toLowerCase().includes(lowerCaseQuery) ||
            donation.description.toLowerCase().includes(lowerCaseQuery);

          const matchesCategory =
            matchedCategory.length > 0 &&
            matchedCategory.some((category) => donation.categoryId === category.id);

          const matchesCategoryFilter =
            !categoryFilter || donation.categoryId === categoryFilter;

          return (matchesText || matchesCategory) && matchesCategoryFilter;
        });
      setFilteredDonations(filtered);
    
    }
  }, [query, navigate, categoryFilter]);

  const donationCards = filteredDonations.map((donation) => (
    <CardDonation donation={donation} key={donation.id} />
  ));

  return (
    <div className="bg-gray-100">
      <Filter handleCategoryChange={handleCategoryChange} selectedCategory={categoryFilter} handleDistanceChange={handleDistanceChange} selectDistance={distanceFilter}/>
      <MainCard
        title={query ? `Search Results for "${query}"` : "Showing All Items"}
        description={`Showing ${filteredDonations.length} items that match your search.`}>
        {donationCards}
      </MainCard>
    </div>
  );
};
