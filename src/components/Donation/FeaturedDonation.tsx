import type { Donation } from "../../domain/interfaces/Donation";
import { MainCard } from "../Main/MainCard";
import { CardDonation } from "./CardDonation";
import { Link } from "react-router-dom";

interface FeaturedDonationProps {
  donations: Donation[];
}

const FeaturedDonation = (props: FeaturedDonationProps) => {
  const { donations } = props;

  const featuredDonations = donations.slice(0, 8);

  const donationCards = featuredDonations.map((donation) => {
    return <CardDonation donation={donation} key={donation.id} />;
  });

  return (
    <>
      <MainCard
        title="Featured Donations"
        layout="grid"
        description="Discover amazing items shared by your community."
      >
        {donationCards}
      </MainCard>
      
      {/* Conditionally render a "View More" button if there are more than 4 donations */}
      {donations.length > 8 && (
        <div className="text-center mt-6">
          <Link to="/DonationSearch">
            <button className="btn btn-outline-primary text-primary">
              More items...
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default FeaturedDonation;
