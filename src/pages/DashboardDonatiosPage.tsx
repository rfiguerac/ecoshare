import { useParams } from "react-router-dom";
import { donations } from "../components/donations";
import { CardDonation } from "../components/Main/CardDonation";
export const DashboardDonationsPage = () => {
    const { title } = useParams();
    return (
        <>
            <h1 className=" self-start text-2xl font-bold mb-4 pl-4">{title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full justify-items-center lg:justify-items-start lg:pl-4">
                { donations.map(donation =>(
                    <CardDonation donation={donation} />
                ))}
            </div>
        </>
    )
}