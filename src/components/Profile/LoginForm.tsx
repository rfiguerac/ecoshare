import React, { useState } from 'react';
import { X } from 'lucide-react';

import { useLoginUser } from '../../hooks/user/useLoginUser';


interface ModalProps {
    handleShowModal: () => void;
    handleRegisterShowModal: () => void;
}

const LoginForm = (props: ModalProps) => {
    const { handleShowModal, handleRegisterShowModal } = props;


    const { formData, setFormData } = useLoginUser();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});



    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email) newErrors.email = 'Email is required.';
        if (!formData.password) newErrors.password = 'Password is required.';
        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: typeof formData) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
        }
    };

    return (
        <div>
            <dialog open className="modal">
                <div className="modal-box">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Log In
                        <X onClick={handleShowModal}
                            className="float-right text-gray-400 cursor-pointer hover:text-gray-600" />
                    </h2>
                    <p
                        className="text-gray-600 text-center">Welcome back! Please enter your details.
                    </p>
                    {isSubmitting && (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    )}

                    <div className="mb-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <fieldset disabled={isSubmitting}></fieldset>
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                                <input type="email" name="email" value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                                <input type="password" name="password" value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" disabled={isSubmitting}
                                className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md transition-colors duration-300 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Logging In...' : 'Log In'}
                            </button>

                            {/* Registration Link */}
                            <p className="text-center text-sm text-gray-600">
                                Don't have an account?
                                <button onClick={handleRegisterShowModal} type="button" className="text-center text-sm text-blue-500">
                                    Register Now
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </dialog >
        </div >
    );
};

export default LoginForm;
