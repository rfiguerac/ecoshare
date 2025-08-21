import { CardDonation } from "../components/Main/CardDonation";
import type { Donation } from "../domain/interfaces/Donation";

type DashboardDonationsPageProps = {
  title: string;
  fetchDonations: Donation[];
};
export const DashboardDonationsPage = ({title, fetchDonations}: DashboardDonationsPageProps) => {
    return (
        <>
            <h1 className=" self-start text-2xl font-bold mb-4 pl-4 pt-8">{title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full justify-items-center lg:justify-items-start lg:pl-4">
                { fetchDonations.map(donation =>(
                    <CardDonation donation={donation} />
                ))}
            </div>
        </>
    )
}