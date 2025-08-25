import type {
  Donation,
  NewDonation,
  PaginatedDonationsResponse,
} from "../interfaces/Donation";

export interface DonationRepository {
  getAllDonations(): Promise<PaginatedDonationsResponse>;
  getDonationById(id: number): Promise<Donation | null>;
  createDonation(donation: NewDonation): Promise<Donation>;
  updateDonation(
    id: number,
    donation: Omit<Donation, "id">
  ): Promise<Donation | null>;
  deleteDonation(id: number): Promise<boolean>;
}
