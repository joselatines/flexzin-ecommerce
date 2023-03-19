import { IProduct } from '@/database/models/Product';
import { createContext, useContext, useState } from 'react';

type Product = IProduct;

interface CartContextValue {
	products: Product[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	emptyCart: () => void;
}

const CartContext = createContext<CartContextValue>({
	products: [],
	addToCart: () => {},
	removeFromCart: () => {},
	emptyCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<Product[]>(() => {
		const storedProducts = localStorage.getItem('products');
		return storedProducts ? JSON.parse(storedProducts) : [];
	});

	const addToCart = (product: Product) => {
		const existingProduct = products.find(p => p.id.toString() === product.id);

		if (existingProduct) {
			const updatedProducts = products.map(p => {
				if (p.id.toString() === product.id) {
					return { ...p, qty: p.qty + 1 };
				}

				return p;
			});

			setProducts(updatedProducts);
			localStorage.setItem('products', JSON.stringify(updatedProducts));
		} else {
			const newProducts = [...products, { ...product, qty: 1 }];

			setProducts(newProducts);
			localStorage.setItem('products', JSON.stringify(newProducts));
		}
	};

	const removeFromCart = (productId: number) => {
		const existingProduct = products.find(
			p => p.id.toString() === productId.toString()
		);

		if (existingProduct) {
			// Product in cart with quantity > 1 - just decrease the qty
			if (existingProduct.qty > 1) {
				const updatedProducts = products.map(p =>
					p.id.toString() === productId.toString()
						? { ...p, qty: p.qty - 1 }
						: p
				);
				setProducts(updatedProducts);
				localStorage.setItem('products', JSON.stringify(updatedProducts));
			} else {
				// Product in cart with quantity = 1 - remove it from the list
				const newProducts = products.filter(
					p => p.id.toString() !== productId.toString()
				);
				setProducts(newProducts);
				localStorage.setItem('products', JSON.stringify(newProducts));
			}
		}
	};

	const emptyCart = () => {
		setProducts([]);
		localStorage.removeItem('products');
	};

	const contextValue: CartContextValue = {
		products,
		addToCart,
		removeFromCart,
		emptyCart,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
