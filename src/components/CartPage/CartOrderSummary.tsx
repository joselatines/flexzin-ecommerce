import { useCustomToast } from '@/lib/hooks/useCustomToast';
import {
	Button,
	Flex,
	Heading,
	Link,
	Stack,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from './PriceTag';

type OrderSummaryItemProps = {
	label: string;
	value?: string;
	children?: React.ReactNode;
};

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
	const { label, value, children } = props;
	return (
		<Flex justify='space-between' fontSize='sm'>
			<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
				{label}
			</Text>
			{value ? <Text fontWeight='medium'>{value}</Text> : children}
		</Flex>
	);
};

export const CartOrderSummary = ({ totalPrice, shippingTax = 0 }: any) => {
	const showToast = useCustomToast();

	const handleCouponCode = () => {
		showToast({
			title: 'No disponible',
			status: 'info',
			duration: 5000,
			isClosable: true,
		});
	};
	return (
		<Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' width='full'>
			<Heading size='md'>Información de orden</Heading>

			<Stack spacing='6'>
				<OrderSummaryItem label='Subtotal' value={formatPrice(totalPrice)} />
				{shippingTax && (
					<OrderSummaryItem
						label='Shipping + Tax'
						value={formatPrice(shippingTax)}
					/>
				)}

				<OrderSummaryItem label='Cupón de descuento'>
					<Button onClick={handleCouponCode}>Agregar cupón</Button>
				</OrderSummaryItem>
				<Flex justify='space-between'>
					<Text fontSize='lg' fontWeight='semibold'>
						Total
					</Text>
					<Text fontSize='xl' fontWeight='extrabold'>
						{formatPrice(totalPrice + shippingTax)}
					</Text>
				</Flex>
			</Stack>
			<Link href='/cart/checking' size='lg'>
				<Button colorScheme='blue' fontSize='md' rightIcon={<FaArrowRight />}>
					Comprar
				</Button>
			</Link>
		</Stack>
	);
};
