import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function ShippingForm() {
	const API_URI = process.env.NEXT_PUBLIC_API_URI;
	const showToast = useCustomToast();
	const router = useRouter();

	const createOrder = async () => {
		const orderData = {
			user_id: '64051da829b6801b84073666',
			payment_method: 'transfer',
			products: [
				{
					id: '6406838b0ffd6a2414bc7e53',
					title: 'probando title',
					price: 55,
					qty: 0,
					description: 'asdfasdfasdfasdf',
					images: 'string[]',
				},
			],
		};

		try {
			const response = await fetch(`http://localhost:3000/api/orders`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			});

			if (!response.ok) {
				showToast({
					title: 'Orden NO enviada',
					description: 'Algo salió mal',
					status: 'error',
			
				});
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			showToast({
				title: 'Orden enviada',
				description:
					'Revisa tu WhatsApp y tu correo para conocer mas acerca tu orden',
				status: 'success',
			});

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async () => {
		const orderSended = await createOrder();

		orderSended && router.push('/');
	};

	return (
		<form>
			<FormControl>
				<FormLabel>Full Name</FormLabel>
				<Input placeholder='John Doe' />
			</FormControl>

			<FormControl>
				<FormLabel>Street Address</FormLabel>
				<Input placeholder='123 Main St' />
			</FormControl>

			<FormControl>
				<FormLabel>Zip Code</FormLabel>
				<Input placeholder='12345' />
			</FormControl>

			<FormControl>
				<FormLabel>City</FormLabel>
				<Input placeholder='New York' />
			</FormControl>

			<FormControl>
				<FormLabel>Email Address</FormLabel>
				<Input placeholder='john.doe@example.com' />
			</FormControl>

			<FormControl>
				<FormLabel>Payment Method</FormLabel>
				<Input placeholder='Credit Card' />
			</FormControl>

			<Button onClick={handleSubmit}>Submit</Button>
		</form>
	);
}
