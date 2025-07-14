import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { deleteStoreService } from '@/features/Settings/services';
import { Loader, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { useState } from 'react';

const DangerZone = () => {
	const { storeId } = useParams<{ storeId: string }>();
	const navigate = useNavigate();

	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteStore = () => {
		try {
			setIsDeleting(true);
			deleteStoreService({ storeId: Number(storeId) });
			toast.success('Store deleted successfully');
			navigate('/store');
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete store');
		} finally {
			setIsDeleting(false);
		}
	};

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
					<Button
						onClick={() => handleDeleteStore()}
						size="sm"
						variant="destructive"
						disabled={isDeleting}
					>
						{isDeleting ? (
							<Loader className="ml-2 h-4 w-4 animate-spin" />
						) : (
							<Trash2 className="mr-2 h-4 w-4" />
						)}
						{isDeleting ? 'Deleting...' : 'Delete Store'}
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default DangerZone;
