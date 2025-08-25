import { useEffect } from "react";
import { Table } from "../components/Table";
import type { Donation } from "../domain/interfaces/Donation";
import { useDonationStore } from "../store/DonationStore";
import { useCategoryStore } from "../store/CategoryStore";

export const DashboardDonationsPage = () => {
  const { donationPagination, fetchDonations } = useDonationStore();
  const { categories, fetchCategories } = useCategoryStore();

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
      <h1 className=" self-start text-2xl font-bold mb-4 pl-4 pt-8">
        Donations
      </h1>

      <Table
        headers={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "category", label: "Category" },
          { key: "date", label: "Date" },
        ]}
        dataTable={donationPagination.data.map((donation) => ({
          id: donation.id,
          title: donation.title,
          description: donation.description,
          category:
            categories.find((cat) => cat.id === donation.categoryId)?.title ||
            "Unknown",
          date: donation.createdAt,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
