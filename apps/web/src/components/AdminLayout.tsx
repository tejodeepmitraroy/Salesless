import React, { useState } from 'react';

import Sidebar from '@/components/layouts/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { Bell } from 'lucide-react';
import { Link, useParams } from 'react-router';
import ChatButton from './ChatButton';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

	const mainVariants = {
		expanded: {
			marginLeft: '18rem',
			transition: {
				type: 'spring',
				stiffness: 200,
				damping: 30,
			},
		},
		collapsed: {
			marginLeft: '6.5rem',
			transition: {
				type: 'spring',
				stiffness: 200,
				damping: 30,
			},
		},
	};

	const contentVariants = {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeInOut' },
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.2, ease: 'easeInOut' },
		},
	};

	const pageVariants = {
		initial: { opacity: 0, x: -10 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: 10 },
	};

	const pageTransition = {
		type: 'tween',
		ease: 'easeInOut',
		duration: 0.3,
	};
	const { storeId } = useParams<{ storeId: string }>();
	return (
		<section className="bg-background text-foreground flex min-h-screen w-full">
			<Sidebar
				sidebarOpen={sidebarOpen}
				toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
			/>
			<ChatButton />

			<AnimatePresence mode="wait">
				<motion.main
					key={sidebarOpen ? 'expanded' : 'collapsed'}
					variants={mainVariants}
					initial={false}
					animate={sidebarOpen ? 'expanded' : 'collapsed'}
					// className={`relative h-[calc(100vh-4rem)] w-full flex-1 overflow-y-auto p-4 transition-all duration-300 md:p-6 md:pt-4`}
					className={`relative min-h-dvh w-full flex-1 bg-white transition-all duration-300`}
				>
					<section className="w-full border-b py-2">
						<section className="mx-auto flex w-full items-center justify-end gap-5 px-10">
							<Link
								to={`/store/${storeId}/notifications`}
								className="flex h-9 w-9 items-center justify-center rounded-lg border"
							>
								<Bell className="h-5 w-5" />
							</Link>

							<div className="flex items-center gap-2">
								<Avatar className="h-9 w-9 rounded-lg border">
									<AvatarImage src="https://github.com/shadcn.png" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<Label className="text-sm font-medium">John Doe</Label>
							</div>
						</section>
					</section>

					<motion.div
						initial="initial"
						animate="animate"
						exit="exit"
						variants={contentVariants}
						className="mx-auto h-full w-full overflow-y-auto p-4 md:p-6 md:pt-4"
					>
						<AnimatePresence mode="wait">
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={pageVariants}
								transition={pageTransition}
							>
								{children}
							</motion.div>
						</AnimatePresence>
					</motion.div>
				</motion.main>
			</AnimatePresence>
		</section>
	);
};

export default AdminLayout;
