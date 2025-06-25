import React from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarItemProps {
	icon: React.ElementType;
	label: string;
	href: string;
	collapsed?: boolean;
	subLinks?: {
		icon: React.ElementType;
		label: string;
		href: string;
		active?: boolean;
		collapsed?: boolean;
	}[];
}

const itemVariants = {
	open: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
		},
	},
	closed: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.2,
		},
	},
};

// const iconVariants = {
// 	open: { rotate: 0 },
// 	closed: { rotate: 0 },
// };

const SidebarItem: React.FC<SidebarItemProps> = ({
	icon: Icon,
	label,
	href,
	collapsed = false,
	subLinks,
}) => {
	const location = useLocation();
	const { storeId } = useParams<{ storeId: string }>();
	const isActive = location.pathname === `/store/${storeId}${href}`;

	const isSubVisible =
		!collapsed && location.pathname.startsWith(`/store/${storeId}${href}`);

	console.log(location.pathname, isActive);
	return (
		<motion.div variants={itemVariants}>
			<motion.div
				whileHover={{
					scale: 1.05,
					transition: { duration: 0.2 },
				}}
				whileTap={{ scale: 0.95 }}
			>
				<Link
					to={`/store/${storeId}${href}`}
					className={cn(
						'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
						isActive
							? 'bg-primary text-background'
							: 'hover:text-primary text-gray-700 hover:bg-gray-100'
					)}
				>
					<motion.div>
						<Icon
							className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-background' : 'text-[#888888]'}`}
						/>
					</motion.div>

					{!collapsed && (
						<motion.span
							className="ml-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.2 }}
						>
							{label}
						</motion.span>
					)}

					{isActive && !collapsed && (
						<motion.div
							className="ml-auto"
							initial={{ opacity: 0, x: -5 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.2 }}
						>
							<ChevronRight className="h-4 w-4" />
						</motion.div>
					)}
				</Link>
			</motion.div>

			{isSubVisible &&
				subLinks?.map((subLink) => (
					<motion.div
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.2 },
						}}
						whileTap={{ scale: 0.95 }}
					>
						<Link
							to={`/store/${storeId}${href}${subLink.href}`}
							className={cn(
								'my-2 ml-5 flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
								`/store/${storeId}${href}${subLink.href}` === location.pathname
									? 'bg-primary text-background'
									: 'hover:text-primary text-gray-700 hover:bg-gray-100'
							)}
						>
							<motion.div
							// variants={iconVariants}
							// animate={collapsed ? 'closed' : 'open'}
							>
								{
									<subLink.icon
										className={`h-5 w-5 flex-shrink-0 ${`/store/${storeId}${href}${subLink.href}` === location.pathname ? 'text-background' : 'text-[#888888]'}`}
									/>
								}
								{/* <Icon className="h-5 w-5 flex-shrink-0" /> */}
							</motion.div>

							{!collapsed && (
								<motion.span
									className="ml-2"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.1, duration: 0.2 }}
								>
									{subLink.label}
								</motion.span>
							)}

							{`/store/${storeId}${href}${subLink.href}` ===
								location.pathname &&
								!collapsed && (
									<motion.div
										className="ml-auto"
										initial={{ opacity: 0, x: -5 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2, duration: 0.2 }}
									>
										<ChevronRight className="h-4 w-4" />
									</motion.div>
								)}
						</Link>
					</motion.div>
				))}
		</motion.div>
	);
};

export default SidebarItem;
