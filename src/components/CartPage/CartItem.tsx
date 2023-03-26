import {
	CloseButton,
	Flex,
	Link,
	Select,
	SelectProps,
	useColorModeValue,
} from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import { IProduct } from '@/database/models/Product';
import { useCart } from '@/lib/context/CartContext';

type CartItemProps = {
	isGiftWrapping?: boolean;
	title: string;
	description: string;
	qty: number;
	price: number;
	currency: string;
	images: string;
	onChangeQuantity?: (qty: number) => void;
	onClickGiftWrapping?: () => void;
	onClickDelete?: () => void;
};

const QuantitySelect = (product: SelectProps) => {
	return (
		<Select
			maxW='64px'
			aria-label='Select qty'
			focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
			{...product}
		>
			<option value='1'>1</option>
			<option value='2'>2</option>
			<option value='3'>3</option>
			<option value='4'>4</option>
		</Select>
	);
};

function CartItem(product: any) {
	const {
		title,
		description,
		qty,
		images,
		currency,
		price,
		onChangeQuantity,
		onClickDelete,
	} = product;

	const { addToCart } = useCart();

	const handleAddMoreProducts = (quantity: number) => {
		console.log({ qty: quantity, ...product });
		addToCart({ qty: quantity, ...product });
	};

	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			justify='space-between'
			align='center'
		>
			<CartProductMeta
				name={title}
				description={description}
				image={images[0]}
			/>

			{/* Desktop */}
			<Flex
				width='full'
				justify='space-between'
				display={{ base: 'none', md: 'flex' }}
			>
				<QuantitySelect
					value={qty}
					onChange={e => {
						handleAddMoreProducts(+e.currentTarget.value);
					}}
				/>
				<PriceTag price={price} currency={currency} />
				<CloseButton
					aria-label={`Delete ${title} from cart`}
					onClick={onClickDelete}
				/>
			</Flex>

			{/* Mobile */}
			<Flex
				mt='4'
				align='center'
				width='full'
				justify='space-between'
				display={{ base: 'flex', md: 'none' }}
			>
				<Link fontSize='sm' textDecor='underline'>
					Delete
				</Link>
				<QuantitySelect
					value={qty}
					onChange={e => {
						handleAddMoreProducts(+e.currentTarget.value);
					}}
				/>
				<PriceTag price={price} currency={currency} />
			</Flex>
		</Flex>
	);
}

export default CartItem;
