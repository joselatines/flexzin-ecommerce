import { IProduct } from '@/database/models/Product';
import { useCart } from '@/lib/context/CartContext';
import {
	AspectRatio,
	Box,
	Button,
	HStack,
	Image,
	Link,
	Skeleton,
	Stack,
	StackProps,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import PriceTag from './PriceTag';
import Rating from './Rating';

interface IProps {
	product: IProduct;
}

function ProductCard({ product }: IProps) {
	const { title, images, price, salePrice, rating, currency, reviewsCount } =
		product;

	return (
		<>
			<Stack spacing={{ base: '4', md: '5' }}>
				<Box position='relative'>
					<AspectRatio ratio={4 / 3}>
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
						product={product}
						aria-label={`Add ${title} to your favourites`}
					/>
				</Box>
				<Stack>
					<Stack spacing='1'>
						<Text
							fontWeight='medium'
							color={useColorModeValue('gray.700', 'gray.400')}
						>
							{title}
						</Text>
						<PriceTag price={price} salePrice={salePrice} currency={currency} />
					</Stack>
					<HStack>
						<Rating defaultValue={rating} size='sm' />
						<Text
							fontSize='sm'
							color={useColorModeValue('gray.600', 'gray.400')}
						>
							{reviewsCount}
						</Text>
					</HStack>
				</Stack>
			</Stack>
		</>
	);
}
export default ProductCard;
