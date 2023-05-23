import NextLink from 'next/link';
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
	const [isLoading, setIsLoading] = useState(false);
	const showToast = useCustomToast();
	const router = useRouter();
const APP_URI = process.env.NEXT_PUBLIC_APP_URI;


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
			setIsLoading(true);
			const response = await axios.post(`${APP_URI}/api/auth/login`, request);

			if (response.status === 200 && !response.data.error) {
				showToast({
					title: 'Éxito',
					description: 'Enviado con éxito',
					status: 'success',
				});

				router.reload(); // Reload the current page
				router.push('/'); // Navigate to the home page
				return response.data.data;
			}

			throw new Error(response.data.msg);
		} catch (error) {
			// Handle error
			console.error(error);
			showToast({
				title: 'Orden NO enviada',
				description: error?.response?.data?.msg || error?.message,
				status: 'error',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputs(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<Flex
			flexDirection='column'
			height='auto'
			justifyContent='center'
			alignItems='center'
		>
			<Stack
				flexDir='column'
				mb='2'
				justifyContent='center'
				alignItems='center'
			>
				<Avatar bg='blue.500' />
				<Heading color='blue.400'>Welcome</Heading>
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
									<NextLink href='/auth/forgotten-password'>
										Olvidaste la contraseña?
									</NextLink>
								</FormHelperText>
							</FormControl>
							<Button
								borderRadius={0}
								type='submit'
								variant='solid'
								colorScheme='blue'
								width='full'
								onClick={handleSubmit}
								isLoading={isLoading}
							>
								Iniciar sesión
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
			<Box>
				Eres nuevo por aquí?{' '}
				<Link color='blue.500' href='/auth/sign-up'>
					Registrar
				</Link>
			</Box>
		</Flex>
	);
}

export default LoginPage;
