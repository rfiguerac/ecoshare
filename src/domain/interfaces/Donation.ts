export interface PaginatedDonationsResponse {
  data: Donation[];
  limit: number;
  next: string | null;
  previous: string | null;
  total: number;
  totalPages: number;
}

export interface Donation {
  id?: number;
  title: string;
  donorId: number;
  categoryId: number;
  description: string;
  urgent?: boolean;
  images?: img[];
  longitude: number;
  latitude: number;
  expiryDate?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  status?: "Available" | "Reserved" | "Collected";
}

interface img {
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  donationId: number;
  id: number;
}

export interface NewDonation
  extends Omit<Donation, "id" | "createdAt" | "updatedAt" | "imageUrl"> {}
