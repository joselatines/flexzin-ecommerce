import CartItem from '@/components/CartPage/CartItem';
import { CartOrderSummary } from '@/components/CartPage/CartOrderSummary';
import { IProduct } from '@/database/models/Product';
import { useCart } from '@/lib/context/CartContext';
import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	useColorModeValue as mode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

function ShoppingCartPage() {
	const { getProducts, addToCart, removeFromCart } = useCart();

	const [productsList, setProductsList] = useState<IProduct[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [refresh, setRefresh] = useState<number>(0);

	const calculateTotal = (products: IProduct[]): number => {
		const initialValue = 0;
		const total = products.reduce((accumulator, productItem) => {
			return accumulator + productItem.salePrice;
		}, initialValue);

		return total;
	};

	const fetchLocalStorage = async () => {
		const products = await getProducts();
		setProductsList(products);
		setTotalPrice(calculateTotal(productsList));
	};

	useEffect(() => {
		fetchLocalStorage();
	}, [refresh]);

	const handleAdd = (product: IProduct, quantity: number) => {
		console.log({product});
		addToCart(product, quantity);
		setRefresh(prev => prev + 1);
	};
	const handleDelete = (id: string) => {
		removeFromCart(id);
		setRefresh(prev => prev + 1);
	};

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
							Shopping Cart ({productsList.length})
						</Heading>

						<Stack spacing='6'>
							{productsList.map((item: IProduct) => (
								<CartItem
									key={item.id}
									product={item}
									handleAdd={handleAdd}
									handleDelete={handleDelete}
								/>
							))}
						</Stack>
					</Stack>

					<Flex direction='column' align='center' flex='1'>
						<CartOrderSummary totalPrice={totalPrice} />
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

export default ShoppingCartPage;
