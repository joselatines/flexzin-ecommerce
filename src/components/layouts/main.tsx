import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from '../shared/Footer';
import Navigation from '../shared/Navigation';

interface IProps {
	children: JSX.Element;
}

export default function MainLayout({ children }: IProps) {
	return (
		<>
			<Head>
				<title>Tienda Flexzin Oficial</title>
				<meta name='description' content='Tienda oficial de Flexzin' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Flex flexDirection='column' height='100vh' >
				{/* Navbar */}

				<Navigation />

				<Flex flexGrow={1}>
					{/* Aside 1 */}
					{/* 	<Box bg='gray.200' flexBasis='200px' p={4}>
						Aside 1
					</Box> */}

					{/* Main content */}
					<Box bg='white' as='main' flexGrow={1} p={4}>
						{children}
					</Box>
				</Flex>

				{/* Footer */}
				<Box bg='blue.500' color='white' p={4}>
					<Footer />
				</Box>
			</Flex>
		</>
	);
}
