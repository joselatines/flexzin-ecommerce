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

function CheckingPage({ products }: any) {
	return (
		<>
			<h1>Checking order</h1>
	
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

export default CheckingPage;
