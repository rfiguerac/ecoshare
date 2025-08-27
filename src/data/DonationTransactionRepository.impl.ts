import { ecoshareApi } from "../api/ecoshareApi";
import type { DonationTransactionRepository } from "../domain/repositories/DonationTransactionRepository";

export const donationTransactionRepositoryImpl: DonationTransactionRepository =
  {
    createTransaction: async (data) => {
      const response = await ecoshareApi.post("/donation-transactions", data);
      return response.data;
    },
    getTransactionById: async (id) => {
      const response = await ecoshareApi.get(`/donation-transactions/${id}`);
      return response.data;
    },
    getAllTransactions: async () => {
      const response = await ecoshareApi.get("/donation-transactions");
      return response.data;
    },
    updateTransaction: async (id, data) => {
      const response = await ecoshareApi.put(
        `/donation-transactions/${id}`,
        data
      );
      return response.data;
    },
    deleteTransaction: async (id) => {
      const response = await ecoshareApi.delete(`/donation-transactions/${id}`);
      return response.data;
    },
  };
