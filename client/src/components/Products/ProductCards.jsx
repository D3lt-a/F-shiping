import React from 'react';
import { getProducts, deleteProduct } from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductCards({ onReadMore, user }) {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            toast.error('Error fetching products');
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
                toast.success('Product deleted successfully');
            } catch (error) {
                toast.error('Error deleting product');
                console.error('Error deleting product:', error);
            }
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-3 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                >
                    <img
                        src={`http://localhost:3000${product.image}`}
                        alt={product.title}
                        className="w-full h-52 object-cover rounded-md"
                    />
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{product.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {product.description.length > 100
                            ? product.description.substring(0, 100) + '...'
                            : product.description}
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-base">{product.price} Rwf</p>

                    {onReadMore && (
                        <button
                            onClick={() => {
                                onReadMore(product);
                                navigate('/product-info');
                            }}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
                        >
                            Read More →
                        </button>
                    )}

                    {user?.role === 'admin' && (
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="mt-2 w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProductCards;
