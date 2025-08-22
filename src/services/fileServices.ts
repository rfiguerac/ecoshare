import { fileRepositoryImpl } from "../data/fileRepository.impl";
import type { FileRepository } from "../domain/repositories/FileResository";

export const fileServices = (
  fileRepository: FileRepository = fileRepositoryImpl
) => {
  const uploadFile = async (files: File[]) => {
    const response = await fileRepository.uploadFiles(files);
    return response;
  };

  return {
    uploadFile,
  };
};
