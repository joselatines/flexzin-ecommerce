import { useCart } from '@/lib/context/CartContext';
import { IconButton, Icon, LightMode } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

const FavoriteButton = ({ handleClick, isInCart, ...props }: any) => {
	// todo solve this issue
	/* Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. */

	return (
		<LightMode>
			<IconButton
				isRound
				bg='white'
				color='gray.900'
				size='sm'
				_hover={{ transform: 'scale(1.1)' }}
				sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
				transition='all 0.15s ease'
				icon={
					<Icon
						as={FiHeart}
						fill={isInCart ? 'red' : ''}
						transition='all 0.15s ease'
					/>
				}
				boxShadow='base'
				onClick={handleClick}
				{...props}
			/>
		</LightMode>
	);
};

export default FavoriteButton;
