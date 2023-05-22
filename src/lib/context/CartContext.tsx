import { IProduct } from '@/database/models/Product';
import { createContext, useContext, useState } from 'react';

type Product = IProduct;

interface CartContextValue {
	products: Product[];
	addToCart: (product: Product, newQuantity?: number) => void;
	removeFromCart: (productId: string) => void;
	emptyCart: () => void;
	getProducts: () => Product[];
	getLengthProducts: () => number;
}

const CartContext = createContext<CartContextValue>({
	products: [],
	addToCart: () => {},
	removeFromCart: (id: string) => {},
	emptyCart: () => {},
	getProducts: () => [],
	getLengthProducts: () => 0,
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
		if (existingProduct && newQuantity) {
			console;
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
		// Product in cart with quantity = 1 - remove it from the list
		const newProducts = products.filter(
			p => p._id.toString() !== productId.toString()
		);
		setProducts(newProducts);
		localStorage.setItem('products', JSON.stringify(newProducts));
	};

	const emptyCart = () => {
		setProducts([]);
		localStorage.removeItem('products');
	};

	const getLengthProducts = () => {
		const totalProducts = products.reduce((accumulator, product) => {
			return accumulator + product.qty;
		}, 0);

		return totalProducts;
	};

	const contextValue: CartContextValue = {
		products,
		addToCart,
		removeFromCart,
		emptyCart,
		getProducts,
		getLengthProducts,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
};
