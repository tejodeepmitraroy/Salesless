import { useState } from 'react';

interface useSearchFilterHookProps {
	data: any[];
}

const useSearchFilterHook = ({ data }: useSearchFilterHookProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');

	// Filter products based on search query and tab
	const filteredData = () => {
		return data.filter((item) => {
			return (
				item.billingAddressName
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				item.shippingAddressName
					.toLowerCase()
					.includes(categoryFilter.toLowerCase())
				// && item.status.toLowerCase().includes(statusFilter.toLowerCase())
			);
		});
		// return data;
	};
	return {
		filteredData,
		searchTerm,
		setSearchTerm,
		categoryFilter,
		setCategoryFilter,
	};
};

export default useSearchFilterHook;
