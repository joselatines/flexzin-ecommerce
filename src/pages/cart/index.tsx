import CartItem from '@/components/CartPage/CartItem';
import { CartOrderSummary } from '@/components/CartPage/CartOrderSummary';
import { IProduct } from '@/database/models/Product';
import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	useColorModeValue as mode,
} from '@chakra-ui/react';

function ShoppingCartPage({ products }: any) {
	return (
		<>
			<h1>Shopping cart</h1>
			<Box
				maxW={{ base: '3xl', lg: '7xl' }}
				mx='auto'
				px={{ base: '4', md: '8', lg: '12' }}
				py={{ base: '6', md: '8', lg: '12' }}
			>
				<Stack
					direction={{ base: 'column', lg: 'row' }}
					align={{ lg: 'flex-start' }}
					spacing={{ base: '8', md: '16' }}
				>
					<Stack spacing={{ base: '8', md: '10' }} flex='2'>
						<Heading fontSize='2xl' fontWeight='extrabold'>
							Shopping Cart (3 items)
						</Heading>

						<Stack spacing='6'>
							{products.map((item: IProduct) => (
								<CartItem key={item.id} {...item} />
							))}
						</Stack>
					</Stack>

					<Flex direction='column' align='center' flex='1'>
						<CartOrderSummary />
						<HStack mt='6' fontWeight='semibold'>
							<p>or</p>
							<Link color={mode('blue.500', 'blue.200')}>
								Continue shopping
							</Link>
						</HStack>
					</Flex>
				</Stack>
			</Box>
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch('http://localhost:3000/api/products');
		const { data } = await res.json();

		return {
			props: { products: data },
		};
	} catch (error) {
		console.error(error);
		return {
			props: { products: [] },
		};
	}
}

export default ShoppingCartPage;
