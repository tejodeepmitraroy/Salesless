import { FC } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
	icon?: React.ReactNode;
	title: string;
	description?: string;
	children?: React.ReactNode;
	BackMsg?: string;
	BackLink?: string;
	className?: string;
}
const HeaderSection: FC<HeaderProps> = ({
	// icon,
	title,
	description,
	children,
	BackMsg,
	BackLink,
	className,
}) => {
	const { storeId } = useParams<{ storeId: string }>();
	return (
		<header className="sticky top-0 z-20 flex w-full flex-col items-start justify-between pt-4">
			{BackMsg && (
				<Link to={`/store/${storeId}/${BackLink}`} className="inline-block">
					<Button variant="ghost" size="sm" className="mb-6">
						<ChevronLeft className="mr-2 h-4 w-4" />
						{BackMsg}
					</Button>
				</Link>
			)}
			<section className="flex w-full items-start justify-between">
				<div className={cn('mb-4 flex flex-col items-start')}>
					<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-black">
						{/* {icon} */}
						{title}
					</h1>
					<p className="text-muted-foreground">{description}</p>
				</div>
				<div className={cn('flex items-center gap-2', className)}>
					{children}
				</div>
			</section>
		</header>
	);
};

export default HeaderSection;
