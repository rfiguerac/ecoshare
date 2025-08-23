export interface Report {
    id?: number,
    userId: number,
    description: string,
    idDonation: number,
    createdAt?: Date;
    updatedAt?: Date;
}