import type { Img } from "../interfaces/Donation";

export interface FileRepository {
  uploadFiles: (files: File[], donorId: number) => Promise<{ images: Img[] }>;
}
