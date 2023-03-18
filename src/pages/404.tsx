import { Box, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

function NotFoundPage() {
	return (
		<Box textAlign='center' mt={20}>
			<Heading>404</Heading>
			<Text mt={4}>Sorry, the page you're looking for cannot be found.</Text>
			<Text>
				<NextLink href='/'>Go to home</NextLink>
			</Text>
		</Box>
	);
}

export default NotFoundPage;
