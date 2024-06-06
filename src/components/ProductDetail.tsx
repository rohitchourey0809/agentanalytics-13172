import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { selectProduct, updateProduct, updateProductAsync } from '../slices/productSlice';
import { Product } from '../slices/types';
import { Box, Text, Input, Button, VStack, FormControl, FormLabel, Image, HStack } from '@chakra-ui/react';
import { toast } from 'react-toastify';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const selectedProduct = useSelector((state: RootState) => state.products.selectedProduct);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === parseInt(id, 10));
      if (product) {
        dispatch(selectProduct(product));
      }
    }
  }, [id, products, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setTitle(selectedProduct.title);
      setPrice(selectedProduct.price);
      setDescription(selectedProduct.description);
      setImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  const handleSave = () => {
    if (id) {
      const updatedProduct: Product = { id: parseInt(id, 10), title, price, image, description };
      dispatch(updateProductAsync(updatedProduct));
      toast.success("Data Updated Successfully")
      setIsEditing(false);
    }
  };

  if (!selectedProduct) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box 
      maxW="sm" 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="lg" 
      p={6} 
      m="auto"
      mt={8}
    >
      {isEditing ? (
        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </FormControl>
          <HStack spacing={4}>
            <Button colorScheme="teal" onClick={handleSave}>Save</Button>
            <Button colorScheme="red" onClick={() => setIsEditing(false)}>Cancel</Button>
          </HStack>
        </VStack>
      ) : (
        <VStack spacing={4} align="center">
          <Image src={selectedProduct.image} alt={selectedProduct.title} borderRadius="md" w="100%" objectFit="cover"/>
          <Text fontSize="2xl" fontWeight="bold">{selectedProduct.title}</Text>
          <Text fontSize="xl" color="teal.500">${selectedProduct.price.toFixed(2)}</Text>
          <Text textAlign="center">{selectedProduct.description}</Text>
          <Button colorScheme="teal" onClick={() => setIsEditing(true)}>Edit</Button>
        </VStack>
      )}
    </Box>
  );
};

export default ProductDetail;
