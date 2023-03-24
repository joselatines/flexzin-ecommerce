import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import MainLayout from '@/components/layouts/main';
import { CartProvider } from '@/lib/context/CartContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<CartProvider>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</CartProvider>
		</ChakraProvider>
	);
}
