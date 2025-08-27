import { create } from "zustand";
import type {
  DonationTransaction,
  NewDonationTransactionData,
  UpdateDonationTransactionData,
} from "../domain/interfaces/DonationTransaction";
import { donationTransactionRepositoryImpl } from "../data/DonationTransactionRepository.impl";
import { DonationTransactionService } from "../services/DonationTransactionService";

const repo = donationTransactionRepositoryImpl;
const service = DonationTransactionService(repo);

interface DonationTransactionState {
  transactions: DonationTransaction[];
  loading: boolean;
  error: string | null;
  fetchTransactions: () => Promise<void>;
  createTransaction: (
    data: NewDonationTransactionData
  ) => Promise<DonationTransaction | undefined>;
  updateTransaction: (
    id: string,
    data: UpdateDonationTransactionData
  ) => Promise<DonationTransaction | undefined>;
  deleteTransaction: (id: string) => Promise<boolean>;
}

export const useDonationTransactionStore = create<DonationTransactionState>(
  (set) => ({
    transactions: [],
    loading: false,
    error: null,

    fetchTransactions: async () => {
      set({ loading: true, error: null });
      try {
        const data = await service.getAllTransactions();
        set({ transactions: data, loading: false });
      } catch (error: any) {
        set({
          loading: false,
          error: "Error al obtener las transacciones: " + error.message,
        });
        console.error(error);
      }
    },

    createTransaction: async (data) => {
      set({ loading: true, error: null });
      try {
        const newTransaction = await service.createTransaction(data);
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
          loading: false,
        }));
        return newTransaction;
      } catch (error: any) {
        set({
          loading: false,
          error: "Error al crear la transacción: " + error.message,
        });
        console.error(error);
        return undefined;
      }
    },

    updateTransaction: async (id, data) => {
      set({ loading: true, error: null });
      try {
        const updatedTransaction = await service.updateTransaction(id, data);
        if (updatedTransaction) {
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === updatedTransaction.id ? updatedTransaction : t
            ),
            loading: false,
          }));
        }
        return updatedTransaction ? updatedTransaction : undefined;
      } catch (error: any) {
        set({
          loading: false,
          error: "Error al actualizar la transacción: " + error.message,
        });
        console.error(error);
        return undefined;
      }
    },

    deleteTransaction: async (id) => {
      set({ loading: true, error: null });
      try {
        const success = await service.deleteTransaction(id);
        if (success) {
          set((state) => ({
            transactions: state.transactions.filter(
              (transaction) => transaction.id !== Number(id)
            ),
            loading: false,
          }));
          return true;
        } else {
          set({
            loading: false,
            error: "La transacción no pudo ser eliminada.",
          });
          return false;
        }
      } catch (error: any) {
        set({
          loading: false,
          error: "Error al eliminar la transacción: " + error.message,
        });
        console.error(error);
        return false;
      }
    },
  })
);
