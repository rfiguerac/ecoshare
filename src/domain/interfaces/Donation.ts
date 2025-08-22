export interface Donation {
  id?: number;
  title: string;
  donorId: number;
  categoryId: number;
  description: string;
  urgent?: boolean;
  imageUrl: string[];
  longitude: number;
  latitude: number;
  expiryDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewDonation
  extends Omit<Donation, "id" | "createdAt" | "updatedAt" | "imageUrl"> {}
