import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useCustomToast } from '@/lib/hooks/useCustomToast';

const API_URI = process.env.NEXT_PUBLIC_APP_URI;
const TOKEN_NAME = process.env.TOKEN_NAME;

function SessionManager() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const showToast = useCustomToast();
	const router = useRouter();

	const handleLogin = () => {
		const tokenExists = document.cookie.includes(`${TOKEN_NAME}=`);
		setIsLoggedIn(tokenExists);
	};

	const handleLogout = async () => {
		setIsLoggedIn(false);
		try {
			const response = await axios.get(`${API_URI}/api/auth/logout`);

			if (response.status !== 200) {
				showToast({
					title: 'Aplicación crash',
					description: 'Algo inesperado ocurrió!',
					status: 'error',
				});
			}

			showToast({
				title: 'Cierre de sesión',
				description: 'Vuelve pronto!',
				status: 'success',
			});

			router.push('/');
		} catch (error) {
			showToast({
				title: 'Cierre de sesión',
				description: 'Algo salió mal!',
				status: 'error',
			});
			console.error('Logout failed:', error);
		}
	};

	const handleSignup = () => {
		const tokenExists = document.cookie.includes(`${TOKEN_NAME}=`);
		setIsLoggedIn(tokenExists);
	};

	useEffect(() => {
		if (TOKEN_NAME) {
			const tokenExists = document.cookie.includes(`${TOKEN_NAME}=`);
			setIsLoggedIn(tokenExists);

		}
	}, []);

	return (
		<>
			{isLoggedIn ? (
				<Button onClick={handleLogout} variant='primary'>
					Cerrar sesión
				</Button>
			) : (
				<>
					<Button onClick={handleSignup} variant='primary'>
						Registrar
					</Button>
					<Button onClick={handleLogin} variant='primary'>
						Entrar
					</Button>
				</>
			)}
		</>
	);
}

export default SessionManager;
