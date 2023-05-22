import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '@/lib/context/CartContext';
import { Box, Flex, Link } from '@chakra-ui/react';

function ShoppingCart() {
	const { getLengthProducts } = useCart();

	return (
		<Link href='/cart'>
			<Flex align='center' justify='center'>
				<Box mr='2'>{getLengthProducts()}</Box>
				<Box as={AiOutlineShoppingCart} boxSize='24px' />
			</Flex>
		</Link>
	);
}

export default ShoppingCart;
