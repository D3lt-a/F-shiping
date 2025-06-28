import React, { useState } from 'react';
import { login } from '../../services/api'

/* 
    username : Customer3
    email : customer3@gmail.com
    password : customer3pass
*/

function Login({ onLogin }) {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem('token', res.data.token);
            onLogin(res.data.user); // pass user info up
            alert('Login successful!');
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h2>

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
                Login
            </button>
        </form>

    );
}

export default Login;
