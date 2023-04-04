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
import { useState } from 'react';

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
			<option value='5'>5</option>
			<option value='6'>6</option>
			<option value='7'>7</option>
			<option value='8'>8</option>
			<option value='9'>9</option>
		</Select>
	);
};

function CartItem({ product, handleAdd, handleDelete }: any) {
	const { title, description, qty, images, currency, salePrice } = product;

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
						handleAdd(product, +e.currentTarget.value);
					}}
				/>
				<PriceTag price={salePrice * qty} currency={currency} />
				<CloseButton
					aria-label={`Delete ${title} from cart`}
					onClick={() => handleDelete(product._id)}
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
				<CloseButton
					aria-label={`Delete ${title} from cart`}
					onClick={() => handleDelete(product._id)}
				/>
				<QuantitySelect
					value={qty}
					onChange={e => {
						handleAdd(product, +e.currentTarget.value);
					}}
				/>
				<PriceTag price={salePrice * qty} currency={currency} />
			</Flex>
		</Flex>
	);
}

export default CartItem;
