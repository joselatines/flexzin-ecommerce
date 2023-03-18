import { useToast, UseToastOptions } from '@chakra-ui/react';

export const useCustomToast = () => {
	const toast = useToast();

	const show = (options: UseToastOptions) => {
		toast({
			position: 'top',
			duration: 3000,
			isClosable: true,
			...options,
		});
	};

	return show;
};
