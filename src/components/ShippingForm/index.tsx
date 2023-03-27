import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Select,
} from '@chakra-ui/react';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useRouter } from 'next/router';
import { useCart } from '@/lib/context/CartContext';

const initialValues = {
	fullName: '',
	city: '',
	parish: '',
	phoneNumber: '',
	email: '',
	paymentMethod: '',
};

const validationSchema = Yup.object({
	fullName: Yup.string().required('Required'),
	city: Yup.string().required('Required'),
	parish: Yup.string().required('Required'),
	phoneNumber: Yup.string()
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(10, 'Must be exactly 10 digits')
		.required('Phone number is required'),
	email: Yup.string().email('Invalid email address').required('Required'),
	paymentMethod: Yup.string(),
});

type formValues = {
	fullName: string;
	city: string;
	parish: string;
	phoneNumber: string;
	email: string;
	paymentMethod: string;
};

export default function ShippingForm() {
	const showToast = useCustomToast();
	const router = useRouter();
	const [payment, setPayment] = useState('efectivo');
	const { getProducts } = useCart();

	const sendEmail = async (userEmail: string, message: string) => {
		const templateParams = {
			from_name: userEmail,
			reply_to: userEmail,
			to_name: 'joselatines33@gmail.com',
			message,
		};

		const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
		const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
		const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

		try {
			if (!SERVICE_ID || !TEMPLATE_ID || !EMAILJS_USER_ID) {
				throw new Error('Credentials are not available');
			}

			const response = await emailjs.send(
				SERVICE_ID,
				TEMPLATE_ID,
				templateParams,
				EMAILJS_USER_ID
			);

			return response;
		} catch (error) {
			console.error(error);

			showToast({
				title: error.message,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});

			return error;
		}
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async values => {
			formik.setSubmitting(true);
			const order = { ...values, paymentMethod: payment };
			const products = await getProducts();
			
			const templateMessage = `
			Detalles del pedido
			Nombre: ${order.fullName}
			Ciudad: ${order.city}
			Parroquia: ${order.parish}
			Método de pago: ${order.paymentMethod}

			Productos: 
			${products
				.map(
					product => `
			Nombre: ${product.title}
			Cantidad: ${product.qty}
			Precio: ${product.price}
		`
				)
				.join('')}
`;

			const res = await sendEmail(order.email, templateMessage);

			if (res.status !== 200) {
				showToast({
					title: 'No se pudo enviar la orden',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
				return;
			}

			showToast({
				title: 'Orden enviada con éxito! Revisa tu correo',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			router.push('/');

			formik.setSubmitting(false);
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormControl>
				<FormLabel>Nombre completo</FormLabel>
				<Input
					required
					name='fullName'
					placeholder='Juan Perez'
					value={formik.values.fullName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.fullName && (
					<span className='error'>{formik.errors.fullName}</span>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Ciudad</FormLabel>
				<Input
					required
					name='city'
					placeholder='Caracas'
					value={formik.values.city}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.city && (
					<span className='error'>{formik.errors.city}</span>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Parroquia</FormLabel>
				<Input
					required
					name='parish'
					placeholder='Chacao'
					value={formik.values.parish}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.parish && (
					<span className='error'>{formik.errors.parish}</span>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Número de Whastapp</FormLabel>
				<Input
					required
					name='phoneNumber'
					placeholder='+58 123 456 7890'
					value={formik.values.phoneNumber}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.phoneNumber && (
					<span className='error'>{formik.errors.phoneNumber}</span>
				)}
			</FormControl>

			<FormControl>
				<FormLabel>Correo electrónico</FormLabel>
				<Input
					required
					name='email'
					placeholder='juan.perez@example.com'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.email && (
					<span className='error'>{formik.errors.email}</span>
				)}
			</FormControl>
			<FormControl>
				<FormLabel>Payment Method</FormLabel>
				<select
					placeholder='Select payment method'
					onChange={e => setPayment(e.target.value)}
					name='paymentMethod'
				>
					<option value='efectivo'>Efectivo</option>
					<option value='transferencia'>Transferencia</option>
					<option value='binance'>Binance</option>
				</select>
			</FormControl>

			<Button disabled={formik.isSubmitting} type='submit'>
				Submit
			</Button>
		</form>
	);
}
