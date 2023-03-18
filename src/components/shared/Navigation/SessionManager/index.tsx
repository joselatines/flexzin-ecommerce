import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCustomToast } from '@/lib/hooks/useCustomToast';

function SessionManager() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const API_URI = process.env.NEXT_PUBLIC_API_URI;
	const showToast = useCustomToast();
	const router = useRouter();

	function handleLogin() {
		// perform login logic here, such as checking user credentials
		setIsLoggedIn(true);
	}

	const handleLogout = async () => {
		// perform logout logic here, such as clearing user session data
		setIsLoggedIn(false);
		try {
			const response = await axios.get(`${API_URI}/auth/logout`);

			if (response.status !== 200)
				showToast({
					title: 'Aplicación crash',
					description: 'Algo inesperado ocurrió!',
					status: 'error',
				});
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

	function handleSignup() {
		// perform signup logic here, such as creating a new user account
		setIsLoggedIn(true);
	}

	return (
		<>
			{true ? (
				<Button onClick={handleLogout} variant='primary'>
					Log out
				</Button>
			) : (
				<>
					<Button onClick={handleSignup} variant='primary'>
						Sign up
					</Button>
					<Button onClick={handleLogin} variant='primary'>
						Log in
					</Button>
				</>
			)}
		</>
	);
}

export default SessionManager;
