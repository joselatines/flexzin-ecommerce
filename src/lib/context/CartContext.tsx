import { IProduct } from '@/database/models/Product';
import { createContext, useContext, useState } from 'react';

type Product = IProduct;

interface CartContextValue {
	products: Product[];
	addToCart: (product: Product, newQuantity?: number) => void;
	removeFromCart: (productId: string) => void;
	emptyCart: () => void;
	getProducts: () => Product[];
}

const CartContext = createContext<CartContextValue>({
	products: [],
	addToCart: () => {},
	removeFromCart: (id: string) => {},
	emptyCart: () => {},
	getProducts: () => [],
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([]);

	const getProducts = () => {
		const storedProducts = localStorage.getItem('products');

		const productsExits = storedProducts ? JSON.parse(storedProducts) : [];

		setProducts(productsExits);
		return productsExits;
	};

	const addToCart = (product: Product, newQuantity?: number) => {
		// If there is an existing product but no new quantity provided, increment the existing product's quantity by 1
		const existingProductIndex = products.findIndex(p => p._id === product._id);

		// Get the existing product from the cart, if it exists
		const existingProduct =
			existingProductIndex !== -1 ? products[existingProductIndex] : undefined;

		let updatedProducts;
		if (existingProduct && newQuantity !== undefined) {
			updatedProducts = [...products];
			updatedProducts[existingProductIndex] = {
				...existingProduct,
				qty: newQuantity,
			};
		} else if (existingProduct) {
			// If there is an existing product but no new quantity provided, increment the existing product's quantity by 1
			updatedProducts = [...products];
			updatedProducts[existingProductIndex] = {
				...existingProduct,
				qty: existingProduct.qty + 1,
			};
		} else {
			// If there is no existing product, add the new product with a quantity of 1 to the cart
			updatedProducts = [...products, { ...product, qty: 1 }];
		}

		setProducts(updatedProducts);
		localStorage.setItem('products', JSON.stringify(updatedProducts));
	};

	const removeFromCart = (productId: string) => {
		const existingProduct = products.find(
			p => p._id.toString() === productId.toString()
		);

		if (existingProduct) {
			// Product in cart with quantity > 1 - just decrease the qty
			if (existingProduct.qty > 1) {
				const updatedProducts = products.map(p =>
					p._id.toString() === productId.toString()
						? { ...p, qty: p.qty - 1 }
						: p
				);
				setProducts(updatedProducts);
				localStorage.setItem('products', JSON.stringify(updatedProducts));
			} else {
				// Product in cart with quantity = 1 - remove it from the list
				const newProducts = products.filter(
					p => p._id.toString() !== productId.toString()
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
		getProducts,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
