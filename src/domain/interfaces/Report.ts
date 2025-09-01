export interface Report {
    id: number,
    description: string,
    reporterId: number,
    donationId: number,
    isReviewed: boolean,
    createdAt?: Date;
    updatedAt?: Date;
}