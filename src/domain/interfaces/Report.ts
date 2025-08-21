export interface Report {
    id?: number,
    userId: number,
    reportType: string,
    description: string,
    idDonation: number,
    createdAt?: Date;
    updatedAt?: Date;
}