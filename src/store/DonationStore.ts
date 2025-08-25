import { create } from "zustand";
import type {
  Donation,
  PaginatedDonationsResponse,
} from "../domain/interfaces/Donation";
import { donationRepositoryImpl } from "../data/DonationRepository.impl";
import { donationService } from "../services/donationService";

const repo = donationRepositoryImpl;
const service = donationService(repo);

interface DonationStore {
  donations: Donation[];
  donationPagination: PaginatedDonationsResponse;
  loading: boolean;
  fetchDonations: () => Promise<void>;
  getDonationById: (id: number) => Donation | undefined;
  addDonation: (donation: Omit<Donation, "id">) => Promise<Donation>;
  updateDonation: (id: number, donation: Omit<Donation, "id">) => Promise<void>;
  removeDonation: (id: number) => Promise<void>;
}

export const useDonationStore = create<DonationStore>((set, get) => ({
  donations: [],
  donationPagination: {
    data: [],
    total: 0,
    limit: 10,
    next: null,
    previous: null,
    totalPages: 0,
  },
  loading: false,

  /** Obtener todas las donaciones */
  fetchDonations: async () => {
    set({ loading: true });
    try {
      const data = await service.getAllDonations();
      set({
        donationPagination: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching donations:", error);
      set({ loading: false });
    }
  },

  /** Obtener una donación por ID */
  getDonationById: (id: number) => {
    return get().donations.find((donation) => donation.id === id);
  },

  /** Agregar una donación */
  addDonation: async (donation: Donation) => {
    try {
      const newDonation = await service.createDonation(donation);
      set((state) => ({
        donations: [...state.donations, newDonation],
      }));
      return newDonation;
    } catch (error) {
      console.error("Error adding donation:", error);
      throw error;
    }
  },

  /** Actualizar una donación */
  updateDonation: async (id: number, donation: Omit<Donation, "id">) => {
    try {
      const updatedDonation = await service.updateDonation(id, donation);
      set((state) => ({
        donations: state.donations.map((d) =>
          d.id == id ? { ...d, ...updatedDonation } : d
        ),
      }));
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  },

  /** Eliminar una donación */
  removeDonation: async (id: number) => {
    try {
      await service.deleteDonation(id);
      set((state) => ({
        donations: state.donations.filter((d) => d.id !== id),
      }));
    } catch (error) {
      console.error("Error removing donation:", error);
    }
  },
}));
