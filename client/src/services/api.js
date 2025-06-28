import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (user) => api.post('/auth/register', user);

export const getProducts = () => api.get('/products/getproducts');
export const getProduct = (id) => api.get('/products/getproduct/'+id);
export const createProduct = (product) => api.post('/products/createproduct', product);
export const deleteProduct = (id) => api.delete(`/products/deleteproduct/`+id);

export const getOrders = () => api.get('/orders/getorders');
export const placeorder = (order) => api.post('/orders/placeorder', order);