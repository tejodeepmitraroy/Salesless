import { useState } from 'react';

interface useSearchFilterHookProps {
	data: any[];
}

const useSearchFilterHook = ({ data }: useSearchFilterHookProps) => {
	const [items] = useState<any[]>(data);
	const [searchTerm, setSearchTerm] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('all');

	// Filter products based on search query and tab
	const filteredData = () =>
		items.filter((item) => {
			return (
				item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				item.category.toLowerCase().includes(categoryFilter.toLowerCase())
				// && item.status.toLowerCase().includes(statusFilter.toLowerCase())
			);
		});

	return {
		filteredData,
		searchTerm,
		setSearchTerm,
		categoryFilter,
		setCategoryFilter,
	};
};

export default useSearchFilterHook;
