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
	Heading,
	Input,
	InputGroup,
	Stack,
	Link,
} from '@chakra-ui/react';
import PasswordInput from '@/components/Forms/PasswordInput';
import { useCustomToast } from '@/lib/hooks/useCustomToast';

function SignUpPage() {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		username: '',
	});

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
			const response = await axios.post('/api/auth/signup', request);

			if (response.status !== 201) {
				throw new Error('Something went wrong');
			}

			showToast({
				title: 'Éxito',
				description: 'Registro exitoso',
				status: 'success',
			});

			router.push('/auth/login');
			return response.data;
		} catch (error) {
			// Handle error
			console.error({ error });
			if (error.response.status === 401) {
				showToast({
					title: 'Orden NO enviada',
					description: 'Correo, contraseña o username invalido',
					status: 'error',
				});
				return;
			} else if (error.response.status === 302) {
				showToast({
					title: 'Duplicado',
					description: 'Correo existente, por favor ve a login',
					status: 'info',
				});
				return;
			}

			showToast({
				title: 'Orden NO enviada',
				description: error.message,
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
				<Heading color='teal.400'>Bienvenido</Heading>
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
										placeholder='ejemplo@email.com'
										type='email'
										name='email'
										required
									/>
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<Input
										onChange={handleInputChange}
										value={inputs.username}
										placeholder='Juanito_hd'
										type='text'
										name='username'
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
							</FormControl>
							<Button
								borderRadius={0}
								type='submit'
								variant='solid'
								colorScheme='teal'
								width='full'
								onClick={handleSubmit}
							>
								Registrar
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
			<Box>
				Ya tienes cuenta?{' '}
				<Link color='teal.500'>
					<NextLink href='/auth/login'>Login</NextLink>
				</Link>
			</Box>
		</Flex>
	);
}

export default SignUpPage;
