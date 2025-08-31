import { useEffect } from "react";
import { Table } from "../components/Table";
import type { Donation } from "../domain/interfaces/Donation";
import { useDonationStore } from "../store/DonationStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useDonationTransactionStore } from "../store/DonationTransactionStore";
import { useAuthStore } from "../store/AuthStore";

import { useDonationTransaction } from "../hooks/donation/useDonationTransaction";
import { formatISODate } from "../utils/formatISODate";

export const DashboardRequestedDonations = () => {
  const { donationPagination, fetchDonations } = useDonationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { transactions, fetchTransactions } = useDonationTransactionStore();

  const { handleUpdateTransaction, handleDeleteTransaction } =
    useDonationTransaction();

  const { user } = useAuthStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = async (donation: Donation) => {
    const transactionToUpdate = transactions.find(
      (transaction) => Number(transaction.donationId) === Number(donation.id)
    );
    if (transactionToUpdate) {
      const id = String(transactionToUpdate.id);
      await handleUpdateTransaction(id, {
        status: "Donated",
        donationId: transactionToUpdate.donationId,
      });
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    const transactionToDelete = transactions.find(
      (transaction) => Number(transaction.donationId) === Number(id)
    );
    if (transactionToDelete != undefined) {
      await handleDeleteTransaction(String(transactionToDelete.id));
    }
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 pt-8">
        <h1 className="text-2xl font-bold mb-2">
          Donations you have requested
        </h1>
        <p className="text-sm text-gray-600">View all requested items here.</p>
      </div>

      <p className="px-4 pt-8 text-xl">
        <strong>Requested Donations:</strong>
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
          .filter((donation) => user && donation.donorId === Number(user.id))
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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <p className="px-4 pt-8 text-xl">
        <strong>Donations completed:</strong>
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
          .filter((donation) => user && donation.donorId === Number(user.id))
          .filter((donation) => donation.status === "Donated")
          .map((donation) => ({
            id: donation.id,
            title: donation.title,
            description: donation.description,
            category:
              categories.find((cat) => cat.id === donation.categoryId)?.title ||
              "Unknown",
            status: donation.status,
            date: donation.updatedAt
              ? formatISODate("" + donation.updatedAt)
              : undefined,
          }))}
        showEditButton={false}
        showDeleteButton={false}
      />
    </div>
  );
};
