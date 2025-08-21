// src/components/UrgentDonations.tsx

import { MainCard } from "../Main/MainCard";

import { MoveRight, Zap } from "lucide-react";
import type { Donation } from "../../domain/interfaces/Donation";
import { CardDonation } from "./CardDonation";

interface UrgentDonationsProps {
  donations: Donation[];
}
const UrgentDonation = ({ donations }: UrgentDonationsProps) => {
  // Filter to get only donations with an expiryDate or urgent flag set to true
  const urgentDonations = donations.filter(
    (donation) => donation.expiryDate || donation.urgent === true
  );

  // Map the filtered donations to CardDonation components
  const urgentDonationCards = urgentDonations.map((donation) => (
    <CardDonation donation={donation} key={donation.id} />
  ));

  if (urgentDonationCards.length === 0) {
    return null; // Don't render anything if there are no urgent donations
  }

  return (
    <MainCard
      title={
        <div className="flex items-center justify-center space-x-2">
          <Zap size={40} className="  text-yellow-500" />
          <span>Urgent Donations</span>
        </div>
      }
      description="These items are about to expire. Grab them now!"
      bgColor="bg-yellow-50"
      button={
        <button className="btn border-0 p-1 bg-transparent text-sm hover:border-1">
          View All <MoveRight size={15} />
        </button>
      }>
      {urgentDonationCards}
    </MainCard>
  );
};

export default UrgentDonation;
