import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, VStack, Image } from '@chakra-ui/react';
import { Product } from '../slices/types';
import { deleteProductAsync, fetchProducts, toggleFavorite } from '../slices/productSlice';
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
    onToggleFavorite: (productId: number) => void; // Add onToggleFavorite prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
 



  // Retrieve favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      // Dispatch toggleFavorite action for each favorite product stored in local storage
      favorites.forEach((productId: number) => {
        dispatch(toggleFavorite(productId));
      });
    }
  }, [dispatch]);

  const handleDelete = async (productId: number) => {
    try {
      await dispatch(deleteProductAsync(productId));
      toast.success("Item deleted successfully");
      await dispatch(fetchProducts());
    } catch (error) {
      // Handle any errors that occur during deletion
    }
  };

  const handleToggleFavorite = () => {
    // Update local storage when favorite button is clicked
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
      favorites = JSON.stringify([]);
    }
    let favoritesArray = JSON.parse(favorites);
    if (product.favorite) {
      favoritesArray = favoritesArray.filter((productId: number) => productId !== product.id);
    } else {
      favoritesArray.push(product.id);
    }
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));

    // Dispatch the toggleFavorite action to update the Redux store
    dispatch(toggleFavorite(product.id));

    toast.info(
      product.favorite ? "Removed from favorites" : "Added to favorites"
    );
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
        <Button colorScheme={product.favorite ? "red" : "yellow"} onClick={handleToggleFavorite} 
          alignSelf="center"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}>
          {product.favorite ? "Unfavorite" : "Favorite"}
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
