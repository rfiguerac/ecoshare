import { ecoshareApi } from "../api/ecoshareApi";
import type { FileRepository } from "../domain/repositories/FileResository";

export const fileRepositoryImpl: FileRepository = {
  uploadFiles: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const response = await ecoshareApi.post("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.fileUrls;
  },
};
