import NextLink from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '@/lib/context/CartContext';
import { Box, Flex } from '@chakra-ui/react';

function ShoppingCart() {
	const { getProducts } = useCart();
	const [items, setItems] = useState(0);

	useEffect(() => {
		const callLocalStorage = async () => {
			const productsLength = await getProducts().length;
			setItems(productsLength);
		};

		callLocalStorage();
	}, []);

	return (
		<NextLink href='/cart'>
			<Flex align='center' justify='center'>
				<Box mr='2'>{items}</Box>
				<Box as={AiOutlineShoppingCart} boxSize='24px' />
			</Flex>
		</NextLink>
	);
}

export default ShoppingCart;
