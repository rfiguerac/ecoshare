export interface DonationTransaction {
  id: number;
  donationId: number;
  receiverId: number;
  status: "Reserved" | "Donated";
  createdAt: Date;
  updatedAt: Date;
}

export interface NewDonationTransactionData
  extends Omit<DonationTransaction, "id" | "createdAt" | "updatedAt"> {}

export interface UpdateDonationTransactionData
  extends Omit<
    DonationTransaction,
    "id" | "createdAt" | "updatedAt" | "donationId" | "receiverId"
  > {}
