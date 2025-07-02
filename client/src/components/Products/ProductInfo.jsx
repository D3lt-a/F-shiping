import React from 'react';
import toast from 'react-hot-toast';
import { placeorder } from '../../services/api';
import { FaShoppingCart } from 'react-icons/fa';

function ProductInfo({ product, user }) {
    const placeOrder = async () => {
        if (!user) return toast.error('Please login to place an order');

        try {
            console.log(user)
            await placeorder({
                productId: product._id,
                productTitle: product.title,
                customerName: user.username,
                customerEmail: user.email,
                customerNumber: user.number,
            });
            toast.success('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again later.');
        }
    };

    if (!product) {
        return (
            <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow text-center transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-300 text-lg">No product selected.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors duration-300">
            <div className="overflow-hidden rounded-md">
                <img
                    src={`http://localhost:3000${product.image}`}
                    alt={product.title}
                    className="w-full h-64 object-cover transition-transform hover:scale-105 duration-300 rounded-md"
                />
            </div>

            <div className="mt-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{product.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">{product.description}</p>

                <div className="mt-4">
                    <span className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
                        {product.price} Rwf
                    </span>
                </div>

                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    You can place your order by clicking the button below. Then follow up by calling:{' '}
                    <a
                        href="tel:+250794524463"
                        className="font-semibold text-gray-700 dark:text-gray-300 hover:underline"
                    >
                        +250794524463
                    </a>
                </div>

                <button
                    onClick={placeOrder}
                    className="mt-6 inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded transition-colors duration-300"
                >
                    <FaShoppingCart className="mr-2" />
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default ProductInfo;
