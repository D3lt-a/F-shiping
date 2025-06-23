import React, { useState } from 'react';
import { register } from '../services/api';

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
        <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="input" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="input" />
            <button type="submit" className="btn">Register</button>
        </form>
    );
}

export default Register;
