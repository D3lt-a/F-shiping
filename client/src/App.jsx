// App.jsx
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

import ProductForms from './components/Products/ProductForms';
import ProductCards from './components/Products/ProductCards';
import ProductInfo from './components/Products/ProductInfo';
import Register from './components/User/Register';
import Login from './components/User/Login';
import AdminOrderPanel from './components/AdminOrderPanle';

function App() {
  const [authTab, setAuthTab] = useState('login');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    const storedUser = localStorage.getItem('fshipping_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('fshipping_user', JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fshipping_user');
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedMode = localStorage.getItem('fshipping_dark_mode');
    if (savedMode === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('fshipping_dark_mode', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Toaster position="top-right" />

      {/* Navbar */}
      {user && (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <ul className="flex items-center space-x-6 font-medium text-gray-800 dark:text-white">
                {isAdmin && (
                  <li>
                    <Link
                      to="/add-product"
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200"
                    >
                      Product Form
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/products"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200"
                  >
                    Product List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/product-info"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200"
                  >
                    Product Info
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/orders-report"
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-200"
                    >
                      Orders Report
                    </Link>
                  </li>
                )}
              </ul>

              <div className="flex space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-4 py-2 rounded transition-colors"
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Views */}
      <Routes>
        {!user ? (
          <>
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} switchToRegister={() => setAuthTab('register')} />}
            />
            <Route
              path="/register"
              element={<Register switchToLogin={() => setAuthTab('login')} />}
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/products" />} />
            {isAdmin && <Route path="/add-product" element={<ProductForms />} />}
            <Route path="/products" element={<ProductCards user={user} onReadMore={setSelectedProduct} />} />
            <Route
              path="/product-info"
              element={
                selectedProduct ? (
                  <ProductInfo product={selectedProduct} user={user} />
                ) : (
                  <Navigate to="/products" replace />
                )
              }
            />
            {isAdmin && <Route path="/orders-report" element={<AdminOrderPanel />} />}
            <Route path="*" element={<Navigate to="/products" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
