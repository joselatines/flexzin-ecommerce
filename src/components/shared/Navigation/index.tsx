import NextImage from 'next/image';
import { Box, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import MenuLinks from './MenuLinks';
import logo from '/public/images/logo.png';
import MenuToggle from './MenuToggle';

function Navigation() {
	const isDesktop = useBreakpointValue({ md: false, lg: true });
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const links = [
		{ href: '/', content: 'Productos' },
		{ href: '/cart', content: 'Carrito' },
	];

	return (
		<Box as='nav' py={{ base: '4', lg: '5' }} px='8'>
			<HStack spacing='10' justify='space-between'>
				<NextImage src={logo} alt='Logo Flexzin' width={100} height={100} />
				<MenuLinks links={links} isOpen={isOpen} />
				{!isDesktop && <MenuToggle toggle={toggle} isOpen={isOpen} />}
			</HStack>
		</Box>
	);
}

export default Navigation;
