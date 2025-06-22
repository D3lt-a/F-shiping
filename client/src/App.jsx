import React from 'react';
import './App.css'
import ProductForms from './components/ProductForms'
import ProductCards from './components/ProductCards';
import ProductInfo from './components/ProductInfo';

function App() {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <ul className="font-medium flex flex-col p-4 lg:p-4 md:p-0 mt-4 border cursor-pointer border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a onClick={() => { handleTabChange(1) }} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Product Form</a>
        </li>
        <li>
          <a onClick={() => { handleTabChange(2) }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Product List</a>
        </li>
        <li>
          <a onClick={() => { handleTabChange(3) }} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Product Info</a>
        </li>
      </ul>

      <div>
        {tab === 1 && <ProductForms />}
        {tab === 2 && <ProductCards />}
        {tab === 3 && <ProductInfo />}
      </div>
    </>
  )
}

export default App;