import MainLayout from '@/components/layouts/main';
import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/database/models/Product';
import { Flex } from '@chakra-ui/react';

interface IProps {
	products: IProduct[];
}

export default function Home({ products }: IProps) {
	return (
		<>
			Home page
			<Flex gap={6}>
				{products.map((p, index) => (
					<ProductCard key={index} product={p} />
				))}
			</Flex>
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
