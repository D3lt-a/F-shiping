import React, { useEffect } from 'react';
import './App.css';
import ProductForms from './components/Products/ProductForms';
import ProductCards from './components/Products/ProductCards';
import ProductInfo from './components/Products/ProductInfo';
import Register from './components/User/Register';
import Login from './components/User/Login';
import AdminOrderPanel from './components/AdminOrderPanle';

function App() {
  const [tab, setTab] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [user, setUser] = React.useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('fshipping_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setTab(2); // default to product list if logged in
    }
  }, []);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleReadMore = (product) => {
    setSelectedProduct(product);
    setTab(3);
  };

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('fshipping_user', JSON.stringify(userInfo));
    setTab(2); // redirect to product list after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fshipping_user');
    setTab(0);
  };

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <Register />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <>
      {/* Nav */}
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border cursor-pointer border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 ">
        {user.role === 'admin' && (
          <li>
            <a
              onClick={() => handleTabChange(1)}
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  md:text-blue-500"
            >
              Product Form
            </a>
          </li>
        )}
        <li>
          <a
            onClick={() => handleTabChange(2)}
            className="block py-2 px-3 text-gray-900 hover:text-blue-600"
          >
            Product List
          </a>
        </li>
        <li>
          <a
            onClick={() => handleTabChange(3)}
            className="block py-2 px-3 text-gray-900 hover:text-blue-600"
          >
            Product Info
          </a>
        </li>
        {user.role === 'admin' && (
          <li>
            <a
              onClick={() => handleTabChange(4)}
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  md:text-blue-500"
            >
              Orders Report
            </a>
          </li>
        )}
        <li className="ml-auto">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700  py-1 px-4 rounded"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Views */}
      <div>
        {tab === 1 && user.role === 'admin' && <ProductForms />}
        {tab === 2 && <ProductCards user={user} onReadMore={handleReadMore} />}
        {tab === 3 && <ProductInfo product={selectedProduct} user={user} />}
        {tab === 4 && user.role === 'admin' && <AdminOrderPanel />}
      </div>
    </>
  );
}

export default App;
