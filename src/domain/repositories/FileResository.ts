export interface FileRepository {
  uploadFiles: (files: File[]) => Promise<{ url: string }[]>;
}
