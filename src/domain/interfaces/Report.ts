export interface Report {
    id?: number,
    reporter: string,
    reportType: string,
    description: string,
    idDonation: number,
    createdAt?: Date;
    updatedAt?: Date;
}