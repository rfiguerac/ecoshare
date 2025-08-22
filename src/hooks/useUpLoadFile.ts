import { fileServices } from "../services/fileServices";

export const useUploadFile = () => {
  const uploadFiles = async (files: File[]) => {
    const { uploadFile } = fileServices();
    const response = await uploadFile(files);
    return response;
  };

  return {
    uploadFiles,
  };
};
