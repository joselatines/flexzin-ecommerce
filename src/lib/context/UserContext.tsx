import { IProduct } from '@/database/models/Product';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';

type Product = IProduct;

interface UserContextValue {
	user: any;
	getUser: () => void;
	logout: () => void;
	login: (user: object) => void;
}

const UserContext = createContext<UserContextValue>({
	user: {},
	getUser: () => {},
	logout: () => {},
	login: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any>({});

	const getUser = () => {
		return user;
	};

	const logout = async () => {
		return await axios.get(`/api/auth/logout`);
	};

	const login = () => {};

	const contextValue: UserContextValue = {
		user,
		logout,
		getUser,
		login,
	};

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};
