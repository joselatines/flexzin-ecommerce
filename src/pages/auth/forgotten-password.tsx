import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useRouter } from 'next/router';
import {  useState } from 'react';

function ForgottenPasswordPage() {
	const showToast = useCustomToast();
	const [email, setEmail] = useState('');
	const router = useRouter();

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async () => {
		if (email.length < 8) {
			showToast({
				title: 'Error',
				description: 'El correo debe superar los 8 caracteres',
				status: 'error',
			});
			return;
		}

		const request = { email };

		try {
			const response = await axios.post(
				'/api/auth/forgotten-password',
				request
			);

			if (response.status !== 200) {
				throw new Error('Something went wrong');
			}

			showToast({
				title: 'Éxito',
				description: 'Enviado con éxito',
				status: 'success',
			});

			router.push('/auth/change-password');
		} catch (error) {
			console.error(error);
			showToast({
				title: error?.response?.data?.error || 'Orden NO enviada',
				description: error?.response?.data?.msg || error?.message,
				status: 'error',
			});
		}
	};

	return (
		<div>
			<input type='text' value={email} onChange={handleEmailChange} />
			<Button onClick={handleSubmit}>Forgot password</Button>
		</div>
	);
}

export default ForgottenPasswordPage;
