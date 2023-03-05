import MainLayout from '@/components/layouts/main';
import { IProduct } from '@/database/models/Product';

interface IProps {
	products: IProduct[];
}

export default function Home({ products }: IProps) {
	return (
		<MainLayout>
			<>
				Home page
				{products.map((product, index) => (
					<div key={index}>{product.title}</div>
				))}
			</>
		</MainLayout>
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
