import { useEffect } from "react";
import { Table } from "../components/Table";

import { useDonationStore } from "../store/DonationStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useDonationTransactionStore } from "../store/DonationTransactionStore";
import { useAuthStore } from "../store/AuthStore";
import { useToast } from "../contexts/ToastContext";
import { formatISODate } from "../utils/formatISODate";

export const DashboardRecievedDonations = () => {
  const { donationPagination, fetchDonations } = useDonationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { transactions, fetchTransactions } = useDonationTransactionStore();

  const { user } = useAuthStore();
  const { showToast } = useToast();
  const { deleteTransaction } = useDonationTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    const transactionToDelete = transactions.find(
      (transaction) => Number(transaction.donationId) === Number(id)
    );
    if (transactionToDelete != undefined) {
      const resp = await deleteTransaction(String(transactionToDelete.id));
      if (resp) {
        showToast("Transaction deleted successfully", "success");
      }
    } else {
      showToast("No transaction found with ID: " + id, "error");
    }
  };

  const myDonationTransactionSaved = user
    ? transactions.filter(
        (transaction) => Number(transaction.receiverId) === Number(user.id)
      )
    : [];

  return (
    <div className="container mx-auto">
      <div className="px-4 pt-8">
        <h1 className="text-2xl font-bold mb-2">Donations you have recieved</h1>
        <p className="text-sm text-gray-600">View all recieved items here.</p>
      </div>

      <p className="px-4 pt-8 text-xl">
        <strong>Donations pending receipt:</strong>
      </p>

      <Table
        headers={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "category", label: "Category" },
          { key: "status", label: "Status" },
          { key: "date", label: "Date" },
        ]}
        dataTable={donationPagination.data
          .filter((donation) => {
            return myDonationTransactionSaved.some(
              (transaction) => transaction.donationId === donation.id
            );
          })
          .filter((donation) => donation.status === "Reserved")
          .map((donation) => ({
            id: donation.id,
            title: donation.title,
            description: donation.description,
            category:
              categories.find((cat) => cat.id === donation.categoryId)?.title ||
              "Unknown",
            status: donation.status,
            date: donation.createdAt
              ? formatISODate("" + donation.createdAt)
              : undefined,
          }))}
        onDelete={handleDelete}
        showEditButton={false}
      />

      <div className="px-4 pt-8 text-xl">
        <strong>My Received Donations:</strong>
      </div>

      <Table
        headers={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "category", label: "Category" },
          { key: "status", label: "Status" },
          { key: "date", label: "Date" },
        ]}
        dataTable={donationPagination.data
          .filter((donation) => {
            return myDonationTransactionSaved.some(
              (transaction) => transaction.donationId === donation.id
            );
          })
          .filter((donation) => donation.status === "Donated")
          .map((donation) => ({
            id: donation.id,
            title: donation.title,
            description: donation.description,
            category:
              categories.find((cat) => cat.id === donation.categoryId)?.title ||
              "Unknown",
            status: donation.status,
            date: donation.createdAt
              ? formatISODate("" + donation.createdAt)
              : undefined,
          }))}
        onDelete={handleDelete}
        showEditButton={false}
        showDeleteButton={false}
      />
    </div>
  );
};
