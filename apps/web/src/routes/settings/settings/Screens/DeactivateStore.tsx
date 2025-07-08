import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const DeactivateStore = () => {
	return (
		<Card className="border-red-500 text-left">
			<CardHeader className="w-full">
				<CardTitle className="font-medium">Deactivate Store</CardTitle>
				<CardDescription>
					Deactivating this store will also remove its data.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button size="sm" variant="destructive">
					Deactivate Store
				</Button>
			</CardFooter>
		</Card>
	);
};

export default DeactivateStore;
