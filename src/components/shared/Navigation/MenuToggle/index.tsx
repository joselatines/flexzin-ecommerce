import { Box, IconButton } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

interface IProps {
	toggle: () => void;
	isOpen: boolean;
}

function MenuToggle({ toggle, isOpen }: IProps) {
	return (
		<Box zIndex='10' position={['fixed', 'static']} right='10'>
			<IconButton
				variant='ghost'
				icon={
					isOpen ? (
						<AiOutlineClose fontSize='1.25rem' />
					) : (
						<FiMenu fontSize='1.25rem' />
					)
				}
				aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
				onClick={toggle}
			/>
		</Box>
	);
}

export default MenuToggle;
