import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            
            // Simulate API call for login
            setTimeout(() => {
                console.log('Login submitted:', formData);
                setIsSubmitting(false);
                alert('Logged in successfully!');
                // Here you would handle successful login and redirect
            }, 1500);
        }
    };

    return (
        <div className="bg-gray-100 p-8 min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-sm mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Log In</h2>
                <p className="text-gray-600 text-center">Welcome back! Please enter your details.</p>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                           className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3" />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}
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
                    Don't have an account? <Link to="/CreateProfile" className="text-green-600 font-semibold hover:underline">Register now</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
