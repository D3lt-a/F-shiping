import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createProduct } from '../../services/api';

function ProductForms({ onProductAdded }) {
    const [form, setForm] = useState({ title: '', price: '', description: '', image: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.price || !form.description || !form.image) {
            toast.error('All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('image', form.image);

        try {
            setLoading(true);
            await createProduct(formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Product created successfully!');
            setForm({ title: '', price: '', description: '', image: '' });
            onProductAdded && onProductAdded();
        } catch (error) {
            console.error('❌ Error creating product:', error);
            toast.error('Failed to create product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8">
            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                    Add a New Product
                </h2>

                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        placeholder="Enter product title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    />
                </div>

                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
                    >
                        Price (Rwf)
                    </label>
                    <input
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    />
                </div>

                <div>
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
                    >
                        Product Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Write a brief description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        } text-white font-semibold py-2 px-4 rounded-md transition duration-300`}
                >
                    {loading ? 'Submitting...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default ProductForms;
