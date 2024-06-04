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
      _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' }}
      transition="all 0.3s ease"
      bg="white"
    >
      <VStack spacing={4} align="stretch">
        <Image 
          src={product.image} 
          alt={product.title} 
          w="100%" 
          h="200px" 
          objectFit="cover"
          borderRadius="md"
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.05)' }}
        />
        <Text fontSize="2xl" fontWeight="bold" color="teal.500" textAlign="center">
          {product.title}
        </Text>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          ${product.price.toFixed(2)}
        </Text>
        <Text fontSize="md" color="gray.500" noOfLines={2} textAlign="center">
          {product.description}
        </Text>
        <Button 
          colorScheme="teal" 
          onClick={() => navigate(`/products/${product.id}`)} 
          alignSelf="center"
          mt={2}
        >
          View Details
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
