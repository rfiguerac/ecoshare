import { ecoshareApi } from "../api/ecoshareApi";
import type { FileRepository } from "../domain/repositories/FileResository";

export const fileRepositoryImpl: FileRepository = {
  uploadFiles: async (files, donorId) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    const response = await ecoshareApi.post(
      `/file/upload/${donorId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  },
};
