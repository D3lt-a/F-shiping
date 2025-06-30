import React, { useEffect, useState } from 'react';

const AdminOrderPanel = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/orders/getorders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error('Error fetching orders:', err));
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Orders Report</h2>
            {orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="border rounded p-4 shadow">
                            <p><strong>Product:</strong> {order.title}</p>
                            <p><strong>Customer:</strong> {order.cusEmail}</p>
                            <p><strong>Date:</strong> {new Date(order.orderedAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrderPanel;
