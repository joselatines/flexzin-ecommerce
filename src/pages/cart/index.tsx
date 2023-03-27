import CartItem from '@/components/CartPage/CartItem';
import { CartOrderSummary } from '@/components/CartPage/CartOrderSummary';
import { IProduct } from '@/database/models/Product';
import { useCart } from '@/lib/context/CartContext';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Link,
	Stack,
	useColorModeValue as mode,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';

function ShoppingCartPage() {
	const { getProducts, addToCart, removeFromCart, emptyCart } = useCart();

	const [productsList, setProductsList] = useState<IProduct[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [refresh, setRefresh] = useState<number>(0);

	const showToast = useCustomToast();

	const calculateTotal = (products: IProduct[]): number => {
		const totalPrice = products.reduce((accumulator, product) => {
			return accumulator + product.salePrice * product.qty;
		}, 0);
		return totalPrice;
	};

	const fetchLocalStorage = async () => {
		const products = await getProducts();

		const subTotal = calculateTotal(products);

		setProductsList(products);
		setTotalPrice(subTotal);
	};

	useEffect(() => {
		fetchLocalStorage();
	}, [refresh]);

	const handleAdd = (product: IProduct, quantity: number) => {
		addToCart(product, quantity);
		setRefresh(prev => prev + 1);
	};

	const handleDelete = (id: string) => {
		removeFromCart(id);
		setRefresh(prev => prev + 1);
	};

	const handleClearCart = () => {
		emptyCart();
		showToast({
			title: 'Carrito vacío',
			status: 'success',
			duration: 5000,
			isClosable: true,
		});
		setRefresh(prev => prev + 1);
	};

	return (
		<>
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
							Tu carrito ({productsList.length})
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
							{productsList.length > 0 && (
								<Button onClick={handleClearCart}>
									Limpiar carrito
									<BsFillTrash3Fill />
								</Button>
							)}
						</Stack>
					</Stack>

					<Flex direction='column' align='center' flex='1'>
						<CartOrderSummary totalPrice={totalPrice} />
						<HStack mt='6' fontWeight='semibold'>
							<p>o</p>
							<Link href='/' color={mode('blue.500', 'blue.200')}>
								Volver a productos
							</Link>
						</HStack>
					</Flex>
				</Stack>
			</Box>
		</>
	);
}

export default ShoppingCartPage;
