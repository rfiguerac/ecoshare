import { useEffect } from "react";
import { useDonationTransactionStore } from "../../store/DonationTransactionStore";
import { useToast } from "../../contexts/ToastContext";
import type {
  NewDonationTransactionData,
  UpdateDonationTransactionData,
} from "../../domain/interfaces/DonationTransaction";
import { useDonationStore } from "../../store/DonationStore";

export const useDonationTransaction = () => {
  const {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useDonationTransactionStore();

  const { updateDonationStatus } = useDonationStore();

  const { showToast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  const handleCreateTransaction = async (data: NewDonationTransactionData) => {
    const newTransaction = await createTransaction(data);
    if (newTransaction) {
      updateDonationStatus(data.donationId!, "Reserved");
      showToast("Transacción creada exitosamente!", "success");
    }
  };

  const handleUpdateTransaction = async (
    id: string,
    data: UpdateDonationTransactionData
  ) => {
    const updatedTransaction = await updateTransaction(id, data);
    if (updatedTransaction) {
      updateDonationStatus(data.donationId, data.status);
      showToast("Transacción actualizada exitosamente!", "success");
    } else {
      showToast("Error al actualizar la transacción", "error");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    const res = await deleteTransaction(id);
    if (res) {
      showToast("Transacción eliminada exitosamente!", "success");
    } else {
      showToast("Error al eliminar la transacción", "error");
    }
  };

  return {
    transactions,
    loading,
    error,
    handleCreateTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
  };
};
