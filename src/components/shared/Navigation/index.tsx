import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, HStack, Link, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import MenuLinks from './MenuLinks';
import logo from '/public/images/logo.png';
import MenuToggle from './MenuToggle';
import ShoppingCart from '@/components/ShoppingCart';
import SessionManager from './SessionManager';

function Navigation() {
	const isDesktop = useBreakpointValue({ md: false, lg: true });
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const links = [{ href: '/', content: 'Productos' }];

	return (
		<Box as='nav' py={{ base: '4', lg: '5' }} px='8'>
			<HStack spacing='10' justify='space-between'>
				<NextLink href='/'>
					<NextImage src={logo} alt='Logo Flexzin' width={100} height={100} />
				</NextLink>
				{/* <MenuLinks links={links} isOpen={isOpen} /> */}
				{/* <SessionManager /> */}
				<ShoppingCart />
			</HStack>
		</Box>
	);
}

export default Navigation;
