import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminOrderPanel() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:3000/orders/getOrders');
            if (!res.ok) throw new Error('Failed to fetch orders');
            const data = await res.json();
            setOrders(data);
            setFilteredOrders(data);
        } catch (error) {
            toast.error('Error fetching orders');
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Filter orders based on search term (title or email)
    useEffect(() => {
        const filtered = orders.filter((order) => {
            const search = searchTerm.toLowerCase();
            return (
                order.title.toLowerCase().includes(search) ||
                (order.cusEmail && order.cusEmail.toLowerCase().includes(search))
            );
        });
        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    }, [searchTerm, orders]);

    // Sort filtered orders by date
    useEffect(() => {
        const sorted = [...filteredOrders].sort((a, b) => {
            const dateA = new Date(a.orderedAt);
            const dateB = new Date(b.orderedAt);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setFilteredOrders(sorted);
    }, [sortOrder]);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Orders Report</h2>

            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <input
                    type="text"
                    placeholder="Search by product or customer email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                    <option value="desc">Date: Newest First</option>
                    <option value="asc">Date: Oldest First</option>
                </select>
            </div>

            {currentOrders.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No orders found.</p>
            ) : (
                <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-md">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase">
                            <tr>
                                <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Product</th>
                                <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Customer Email</th>
                                <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-600 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">{order.title}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                                        {order.cusEmail ? order.cusEmail : 'No email was obtained'}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600">
                                        {new Date(order.orderedAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded-md border ${currentPage === i + 1
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-indigo-700'
                                } transition`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOrderPanel;
