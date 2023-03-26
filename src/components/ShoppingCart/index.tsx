import React, { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from '@/lib/context/CartContext';
import { Link } from '@chakra-ui/react';

function ShoppingCart() {
	const { getProducts } = useCart();
	const [items, setItems] = useState(0);

	useEffect(() => {
		const callLocalStorage = async () => {
			const productsLength = await getProducts().length;
			setItems(productsLength);
		};

		callLocalStorage();
	}, []);

	return (
		<Link href='/cart'>
			<span>{items}</span>
			<AiOutlineShoppingCart />
		</Link>
	);
}

export default ShoppingCart;
