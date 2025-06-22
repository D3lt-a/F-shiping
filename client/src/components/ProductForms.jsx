import React from 'react'
import { createProduct } from '../services/api';

function ProductForms({ onProductAdded }) {
    const [form, setForm] = React.useState({ title: '', price: '', description: '', image: '' });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title || !form.price || !form.description || !form.image) {
            alert("Please fill in all fields");
            // console.error("Please fill in all fields");
            return;
        }
        try {
            const response = await createProduct(form);
            setForm({
                title: '',
                price: '',
                image: '',
                description: ''
            });
            onProductAdded?.();
            alert('Product created successfully');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product');
        }}


    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-5">
                <h2 className="text-2xl font-semibold text-gray-700 text-center">Add a New Product</h2>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                    <input
                        id="title"
                        name="title"
                        placeholder="Enter product title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">Price</label>
                    <input
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                    <input
                        id="image"
                        name="image"
                        placeholder="Enter image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Write a brief description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                >
                    Add Product
                </button>
            </form>

        </div>
    )
}

export default ProductForms