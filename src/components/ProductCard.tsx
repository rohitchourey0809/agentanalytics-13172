import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, VStack, Image } from '@chakra-ui/react';
import { Product } from '../slices/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

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
      </VStack>
    </Box>
  );
};

export default ProductCard;
