import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/database/models/Product';
import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import fakeDB from '@/database/fakeDB.json';

interface IProps {
	products: IProduct[];
}

export default function Home({ products }: IProps) {
	console.log(products)
	return (
		<>
			{products ? (
				<Flex gap='10'>
					<Wrap>
						{products.map(product => (
							<WrapItem key={product._id}>
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
		const APP_URI = process.env.NEXT_PUBLIC_APP_URI;
		console.log(APP_URI)

		
		const res = await fetch(`${APP_URI}/api/products`);
		const { data } = await res.json();

		console.log(res);
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
