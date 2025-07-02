import React, { useState } from 'react';
import { register } from '../../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', number: '', role: 'customer' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            localStorage.setItem('token', res.data.token);
            toast.success('Registration successful!');
            navigate('/products');
        } catch (err) {
            toast.error(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-300">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-6">
                    Create an Account
                </h2>

                {/* Username */}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="number" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Phone Number
                    </label>
                    <input
                        id="number"
                        name="number"
                        type="tel"
                        value={form.number}
                        onChange={handleChange}
                        placeholder="Enter Phone Number"
                        className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3 rounded-md font-semibold transition-colors"
                >
                    Register
                </button>

                {/* Login link */}
                <span className="mt-4 block text-center text-sm text-gray-700 dark:text-gray-300">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Login
                    </Link>
                </span>
            </form>
        </div>
    );
}

export default Register;
