import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, UploadCloud } from 'lucide-react';
import { donations } from '../../data/donations';

// The data structure for a new donation, including temporary file data
interface NewDonation {
    title: string;
    description: string;
    idCategory: number;
    state: string;
    imageUrl: string; // This would be the final URL after upload
    urgent: boolean;
    expiryDate?: string;
    location: { latitude: number; longitude: number; };
}

// A new type to represent the file with a preview URL
interface FileWithPreview extends File {
    preview: string;
}

const CreateDonationForm = () => {
    const [formData, setFormData] = useState<NewDonation>({
        title: '',
        description: '',
        idCategory: 1, // Default category
        state: 'Available',
        imageUrl: '',
        urgent: false,
        location: { latitude: 41.3851, longitude: 2.1734 }, // Default to Barcelona
    });

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Ensure we don't exceed a reasonable limit for image uploads
        const newFiles = acceptedFiles.slice(0, 5 - files.length);

        setFiles(prevFiles => [
            ...prevFiles,
            ...newFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: true
    });

    const removeFile = (fileToRemove: FileWithPreview) => {
        setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
        URL.revokeObjectURL(fileToRemove.preview); // Clean up the preview URL
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title) newErrors.title = 'Title is required.';
        if (!formData.description) newErrors.description = 'Description is required.';
        if (files.length === 0) newErrors.images = 'At least one image is required.';
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({ ...prevState, urgent: e.target.checked }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);

            // Simulate API call and image upload
            setTimeout(() => {
                // Here you would upload images and get the public URL
                const imageUrl = files.length > 0 ? files[0].preview : '';

                const newDonation = {
                    ...formData,
                    id: donations.length + 1,
                    idDoner: 1,
                    imageUrl: imageUrl, // Use the uploaded image URL
                };
                donations.push(newDonation);
                console.log('Donation created:', newDonation);
                setIsSubmitting(false);
                alert('Donation created successfully!');
            }, 1500);
        }
    };

    return (
        <div className="bg-gray-100 p-8 min-h-screen">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Donate an Item</h2>
                <p className="text-gray-600 text-center">Fill out the form below to donate an item.</p>

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 p-3">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                {/* Category & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
                    <div>
                        <label htmlFor="idCategory" className="block text-sm font-semibold text-gray-700">Category</label>
                        <select name="idCategory" value={formData.idCategory} onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3">
                            <option value={1}>Clothing</option>
                            <option value={2}>Books</option>
                            <option value={3}>Electronics</option>
                            <option value={4}>Furniture</option>
                            <option value={5}>Food</option>
                            <option value={5}>Sports</option>
                            <option value={5}>Other</option>
                        </select>
                    </div>
                    {/* <div>
                        <label htmlFor="state" className="block text-sm font-semibold text-gray-700">State</label>
                        <select name="state" value={formData.state} onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3">
                            <option value="Available">Available</option>
                            <option value="Reserved">Reserved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div> */}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 p-3">Images</label>
                    <div {...getRootProps()} className={`mt-2 p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                        <input {...getInputProps()} />
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            {isDragActive ? "Drop the files here..." : "Drag 'n' drop images here, or click to select files."}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">(Max 5 files, up to 5MB each)</p>
                    </div>
                    {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                </div>

                {/* Image Previews */}
                {files.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-3">
                        {files.map(file => (
                            <div key={file.name} className="relative group">
                                <img src={file.preview} alt={file.name} className="w-full h-24 object-cover rounded-lg" onLoad={() => URL.revokeObjectURL(file.preview)} />
                                <button type="button" onClick={() => removeFile(file)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-4"> {/* Use space-y for vertical spacing */}
                    <label className="flex items-center">
                        <input type="checkbox" name="urgent" checked={formData.urgent} onChange={handleCheckboxChange}
                            className="rounded text-green-600 focus:ring-green-500" />
                        <span className="ml-2 text-sm text-gray-700 font-medium">Mark as Urgent</span>
                    </label>
                    {formData.urgent && (
                        <div className="flex-grow">
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md transition-colors duration-300 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Creating...' : 'Create Donation'}
                </button>
            </form>
        </div>
    );
};

export default CreateDonationForm;
