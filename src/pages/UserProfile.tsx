import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { UserInfo } from "../components/Profile/UserInfo";
import { useEffect } from "react";
import { useDonationStore } from "../store/DonationStore";
import { CardDonation } from "../components/Donation/CardDonation";

export const UserProfile = () => {

    const { id } = useParams();
    const users = useAuthStore.getState().allProfiles;
    const { donationPagination } = useDonationStore();

    useEffect(() => {
        useAuthStore.getState().fetchAllProfiles();
    }, []);

    const userId = id ? Number(id) : undefined;

    const user = users?.find(user => {
        if (Number(user.id) === userId) return user;
    });

    const userDonations = donationPagination.data.filter(donation => {
        if (donation.donorId === userId) return donation;
    });

    const donationCards = userDonations.map((donation) => (
        <CardDonation donation={donation} key={donation.id} />
    ));

    return (
        users && users.length > 0 ? (
            <>
                <UserInfo profileUser={user!} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {donationCards}
                </div>
            </>
        ) : (
            <div>Loading user...</div>
        )
    )
}