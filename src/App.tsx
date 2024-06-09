import React, { Suspense, lazy } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

// Lazy load components
const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const CreateProduct = lazy(() => import('./components/CreateProduct'));
const Favorites = lazy(() => import('./components/Favorites'));

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
