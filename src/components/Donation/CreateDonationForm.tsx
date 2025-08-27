import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, UploadCloud } from "lucide-react";
import { useCreateDonation } from "../../hooks/donation/useCreateDonation";
import { useCategoryStore } from "../../store/CategoryStore";

// A new type to represent the file with a preview URL

interface ModalProps {
  handleShowModal: () => void;
}

const CreateDonationForm = (props: ModalProps) => {
  const { handleShowModal } = props;

  const { categories } = useCategoryStore();

  const {
    formData,
    errorLocation,
    isSubmitting,
    handleChange,
    handleCheckboxChange,
    handleSubmit,
    errors,
    files,
    setFiles,
    removeFile,
  } = useCreateDonation({ handleShowModal });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Ensure we don't exceed a reasonable limit for image uploads
      const newFiles = acceptedFiles.slice(0, 5 - files.length);

      setFiles((prevFiles) => [
        ...prevFiles,
        ...newFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  });

  const categoryOptions = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.title}
    </option>
  ));

  return (
    <div>
      <dialog open className="modal z-50">
        <div className="modal-box">
          <div className="font-bold text-lg">
            <p className="text-3xl font-bold text-center text-gray-800">
              Donate an Item
            </p>
            <p className="text-gray-600 text-center">
              Fill out the form below to donate an item.
            </p>
            {isSubmitting && (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            )}
            <p className="text-red-400">{errorLocation}</p>
          </div>
          <div className="mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset disabled={isSubmitting}>
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full p-3"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mt-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="textarea textarea-bordered w-full p-3"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Category  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <label
                    htmlFor="idCategory"
                    className="block text-sm font-semibold text-gray-700">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="select select-bordered ">
                    {categoryOptions}
                  </select>
                </div>

                {/* Image Upload */}
                <div className="mt-4 mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Images
                  </label>
                  <div
                    {...getRootProps()}
                    className={`mt-2 p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}>
                    <input {...getInputProps()} />
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {isDragActive
                        ? "Drop the files here..."
                        : "Drag 'n' drop images here, or click to select files."}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      (Max 5 files, up to 5MB each)
                    </p>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                  )}
                </div>

                {/* Image Previews */}
                {files.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {files.map((file) => (
                      <div key={file.name} className="relative group">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-24 object-cover rounded-lg"
                          onLoad={() => URL.revokeObjectURL(file.preview)}
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(file)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Urgent and Expiry Date */}
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="urgent"
                      checked={formData.urgent}
                      onChange={handleCheckboxChange}
                      className="checkbox checkbox-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-medium">
                      Mark as Urgent
                    </span>
                  </label>
                  {formData.urgent && (
                    <div className="flex-grow">
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        value={
                          formData.expiryDate
                            ? typeof formData.expiryDate === "string"
                              ? formData.expiryDate
                              : formData.expiryDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={handleChange}
                        className="input input-bordered w-full p-3"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button className="btn" onClick={handleShowModal}>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    //onClick={() => setIsSubmitting(!isSubmitting)}
                    className="btn btn-primary">
                    {isSubmitting ? "Creating..." : "Create Donation"}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateDonationForm;
