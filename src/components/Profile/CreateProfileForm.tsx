import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { User as UserIcon, UploadCloud, X } from 'lucide-react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// The data structure for a new user profile
interface UserProfile {
  name: string;
  email: string;
  bio: string;
  profilePictureUrl: string;
}

// A new type to represent the file with a preview URL
interface FileWithPreview extends File {
  preview: string;
}

const ProfileCreationForm = () => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    bio: '',
    profilePictureUrl: '',
  });

  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // We only accept one file for a profile picture
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      setFile(Object.assign(newFile, {
        preview: URL.createObjectURL(newFile)
      }));
    }
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!file) newErrors.profilePicture = 'A profile picture is required.';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call and image upload
      setTimeout(() => {
        const newProfile = {
          ...formData,
          profilePictureUrl: file ? file.preview : '',
        };
        console.log('User Profile created:', newProfile);
        setIsSubmitting(false);
        alert('Profile created successfully!');
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-lg mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Profile</h2>
        <p className="text-gray-600 text-center">Tell us about yourself to join the community.</p>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
                 className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
                 className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} rows={3}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md transition-colors duration-300 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed">
          {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileCreationForm;