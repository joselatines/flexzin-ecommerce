import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import NextLink from 'next/link';
import { useCart } from '@/lib/context/CartContext';

function ShoppingCart() {
	const { getProducts } = useCart();
	const [items, setItems] = useState(0);

	useEffect(() => {
		setItems(getProducts().length);
	}, [getProducts]);

	return (
		<div>
			<NextLink href='/cart'>
				<span>{items}</span>
				<AiOutlineShoppingCart />
			</NextLink>
		</div>
	);
}

export default ShoppingCart;
