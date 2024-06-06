// CreateProduct.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addProductAsync, fetchProducts } from '../slices/productSlice';
import { Box, Input, Button, VStack, FormControl, FormLabel, Image, Textarea } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
  

  const handleSubmit = async () => {
    const newProduct = { id: Date.now(), title, price: parseFloat(price), image, description };
    try {
      setLoading(true)
      await dispatch(addProductAsync(newProduct)).unwrap();
      toast.success('Product created successfully');
      await dispatch(fetchProducts());
       setLoading(false)

      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
    } catch (error) {
       setLoading(false);
      toast.error('Failed to create product');
    }
  };

  return (
    <Box p={4} maxW='md' mx='auto' boxShadow='md' borderRadius='lg'>
      <VStack spacing={4}>
        <FormControl id='title'>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='Product Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id='price'>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder='Product Price'
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl id='image'>
          <FormLabel>Image URL</FormLabel>
          <Input
            placeholder='Image URL'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {image && <Image src={image} alt='Product Image' borderRadius='md' mt={4} />}
        </FormControl>
        <FormControl id='description'>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Product Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button colorScheme='teal' onClick={handleSubmit} isLoading={loading}>
          Create Product
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateProduct;
