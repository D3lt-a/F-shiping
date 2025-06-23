import React from 'react';

function ProductInfo({ product }) {
    if (!product) return <p className="p-6 text-gray-600">No product selected.</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded" />
            <h2 className="text-3xl font-bold mt-4">{product.title}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-xl text-blue-600 font-semibold mt-4">{product.price} Rwf</p>
        </div>
    );
}

export default ProductInfo;
