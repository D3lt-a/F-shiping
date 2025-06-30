import React from 'react';
import { placeorder } from '../../services/api';

function ProductInfo({ product, user }) {
    const placeOrder = async () => {
        if (!user) return alert('Please login to place an order');

        try {
            await placeorder({
                productId: product._id,
                productTitle: product.title,
                customerEmail: user.email,
            });
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again later.');
        }
    };

    if (!product) return <p>No product selected.</p>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
            <img
                src={`http://localhost:3000${product.image}`}
                alt={product.title}
                className="w-full h-64 object-cover rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-blue-700 font-semibold mt-2">{product.price} Rwf</p>
            <p className="text-gray-500 mt-2">You can place your by clicking the button below then follow up by calling the following number : <span className="font-semibold">+250794524463</span></p>
            <button
                onClick={placeOrder}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
                Place Order  
            </button>
        </div>
    );
}

export default ProductInfo;
