// src/components/UrgentDonations.tsx

import { useState } from "react";
import { MainCard } from "../Main/MainCard";
import { MoveRight, Zap } from "lucide-react";
import type { Donation } from "../../domain/interfaces/Donation";
import { CardDonation } from "./CardDonation";

interface UrgentDonationsProps {
  donations: Donation[];
}

const UrgentDonation = ({ donations }: UrgentDonationsProps) => {
  const [showAll, setShowAll] = useState(false);

  // Filter to get only donations with an expiryDate or urgent flag set to true
  const urgentDonations = donations
    .filter((donation) => donation.expiryDate || donation.urgent === true)
    // sort by expiryDate (soonest first)
    .sort((a, b) => {
      if (a.expiryDate && b.expiryDate) {
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      }
      if (a.expiryDate) return -1;
      if (b.expiryDate) return 1;
      return 0;
    });

  // Slice the donations based on the showAll state
  const displayedDonations = showAll ? urgentDonations : urgentDonations.slice(0, 4);

  // Map the filtered donations to CardDonation components
  const urgentDonationCards = displayedDonations.map((donation) => (
    <CardDonation donation={donation} key={donation.id} />
  ));

  if (urgentDonationCards.length === 0) {
    return null; // Don't render anything if there are no urgent donations
  }

  const handleShowMoreClick = () => {
    setShowAll(true);
  };

  const handleShowLessClick = () => {
    setShowAll(false);
  };

  return (
    <MainCard
      title={
        <div className="flex items-center justify-center space-x-2">
          <Zap size={40} className="text-yellow-500" />
          <span>Urgent Donations</span>
        </div>
      }
      layout="grid"
      description="These items are about to expire. Grab them now!"
      bgColor="bg-yellow-50"
      button={
        urgentDonations.length > 8 && (
          <button
            onClick={showAll ? handleShowLessClick : handleShowMoreClick}
            className="btn border-0 p-1 bg-transparent text-sm hover:border-1"
          >
            {showAll ? "Show less" : "Show more"} <MoveRight size={15} />
          </button>
        )
      }
    >
      {urgentDonationCards}
    </MainCard>
  );
};

export default UrgentDonation;
