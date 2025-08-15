import { FC } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
	icon?: React.ReactNode;
	title: string;
	description?: string;
	children?: React.ReactNode;
	BackMsg?: string;
	BackLink?: string;
}
const HeaderSection: FC<HeaderProps> = ({
	// icon,
	title,
	description,
	children,
	BackMsg,
	BackLink,
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
				<div className="mb-4 flex flex-col items-start">
					<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-black">
						{/* {icon} */}
						{title}
					</h1>
					<p className="text-muted-foreground">{description}</p>
				</div>
				<div className="flex items-center gap-2">{children}</div>
			</section>
		</header>
	);
};

export default HeaderSection;
