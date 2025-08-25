import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { MainCard } from "../components/Main/MainCard";

import categories from "../data/categories";
import type { Donation } from "../domain/interfaces/Donation";
import { CardDonation } from "../components/Main/CardDonation";
import { useDonationStore } from "../store/DonationStore";

export const DonationSearchPage = () => {
  // This hook allows us to read and update URL query parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();

  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);

  const { donationPagination } = useDonationStore();

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
        (donation) =>
          //filter title, or description
          donation.title.toLowerCase().includes(lowerCaseQuery) ||
          donation.description.toLowerCase().includes(lowerCaseQuery) ||
          (matchedCategory.length > 0 &&
            matchedCategory.some(
<<<<<<< HEAD
              (category) => donation.idCategory === category.id
=======
              (category) => donation.categoryId === category.id
>>>>>>> 3d54ed6507b7ceb90e535414ce2e25dbf5a0a752
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
