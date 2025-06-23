import React, { useState } from 'react';
import { login } from '../services/api';

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
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="input" />
            <button type="submit" className="btn">Login</button>
        </form>
    );
}

export default Login;
