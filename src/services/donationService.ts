import type { Donation } from "../domain/interfaces/Donation";
import type { DonationRepository } from "../domain/repositories/Donation.Repository";

export const donationService = (repository: DonationRepository) => {
  const getAllDonations = async () => {
    return await repository.getAllDonations();
  };

  const getDonationById = async (id: number) => {
    return await repository.getDonationById(id);
  };

  const createDonation = async (donation: Donation) => {
    return await repository.createDonation(donation);
  };

  const updateDonation = async (id: number, donation: Donation) => {
    return await repository.updateDonation(id, donation);
  };

  const deleteDonation = async (id: number) => {
    return await repository.deleteDonation(id);
  };

  return {
    getAllDonations,
    getDonationById,
    createDonation,
    updateDonation,
    deleteDonation,
  };
};
