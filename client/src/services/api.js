import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const getProducts = () => api.get('/products/getproducts');
export const createProduct = (product) => api.post('/products/createproduct', product);
export const deleteProduct = (id) => api.delete(`/products/deleteproduct/${id}`);

export const getOrders = () => api.get('/orders/getorders');
export const createOrder = (order) => api.post('/orders/createorder', order);