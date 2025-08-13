import type { Location } from "./Location";

type donationState = "Available" | "Reserved" | "closed";

 

export interface Donation {
    id?: number;
    title: string;
    idDoner: number;
    idCategory: number;
    description: string;
    state: donationState;
    urgent?: boolean;
    imageUrl: string;
    location: Location;
    expiryDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}