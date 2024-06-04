import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setProducts } from '../slices/productSlice';
import { fetchProducts } from '../api';
import ProductCard from './ProductCard';
import { SimpleGrid, Box, Input } from '@chakra-ui/react';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      dispatch(setProducts(products));
    };
    getProducts();
  }, [dispatch]);

  const filteredProducts = products?.filter(product =>
    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={4}>
      <Input
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {filteredProducts?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
