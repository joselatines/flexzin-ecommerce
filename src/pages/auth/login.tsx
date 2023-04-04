import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import {
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	Heading,
	Input,
	InputGroup,
	Stack,
	Link,
} from '@chakra-ui/react';
import PasswordInput from '@/components/Forms/PasswordInput';
import { useCustomToast } from '@/lib/hooks/useCustomToast';

function LoginPage() {
	const [inputs, setInputs] = useState({ email: '', password: '' });

	const showToast = useCustomToast();
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (inputs.email.length < 8 || inputs.password.length < 8) {
			showToast({
				title: 'Error',
				description: 'La contraseña y el correo deben superar los 8 caracteres',
				status: 'error',
			});

			return;
		}

		const request = inputs;

		try {
			const response = await axios.post('/api/auth/login', request);

			if (response.status === 200 && !response.data.error) {
				showToast({
					title: 'Éxito',
					description: 'Enviado con éxito',
					status: 'success',
				});

				router.push('/');
				return response.data.data;
			}

			throw new Error(response.data.msg);
		} catch (error) {
			// Handle error
			console.error(error);
			showToast({
				title: error?.response?.data?.error || 'Orden NO enviada',
				description: error?.response?.data?.msg || error?.message,
				status: 'error',
			});
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputs(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<Flex
			flexDirection='column'
			width='100wh'
			height='100vh'
			backgroundColor='gray.200'
			justifyContent='center'
			alignItems='center'
		>
			<Stack
				flexDir='column'
				mb='2'
				justifyContent='center'
				alignItems='center'
			>
				<Avatar bg='teal.500' />
				<Heading color='teal.400'>Welcome</Heading>
				<Box minW={{ base: '90%', md: '468px' }}>
					<form>
						<Stack
							spacing={4}
							p='1rem'
							backgroundColor='whiteAlpha.900'
							boxShadow='md'
						>
							<FormControl>
								<InputGroup>
									<Input
										onChange={handleInputChange}
										value={inputs.email}
										placeholder='example@email.com'
										type='email'
										name='email'
										required
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<PasswordInput
										handleChange={handleInputChange}
										value={inputs.password}
									/>
								</InputGroup>
								<FormHelperText textAlign='right'>
									<Link href='/auth/forgotten-password'>
										Olvidaste la contraseña?
									</Link>
								</FormHelperText>
							</FormControl>
							<Button
								borderRadius={0}
								type='submit'
								variant='solid'
								colorScheme='teal'
								width='full'
								onClick={handleSubmit}
							>
								Login
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
			<Box>
				Eres nuevo por aquí?{' '}
				<Link color='teal.500'>
					<Link href='/auth/sign-up'>Registrar</Link>
				</Link>
			</Box>
		</Flex>
	);
}

export default LoginPage;
