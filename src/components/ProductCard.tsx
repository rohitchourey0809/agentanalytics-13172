import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, VStack, Image } from '@chakra-ui/react';
import { Product } from '../slices/types';
import { deleteProductAsync, fetchProducts } from '../slices/productSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
    const handleDelete = async (productId: number) => {
    try {
      await dispatch(deleteProductAsync(productId));
      toast.success("Item deleted succesfully")
       await dispatch(fetchProducts());
      // Optionally, you can display a success message or perform other actions upon successful deletion
    } catch (error) {
      // Handle any errors that occur during deletion
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      _hover={{ transform: 'translateY(-5px)', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' }}
      bg="white"
      transition="all 0.3s ease"
    >
      <VStack spacing={4} align="stretch">
        <Image 
          src={product.image} 
          alt={product.title} 
          objectFit="cover"
          borderRadius="md"
          h={60}
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.05)' }}
        />
        <VStack spacing={1} align="center">
          <Text fontSize="xl" fontWeight="bold" color="teal.500">
            {product.title}
          </Text>
          <Text fontSize="lg" color="gray.600">
            ${product.price.toFixed(2)}
          </Text>
          <Text fontSize="md" color="gray.500" textAlign="center" noOfLines={2}>
            {product.description}
          </Text>
        </VStack>
        <Button 
          colorScheme="teal" 
          onClick={() => navigate(`/products/${product.id}`)} 
          alignSelf="center"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
        >
          View Details
        </Button>
           <Button 
          colorScheme="red" 
          onClick={() => handleDelete(product.id)} 
          alignSelf="center"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
        >
          Delete
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
