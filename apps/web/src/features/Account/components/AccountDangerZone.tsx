import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Loader, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { deleteAccountData } from '../services';

const AccountDangerZone = () => {
	const navigate = useNavigate();
	const { logOut } = useAuth();

	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteAccount = () => {
		try {
			setIsDeleting(true);
			deleteAccountData();
			logOut();
			toast.success('Account deleted successfully');
			navigate('/store');
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete account');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<section className="mt-10 flex w-full flex-col items-start">
			<section className="flex w-full flex-col items-start gap-2">
				<Label className="text-lg font-medium">Danger zone </Label>
				<p className="text-muted-foreground text-left text-sm">
					Irreversible and destructive actions
				</p>
			</section>
			<Card className="mt-6 w-full text-left">
				<CardHeader className="w-full">
					<CardTitle className="text-lg font-medium">Deleting User</CardTitle>
					<Separator />
					<CardDescription>
						Make sure you have made a backup of your datas if you want to keep
						your data
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button size="sm" variant="destructive" disabled={isDeleting}>
								{isDeleting ? (
									<Loader className="ml-2 h-4 w-4 animate-spin" />
								) : (
									<Trash2 className="mr-2 h-4 w-4" />
								)}
								{isDeleting ? 'Deleting...' : 'Delete User'}
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									This action cannot be undone
								</AlertDialogTitle>
								<AlertDialogDescription>
									Your account permanently deleted after 30 days. And In between
									You want to retrieve you account then you can contact to our
									support team.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="mt-4">
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									className="bg-red-500 hover:bg-red-600"
									onClick={() => handleDeleteAccount()}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardFooter>
			</Card>
		</section>
	);
};

export default AccountDangerZone;
