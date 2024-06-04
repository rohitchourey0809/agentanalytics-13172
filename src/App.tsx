import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route,  Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/CreateProduct';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
    <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </>
  );
};

export default App;
