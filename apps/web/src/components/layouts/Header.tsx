import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router';

// import { ThemeModeToggle } from '@/components/ThemeModeToggle';
import { motion } from 'framer-motion';
import UserProfileDropdown from '../UserProfileDropdown';

// interface HeaderProps {
// 	sidebarOpen: boolean;
// 	toggleSidebar: () => void;
// }

const Header = () => {
	const storeId = useParams<{ storeId: string }>().storeId;
	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4 }}
			className="bg-vsphere-dark sticky top-0 z-20 flex items-center justify-between px-4 py-2 text-white shadow-sm md:px-6 md:py-2"
		>
			<div className="flex items-center gap-5">
				{/* <Button
					variant="ghost"
					size="icon"
					onClick={toggleSidebar}
					className="mr-2 md:mr-4"
				>
					{sidebarOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</Button> */}
				<Link to={`/store/${storeId}`} className="flex items-center gap-4">
					<img src="/icons/logo.png" alt="" className="h-8 w-8 rounded-lg" />
					<span className="flex items-center gap-2 text-lg font-bold text-white md:text-xl">
						Salesless
					</span>
				</Link>
			</div>
			<div className="flex items-center gap-2">
				{/* <ThemeModeToggle /> */}
				<Link to={`/store/${storeId}/notifications`}>
					<Button
						variant="ghost"
						size="icon"
						className="hover:bg-primary relative"
					>
						<Bell className="h-5 w-5 text-white" />
						<span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
					</Button>
				</Link>
				<UserProfileDropdown />
			</div>
		</motion.header>
	);
};

export default Header;
