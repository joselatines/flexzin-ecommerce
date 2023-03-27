import ShippingForm from '@/components/ShippingForm';
import { Heading, Text } from '@chakra-ui/react';

function CheckingPage() {
	return (
		<>
			<Heading size='md' marginBottom={5}>
				Información de envío/entrega
			</Heading>
			<ShippingForm />
			<Text marginTop={5}>
				Luego de enviar tu orden se pondrán en contacto contigo via WhatsApp y
				correo electrónico para compartirte los <strong> métodos de pago y fecha de
				entrega.</strong>
			</Text>
		</>
	);
}

export default CheckingPage;
