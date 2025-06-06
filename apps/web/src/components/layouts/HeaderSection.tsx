import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router';

import UserProfileDropdown from '../UserProfileDropdown';
import { FC } from 'react';

interface HeaderProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}
const HeaderSection: FC<HeaderProps> = ({ icon, title, description }) => {
	const { storeId } = useParams<{ storeId: string }>();
	return (
		<header className="sticky top-0 z-20 flex w-full items-start justify-between pt-4">
			<div className="mb-4 flex flex-col items-start">
				<h1 className="mb-2 flex items-center gap-3 text-2xl font-bold text-black">
					{icon}
					{title}
				</h1>
				<p className="text-muted-foreground">{description}</p>
			</div>
			<div className="flex items-center gap-2">
				<Link to={`/store/${storeId}/notifications`}>
					<Button
						variant="ghost"
						size="icon"
						className="hover:bg-primary relative"
					>
						<Bell className="h-5 w-5 text-black" />
					</Button>
				</Link>
				<UserProfileDropdown />
			</div>
		</header>
	);
};

export default HeaderSection;
