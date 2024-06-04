import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setProducts } from "../slices/productSlice";
import { fetchProducts } from "../api";
import ProductCard from "./ProductCard";
import {
  SimpleGrid,
  Box,
  Input,
  Button,
  HStack,
  Center,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Number of products per page

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      dispatch(setProducts(products));
    };
    getProducts();
  }, [dispatch]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const filteredProducts = currentProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousPage = () => {
    if (currentPage === 1) {
      toast.info("You are already on the first page!");
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentProducts.length < productsPerPage) {
      toast.info("You are already on the last page!");
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    
    <Box p={4}>
      <Input
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
      <Center>
        <HStack spacing={2} mt={4} align="center">
          <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
            Previous
          </Button>
          <Button
            disabled={currentProducts.length < productsPerPage}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default ProductList;
