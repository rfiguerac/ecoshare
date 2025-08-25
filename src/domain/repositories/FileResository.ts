export interface FileRepository {
  uploadFiles: (
    files: File[],
    donorId: number
  ) => Promise<{ imageUrl: string[] }>;
}
