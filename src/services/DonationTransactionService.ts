import type {
  NewDonationTransactionData,
  UpdateDonationTransactionData,
} from "../domain/interfaces/DonationTransaction";
import type { DonationTransactionRepository } from "../domain/repositories/DonationTransactionRepository";

export const DonationTransactionService = (
  repository: DonationTransactionRepository
) => {
  const createTransaction = async (data: NewDonationTransactionData) => {
    return repository.createTransaction(data);
  };

  const getTransactionById = async (id: string) => {
    return repository.getTransactionById(id);
  };

  const getAllTransactions = async () => {
    return repository.getAllTransactions();
  };

  const updateTransaction = async (
    id: string,
    data: UpdateDonationTransactionData
  ) => {
    return repository.updateTransaction(id, data);
  };

  const deleteTransaction = async (id: string) => {
    return repository.deleteTransaction(id);
  };

  return {
    createTransaction,
    getTransactionById,
    getAllTransactions,
    updateTransaction,
    deleteTransaction,
  };
};
