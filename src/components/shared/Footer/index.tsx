import { Box, Text, Link } from '@chakra-ui/react';

function Footer() {
	return (
		<Box as='footer' py={4}>
			<Text textAlign='center' fontSize='sm'>
				Hecho por{' '}
				<Link href='https://github.com/joselatines' target='_blank'>
					Jose Latines
				</Link>
			</Text>
		</Box>
	);
}

export default Footer;
