import React from 'react';
import { Route,  Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/CreateProduct';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <>
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
