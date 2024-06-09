// src/components/Favorites.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import ProductCard from './ProductCard';
import { VStack, Heading, Text, SimpleGrid, Center } from '@chakra-ui/react';
import { toggleFavorite } from '../slices/productSlice';
import { toast } from 'react-toastify';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector((state: RootState) =>
    state.products.products.filter(product => product.favorite)
  );

  const handleToggleFavorite = (productId: number) => {
    // Dispatch the toggleFavorite action to update Redux store
    dispatch(toggleFavorite(productId));

    // Update local storage to remove the product from favorites
    let favorites = localStorage.getItem('favorites');
    if (!favorites) {
      favorites = JSON.stringify([]);
    }
    let favoritesArray = JSON.parse(favorites);
    favoritesArray = favoritesArray.filter((id: number) => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favoritesArray));

    toast.info("Removed from favorites");
  };

  return (
    <VStack spacing={4} align="start" p={8}>
     <Center><Heading>Favorites</Heading></Center> 
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {favoriteProducts.length > 0 ? (
        favoriteProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onToggleFavorite={handleToggleFavorite} // Pass handleToggleFavorite as prop
          />
        ))
      ) : (
        <Text>No favorite products found.</Text>
      )}
      </SimpleGrid>
    </VStack>
  );
};

export default Favorites;
