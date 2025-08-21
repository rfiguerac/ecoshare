import { donations } from "../../data/donations";

import { MainCard } from "../Main/MainCard";
import { CardDonation } from "./CardDonation";

const FeaturedDonation = () => {
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
