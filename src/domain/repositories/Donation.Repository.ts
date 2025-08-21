import type { Donation } from "../interfaces/Donation";

export interface DonationRepository {
  getAllDonations(): Promise<Donation[]>;
  getDonationById(id: number): Promise<Donation | null>;
  createDonation(donation: Omit<Donation, "id">): Promise<Donation>;
  updateDonation(
    id: number,
    donation: Omit<Donation, "id">
  ): Promise<Donation | null>;
  deleteDonation(id: number): Promise<boolean>;
}
