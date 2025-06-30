import React from 'react'
import { createProduct } from '../../services/api';

function ProductForms({ onProductAdded }) {
    const [form, setForm] = React.useState({ title: '', price: '', description: '', image: '' });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', form.title);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('image', form.image); // actual file

        try {
            await createProduct(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            alert('Product created successfully!');
            setForm({ title: '', price: '', description: '', image: '' });
            onProductAdded && onProductAdded();
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error imageing product');
        }
    };



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
                        type="file"
                        name="image"
                        accept="image/*"
                        // value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
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