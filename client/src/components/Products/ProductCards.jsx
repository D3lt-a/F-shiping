import React from 'react';
import { getProducts, deleteProduct } from '../../services/api';

function ProductCards({ onReadMore, user }) {
    const [products, setProducts] = React.useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            alert('Error fetching products');
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== id)
                );
                alert('Product deleted successfully');
            } catch (error) {
                alert('Error deleting product');
                console.error('Error deleting product:', error);
            }
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-xl shadow-md p-4 space-y-3">
                        <img
                            src={`http://localhost:3000${product.image}`}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-blue-600 font-semibold">{product.price} Rwf</p>
                        {user?.role === 'admin' && (
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
                            >
                                Delete
                            </button>
                        )}
                        {onReadMore && (
                            <button
                                onClick={() => onReadMore(product)}
                                className="text-blue-600 hover:underline"
                            >
                                Read More →
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCards;

