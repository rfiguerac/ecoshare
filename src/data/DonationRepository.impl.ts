import { ecoshareApi } from "../api/ecoshareApi";
import type { DonationRepository } from "../domain/repositories/Donation.Repository";

export const donationRepositoryImpl: DonationRepository = {
  getAllDonations: async () => {
    const response = await ecoshareApi.get("/donations?limit=1000");
    return response.data;
  },
  getDonationById: async (id) => {
    const response = await ecoshareApi.get(`/donations/${id}`);
    return response.data;
  },
  createDonation: async (donation) => {
    const response = await ecoshareApi.post("/donations", donation);
    return response.data;
  },
  updateDonation: async (id, donation) => {
    const response = await ecoshareApi.put(`/donations/${id}`, donation);
    return response.data;
  },
  deleteDonation: async (id) => {
    const response = await ecoshareApi.delete(`/donations/${id}`);
    return response.data;
  },
};
