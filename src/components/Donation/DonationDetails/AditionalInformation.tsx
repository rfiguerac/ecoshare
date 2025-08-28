import { MapPin, Clock4 } from "lucide-react";
import type { Donation } from "../../../domain/interfaces/Donation";

interface AditionalInformationProps {
    donation: Donation;
    address: string

}



export const AditionalInformation = ({ donation, address }: AditionalInformationProps) => {

    // Split the full address to show only the neighborhood, city, and region

    
    return <>
        <div className="card bg-base-100 w-90 shadow-sm md:min-w-2xl">
            <div className="card-body">
                <h2 className="card-title">Aditional Information</h2>
                <p className="font-bold mt-2 mb-2">Items Details</p>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray font-medium">Category</span>
                    <span className="text-darkgray font-semibold">Food</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray font-medium">State</span>
                    <span className="text-darkgray font-semibold">{donation.status}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray font-medium">Urgent</span>
                    <span className="text-darkgray font-semibold">{donation.urgent ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray font-medium">Posted</span>
                    <span className="text-darkgray font-semibold">
                        {donation.createdAt ? new Date(donation.createdAt).toLocaleString() : "N/A"}
                    </span>
                </div>
                <p className="font-bold mt-2 mb-2">Pickup Information</p>
                <div className="flex items-start space-x-2">
                    <MapPin size={16} color="grey" className="mt-1" />
                    <div className="flex flex-col">
                        <span className="text-darkgray font-semibold">{address}</span>
                        <span className="text-gray text-sm">Pickup location</span>
                    </div>
                </div>
                <div className="flex items-start space-x-2">
                    <Clock4 size={16} color="grey" className="mt-1" />
                    <div className="flex flex-col">
                        <span className="text-darkgray font-semibold">Flexible hours</span>
                        <span className="text-gray text-sm">Contact donor to arrange</span>
                    </div>
                </div>
                <div className="bg-info text-info-content p-6 rounded-xl mt-4">
                    <h2 className="font-bold mb-4">Saftey Guidelines</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Meet in public places when possible</li>
                        <li>Inspect items before pickup</li>
                        <li>Follow food safety guidelines for perishables</li>
                        <li>Report any issues to our support team</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}