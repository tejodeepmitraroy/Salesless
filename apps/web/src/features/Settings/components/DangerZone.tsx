import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { deleteStoreService } from '@/features/Settings/services';
import { Loader, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

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
		<section className="mt-10 flex flex-col gap-4">
			<section className="mt-12 flex w-full flex-col items-start">
				<h2 className="text-2xl font-bold tracking-tight">Danger Zone</h2>
			</section>
			<Card className="border-red-500 p-0 text-left">
				<CardContent className="px-0">
					<section className="flex w-full flex-col gap-4 p-4 md:flex-row">
						<section className="w-full">
							<div className="flex w-full items-center justify-between text-sm font-medium antialiased md:text-base">
								Deactivate Store
							</div>
							<div className="text-muted-foreground flex w-full items-center justify-between text-sm">
								Deactivating this store will also remove its data.
							</div>
						</section>
						<section className="flex w-full items-center justify-start md:justify-end">
							<Button size="sm" variant="destructive">
								Deactivate Store
							</Button>
						</section>
					</section>
					<Separator />
					<section className="flex w-full flex-col gap-4 p-4 md:flex-row">
						<section className="w-full">
							<div className="flex w-full items-center justify-between text-sm font-medium antialiased md:text-base">
								Deleting this store will also remove its data.
							</div>
							<div className="text-muted-foreground flex w-full items-center justify-between text-sm">
								Make sure you have made a backup of your datas if you want to
								keep your data
							</div>
						</section>
						<section className="flex w-full items-center justify-start md:justify-end">
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
						</section>
					</section>

					{/*<CardHeader className="w-full">
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
					</CardFooter> */}
				</CardContent>
			</Card>
		</section>
	);
};

export default DangerZone;
