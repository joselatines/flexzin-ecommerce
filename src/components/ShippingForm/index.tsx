import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useRouter } from 'next/router';


export default function ShippingForm() {
	const showToast = useCustomToast();
	const router = useRouter();
	const [payment, setPayment] = useState('efectivo');

	type formValues = {
		fullName: string;
		city: string;
		parish: string;
		phoneNumber: string;
		email: string;
		paymentMethod: string;
	};

	const sendEmail = (
		userFullName: string,
		userEmail: string,
		message: string
	) => {
		const templateParams = {
			from_name: userFullName,
			reply_to: userEmail,
			message_html: message,
		};

		emailjs
			.send(
				'service_8gpefgi',
				'template_zmcgusl',
				templateParams,
				'jehC29-_LeK6wUf5s9ge7'
			)
			.then(
				result => {
					console.log(result.text);
				},
				error => {
					console.log(error.text);
				}
			);
	};
	const createOrder = async (order: any) => {
		await sendEmail(order.fullName, order.email, 'holi bb');
	};

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

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async values => {
			// Handle form submission
			await createOrder({ ...values, paymentMethod: payment });

			showToast({
				title: 'Order Submitted!',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			// router.push('/');
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

			<Button
				disabled={!formik.isValid || !formik.dirty || !formik.isSubmitting}
				type='submit'
			>
				Submit
			</Button>
		</form>
	);
}
