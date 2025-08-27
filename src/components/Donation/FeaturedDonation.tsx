

import type { Donation } from "../../domain/interfaces/Donation";
import { MainCard } from "../Main/MainCard";
import { CardDonation } from "./CardDonation";

interface FeaturedDonationProps {
  donations: Donation[];
}

const FeaturedDonation = (props: FeaturedDonationProps) => {
  const { donations } = props;
  console.log(donations);

  const donation = donations.map((donation) => {
    return <CardDonation donation={donation} key={donation.id} />;
  });

  return (
    <MainCard
      title="Featured Donations"
      description="Discover amazing items shared by your community.">
      {donation}
    </MainCard>
  );
};

export default FeaturedDonation;
