import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Heading } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Box bg="teal.500" px={4} py={3} mb={8} transition="height 0.3s ease">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color="white">
          <Link as={RouterLink} to="/">
            My Store
          </Link>
        </Heading>
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" px={2} color="white">
            Home
          </Link>
          <Link as={RouterLink} to="/create" px={2} color="white">
            Create Product
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
