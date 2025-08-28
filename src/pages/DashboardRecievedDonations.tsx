import { useEffect } from "react";
import { Table } from "../components/Table";
import type { Donation } from "../domain/interfaces/Donation";
import { useDonationStore } from "../store/DonationStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useDonationTransactionStore } from "../store/DonationTransactionStore";
import { useAuthStore } from "../store/AuthStore";

export const DashboardRecievedDonations = () => {
  const { donationPagination, fetchDonations } = useDonationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { transactions, fetchTransactions } = useDonationTransactionStore();

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

  const handleEdit = (donation: Donation) => {
    // Handle edit action
  };

  const handleDelete = (id: string | number) => {
    // Handle delete action
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
          .map((donation) => ({
            id: donation.id,
            title: donation.title,
            description: donation.description,
            category:
              categories.find((cat) => cat.id === donation.categoryId)?.title ||
              "Unknown",
            status: donation.status,
            date: donation.createdAt,
          }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
