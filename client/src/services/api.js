import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const getProducts = () => api.get('/products');
export const createProduct = (product) => api.post('/products', product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getOrders = () => api.get('/orders');
export const createOrder = (order) => api.post('/orders', order);