import NextLink from 'next/link';
import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import SessionManager from '../SessionManager';

interface ILink {
	content: string;
	href: string;
}

interface IProps {
	links: ILink[];
	isOpen: boolean;
}

function MenuLinks({ links, isOpen }: IProps) {
	return (
		<Box
			display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
			flexBasis={{ base: '100%', md: 'auto' }}
		>
			<Stack
				spacing={8}
				align='center'
				justify={['center', 'space-between', 'flex-end', 'flex-end']}
				direction={['column', 'row', 'row', 'row']}
				pt={[4, 4, 0, 0]}
				bg={['white', 'inherit']}
				width={['100vw', 'auto']}
				left={['0', 'auto']}
				position={['fixed', 'static']}
				zIndex={'9'}
				top={['0', 'auto']}
			>
				{links.map(link => (
					<NextLink href={link.href} key={link.href}>
						<Text display='block'>{link.content}</Text>
					</NextLink>
				))}
				{/* <SessionManager /> */}
			</Stack>
		</Box>
	);
}

export default MenuLinks;
