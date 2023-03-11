import { IProduct } from '@/database/models/Product';
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
import { FavoriteButton } from './FavoriteButton';
import PriceTag from './PriceTag';
import Rating from './Rating';

interface IProps {
	product: IProduct;
}

function ProductCard({ product }: IProps) {
	const { title, images, price} = product;
	// salePrice, rating 
	return (
		<Stack spacing={{ base: '4', md: '5' }} >
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
					<PriceTag price={price} salePrice={200} currency='USD' />
				</Stack>
				<HStack>
					<Rating defaultValue={0} size='sm' />
					<Text fontSize='sm' color={useColorModeValue('gray.600', 'gray.400')}>
						12 Reviews
					</Text>
				</HStack>
			</Stack>
			<Stack align='center'>
				<Button colorScheme='blue' width='full'>
					Add to cart
				</Button>
				<Link
					textDecoration='underline'
					fontWeight='medium'
					color={useColorModeValue('gray.600', 'gray.400')}
				>
					Quick shop
				</Link>
			</Stack>
		</Stack>
	);
}
export default ProductCard;
