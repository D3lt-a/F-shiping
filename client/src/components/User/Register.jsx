import React, { useState } from 'react';
import { register } from '../../services/api';

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'customer' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            localStorage.setItem('token', res.data.token);
            alert('Registration successful!');
            window.location.reload();
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Register</h2>

            <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
            />

            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
            />

            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
            />

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
            >
                Register
            </button>
        </form>

    );
}

export default Register;
