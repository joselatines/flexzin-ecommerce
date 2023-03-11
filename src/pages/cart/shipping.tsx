import ShippingForm from '@/components/ShippingForm';

function CheckingPage({ products }: any) {
	return (
		<>
			<h1>Checking order</h1>
			<ShippingForm />
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
