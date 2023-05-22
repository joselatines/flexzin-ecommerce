import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useCustomToast } from '@/lib/hooks/useCustomToast';


function SessionManager({ handleLogout, isLoggedIn, userData }: any) {
	return (
		<>
			{isLoggedIn ? (
				<Button onClick={handleLogout}>Cerrar sesión</Button>
			) : (
				<>
					<NextLink href='/auth/sign-up'>Registrar</NextLink>
					<NextLink href='/auth/login'>Entrar</NextLink>
				</>
			)}
			<span>{userData.email}</span>
		</>
	);
}

export default SessionManager;
