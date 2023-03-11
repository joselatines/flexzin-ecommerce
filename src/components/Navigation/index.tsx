import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	IconButton,
	useBreakpointValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

function Navigation() {
	const isDesktop = useBreakpointValue({ base: false, lg: true });
	return (
		<Box as='nav' pb={{ base: '12', md: '24' }}>
			<Box bg='bg-surface' boxShadow='sm'>
				<Container py={{ base: '4', lg: '5' }}>
					<HStack spacing='10' justify='space-between'>
						<h1>Flexzin</h1>
						{isDesktop ? (
							<Flex justify='space-between' flex='1'>
								<ButtonGroup variant='link' spacing='8'>
									{['Product', 'Pricing', 'Resources', 'Support'].map(item => (
										<Button key={item}>{item}</Button>
									))}
								</ButtonGroup>
								<HStack spacing='3'>
									<Button variant='ghost'><a href="/cart">Carrito</a> </Button>
									<Button variant='primary'>Sign up</Button>
								</HStack>
							</Flex>
						) : (
							<IconButton
								variant='ghost'
								icon={<FiMenu fontSize='1.25rem' />}
								aria-label='Open Menu'
							/>
						)}
					</HStack>
				</Container>
			</Box>
		</Box>
	);
}

export default Navigation;
