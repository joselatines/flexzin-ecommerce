import NextLink from 'next/link';
import { Box, Text } from '@chakra-ui/react';

function Footer() {
	return (
		<Box as='footer' py={4}>
			<Text textAlign='center' fontSize='sm'>
				Hecho por{' '}
				<NextLink href='https://joselatines.vercel.app' target='_blank'>
					Jose Latines
				</NextLink>
			</Text>
		</Box>
	);
}

export default Footer;
