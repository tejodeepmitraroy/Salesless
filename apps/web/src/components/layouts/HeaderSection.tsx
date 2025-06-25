import { FC } from 'react';

interface HeaderProps {
	icon?: React.ReactNode;
	title: string;
	description?: string;
	children?: React.ReactNode;
}
const HeaderSection: FC<HeaderProps> = ({
	// icon,
	title,
	//  description,
	children,
}) => {
	// const { storeId } = useParams<{ storeId: string }>();
	return (
		<header className="sticky top-0 z-20 flex w-full items-start justify-between pt-4">
			<div className="mb-4 flex flex-col items-start">
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-black">
					{/* {icon} */}
					{title}
				</h1>
				{/* <p className="text-muted-foreground">{description}</p> */}
			</div>
			<div className="flex items-center gap-2">
				{children}

				{/* <UserProfileDropdown /> */}
			</div>
		</header>
	);
};

export default HeaderSection;
