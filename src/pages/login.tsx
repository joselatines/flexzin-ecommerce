import PasswordInput from '@/components/shared/Navigation/LoginForm/PasswordInput';
import { Button, Input, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

function LoginPage() {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const toast = useToast();

	const handleSubmit = async () => {
		const request = {
			email: 'probandito@gmail.com',
			password: '123adfadsf45',
		};

		try {
			const response = await axios.post('/api/auth/login', request);

			toast({
				position: 'top',
				title: 'Éxito',
				description: 'Enviado con exito',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			return response.data;
		} catch (error) {
			// Handle error
			toast({
				position: 'top',
				title: 'Orden NO enviada',
				description: 'Algo salió mal',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			console.error(error);
			throw error;
		}
	};

	return (
		<>
			Login
			<Input placeholder='Basic usage' type='email' />
			<PasswordInput setPassword={setPassword} />
			<Button onClick={handleSubmit}>Button</Button>
		</>
	);
}

export default LoginPage;
