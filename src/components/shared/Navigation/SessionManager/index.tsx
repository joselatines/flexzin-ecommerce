import NextLink from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import logout from '@/lib/utils/logout';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useRouter } from 'next/router';

function SessionManager() {
	const TOKEN_NAME = process.env.TOKEN_NAME || 'fullAccessFlexzin';
	const [userData, setUserData] = useState({ email: '', username: '' });
	const showToast = useCustomToast();
	const router = useRouter();

	useEffect(() => {
		const user = Cookies.get(TOKEN_NAME);

		if (user) setUserData(JSON.parse(user.toString()));
	}, [TOKEN_NAME]);

	const handleLogout = async () => {
		const res = await logout();

		if (res.status === 200) {
			showToast({
				title: res.data.msg,
				status: 'success',
			});

			setUserData({ email: '', username: '' });
			router.push('/');
			return;
		}

		showToast({
			title: res.data.message,
			status: 'error',
		});
	};

	return (
		<Flex gap='5' textAlign='center'>
			{userData.email.length > 0 ? (
				<div>
					<span>{userData.username}</span>
					<Button marginX='5' onClick={handleLogout}>
						Cerrar sesión
					</Button>
				</div>
			) : (
				<Flex gap='5'>
					<NextLink href='/auth/login'>Entrar</NextLink>
					<NextLink href='/auth/sign-up'>Registrar</NextLink>
				</Flex>
			)}
		</Flex>
	);
}

export default SessionManager;
