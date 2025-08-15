import { useStoreConfig } from '@/stores/useStoreConfig';

export const formatMoney = (amount: number) => {
	const currency = useStoreConfig.getState().currency ?? 'USD';
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency,
		minimumFractionDigits: 2,
	}).format(amount / 100); // assuming smallest unit
};
