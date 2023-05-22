import NextLink from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '@/lib/context/CartContext';
import { Box, Flex } from '@chakra-ui/react';

function ShoppingCart() {
	const { getLengthProducts } = useCart();

	return (
		<NextLink href='/cart'>
			<Flex align='center' justify='center'>
				<Box mr='2'>{getLengthProducts()}</Box>
				<Box as={AiOutlineShoppingCart} boxSize='24px' />
			</Flex>
		</NextLink>
	);
}

export default ShoppingCart;
