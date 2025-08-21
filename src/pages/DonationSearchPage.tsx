import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { donations } from "../data/donations";
import { MainCard } from "../components/Main/MainCard";

import categories from "../data/categories";
import type { Donation } from "../domain/interfaces/Donation";
import { CardDonation } from "../components/Main/CardDonation";

export const DonationSearchPage = () => {
  // This hook allows us to read and update URL query parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();

  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);

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
      const filtered: Donation[] = donations.filter(
        (donation) =>
          //filter title, or description
          donation.title.toLowerCase().includes(lowerCaseQuery) ||
          donation.description.toLowerCase().includes(lowerCaseQuery) ||
          (matchedCategory.length > 0 &&
            matchedCategory.some(
              (category) => donation.idCategory === category.idCategory
            ))
      );
      setFilteredDonations(filtered);
    }
  }, [query, navigate]);

  const donationCards = filteredDonations.map((donation) => (
    <CardDonation donation={donation} key={donation.id} />
  ));

  return (
    <div className="bg-gray-100">
      <MainCard
        title={query ? `Search Results for "${query}"` : "Showing All Items"}
        description={`Showing ${filteredDonations.length} items that match your search.`}>
        {donationCards}
      </MainCard>
    </div>
  );
};
