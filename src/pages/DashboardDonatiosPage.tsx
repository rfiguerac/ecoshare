import { useEffect } from "react";
import { Table } from "../components/Table";
import type { Donation } from "../domain/interfaces/Donation";
import { useDonationStore } from "../store/DonationStore";

export const DashboardDonationsPage = () => {
  const { donationPagination, fetchDonations } = useDonationStore();

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

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
          { key: "date", label: "Date" },
        ]}
        dataTable={donationPagination.data.map((donation) => ({
          id: donation.id,
          title: donation.title,
          description: donation.description,
          date: donation.createdAt,
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
