import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const DangerZone = () => {
	return (
		<section>
			<Card className="border-red-500 text-left">
				<CardHeader className="w-full">
					<CardTitle className="font-medium">
						Deleting this store will also remove its data.
					</CardTitle>
					<CardDescription>
						Make sure you have made a backup of your datas if you want to keep
						your data
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button size="sm" variant="destructive">
						Delete Store
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default DangerZone;
