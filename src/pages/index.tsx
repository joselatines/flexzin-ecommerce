import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/database/models/Product';
import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import fakeDB from '@/database/fakeDB.json';

interface IProps {
	products: IProduct[];
}

export default function Home({ products }: IProps) {
	return (
		<>
			{products ? (
				<Flex gap='10'>
					<Wrap>
						{products.map(product => (
							<WrapItem key={product.id}>
								<ProductCard product={product} />
							</WrapItem>
						))}
					</Wrap>
				</Flex>
			) : (
				<span>Nothing was found</span>
			)}
		</>
	);
}

export async function getStaticProps() {
	try {
		const apiURI = process.env.NEXT_PUBLIC_APP_URI;
		const res = await fetch(`${apiURI}/api/products`);
		const { data } = await res.json();
		return {
			props: { products: data},
		};
	} catch (error) {
		console.error(error);
		return {
			props: { products: [] },
		};
	}
}
