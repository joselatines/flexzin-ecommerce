import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ShippingForm from '@/components/ShippingForm';
import { Heading, Text } from '@chakra-ui/react';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useCart } from '@/lib/context/CartContext';

function CheckingPage() {
	const { products } = useCart();
	const cart = products;
	const showToast = useCustomToast();
	const router = useRouter();

	useEffect(() => {
		if (!cart) {
			showToast({
				title: 'Agrega un artículo al carrito',
				status: 'info',
			});
			router.push('/cart');
		}
	}, []);

	return (
		<>
			<Heading size='md' marginBottom={5}>
				Información de envío/entrega
			</Heading>
			<ShippingForm />
			<Text marginTop={5}>
				Luego de enviar tu orden se pondrán en contacto contigo via WhatsApp y
				correo electrónico para compartirte los{' '}
				<strong> métodos de pago y fecha de entrega.</strong>
			</Text>
		</>
	);
}

export default CheckingPage;
