import { useState, useEffect } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { IconButton, Icon, LightMode } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';

const FavoriteButton = ({ product, ...props }: any) => {
  const { addToCart, getProducts, removeFromCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
	// todo solve this issue
	/* Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. */
  useEffect(() => {
    const productsStored = getProducts();
    const isInLocalStorage = productsStored.some(p => p.id === product.id);

    setIsAdded(isInLocalStorage);
  }, [getProducts, product]);

  const handleClick = () => {
    if (isAdded) {
      removeFromCart(product.id);
      setIsAdded(false);
    } else {
      addToCart(product);
      setIsAdded(true);
    }
  };

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
            fill={isAdded ? 'red' : ''}
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
