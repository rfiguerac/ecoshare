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
  longitude: number;
  latitude: number;
  expiryDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewDonation
  extends Omit<Donation, "id" | "idDoner" | "createdAt" | "updatedAt"> {}
