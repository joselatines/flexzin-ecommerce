import { useEffect, useState } from 'react';
import {
	AspectRatio,
	Box,
	Image,
	Stack,
	Text,
	useColorModeValue,
	HStack,
	Skeleton,
} from '@chakra-ui/react';
import { IProduct } from '@/database/models/Product';
import { useCart } from '@/lib/context/CartContext';
import FavoriteButton from './FavoriteButton';
import PriceTag from './PriceTag';
import Rating from './Rating';

interface Props {
	product: IProduct;
}

export default function ProductCard({ product }: Props) {
	const { title, images, price, salePrice, rating, currency, reviewsCount } =
		product;

	const [isInCart, setIsInCart] = useState(false);
	const { addToCart, getProducts, removeFromCart } = useCart();

	useEffect(() => {
		const checkLocalStorage = async () => {
			const productsStored = await getProducts();
			const isInLocalStorage = productsStored.some(p => p._id === product._id);
			setIsInCart(isInLocalStorage);
		};
		checkLocalStorage();
	}, [product, getProducts]);

	const handleAddToCart = () => {
		if (isInCart) {
			removeFromCart(product._id);
			setIsInCart(false);
		} else {
			addToCart(product);
			setIsInCart(true);
		}
	};

	return (
		<Stack spacing={{ base: '10', md: '30' }} w='200px' minH='250px' margin='3'>
			<Box position='relative'>
				<AspectRatio ratio={4 / 3} minH='200px'>
					<Image
						src={images[0]}
						alt={title}
						draggable='false'
						fallback={<Skeleton />}
						borderRadius={{ base: 'md', md: 'xl' }}
					/>
				</AspectRatio>
				<FavoriteButton
					position='absolute'
					top='4'
					right='4'
					handleClick={handleAddToCart}
					isInCart={isInCart}
					aria-label={`Add ${title} to your favourites`}
				/>
			</Box>
			<Stack>
				<Stack spacing='1'>
					<span>{title}</span>
					<PriceTag price={price} salePrice={salePrice} currency={currency} />
				</Stack>
				<HStack>
					<Rating defaultValue={rating} size='sm' />
					<Text fontSize='sm' color={useColorModeValue('gray.600', 'gray.400')}>
						{reviewsCount}
					</Text>
				</HStack>
			</Stack>
		</Stack>
	);
}
