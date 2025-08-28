import type {
  DonationTransaction,
  NewDonationTransactionData,
  UpdateDonationTransactionData,
} from "../interfaces/DonationTransaction";

export interface DonationTransactionRepository {
  createTransaction: (
    data: NewDonationTransactionData
  ) => Promise<DonationTransaction>;
  getTransactionById: (id: string) => Promise<DonationTransaction | null>;
  getAllTransactions: () => Promise<DonationTransaction[]>;
  updateTransaction: (
    id: string,
    data: UpdateDonationTransactionData
  ) => Promise<DonationTransaction | null>;
  deleteTransaction: (id: string) => Promise<DonationTransaction>;
}
