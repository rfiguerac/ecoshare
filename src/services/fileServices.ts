import { fileRepositoryImpl } from "../data/fileRepository.impl";
import type { FileRepository } from "../domain/repositories/FileResository";

export const fileServices = (
  fileRepository: FileRepository = fileRepositoryImpl
) => {
  const uploadFile = async (files: File[], donorId: number) => {
    const response = await fileRepository.uploadFiles(files, donorId);
    return response;
  };

  return {
    uploadFile,
  };
};
