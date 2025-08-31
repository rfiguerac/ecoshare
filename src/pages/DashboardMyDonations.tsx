import { useEffect } from "react";
import { Table } from "../components/Table";
import type { Donation } from "../domain/interfaces/Donation";
import { useDonationStore } from "../store/DonationStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useAuthStore } from "../store/AuthStore";
import { formatISODate } from "../utils/formatISODate";

export const DashboardMyDonations = () => {
  const { donationPagination, fetchDonations } = useDonationStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { user } = useAuthStore();

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

  return (
    <div className="container mx-auto">
      <div className="px-4 pt-8">
        <h1 className="text-2xl font-bold mb-2">My Donations</h1>
        <p className="text-sm text-gray-600">
          View and manage your donations here.
        </p>
      </div>

      <Table
        headers={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "category", label: "Category" },
          { key: "date", label: "Date" },
        ]}
        dataTable={
          user
            ? donationPagination.data
                .filter((donation) => donation.donorId === Number(user.id))
                .map((donation) => ({
                  id: donation.id,
                  title: donation.title,
                  description: donation.description,
                  category:
                    categories.find((cat) => cat.id === donation.categoryId)
                      ?.title || "Unknown",
                  date: donation.createdAt
                    ? formatISODate("" + donation.createdAt)
                    : undefined,
                }))
            : []
        }
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
