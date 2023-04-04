import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '@/lib/context/CartContext';
import { Box, Flex, Link } from '@chakra-ui/react';

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
		<Link href='/cart'>
			<Flex align='center' justify='center'>
				<Box mr='2'>{items}</Box>
				<Box as={AiOutlineShoppingCart} boxSize='24px' />
			</Flex>
		</Link>
	);
}

export default ShoppingCart;
