import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { logoutService } from '@/features/Auth/services';

const Unauthorized = () => {
	const { user } = useAuth();

	const handleLogout = () => {
		logoutService();
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
				<ShieldAlert className="mx-auto mb-4 h-16 w-16 text-red-500" />

				<h1 className="mb-2 text-2xl font-bold text-gray-900">Access Denied</h1>

				<p className="mb-6 text-gray-600">
					{user
						? `Sorry, your account (${user.role}) doesn't have permission to access this page.`
						: 'You need to be logged in to access this page.'}
				</p>

				<div className="flex flex-col space-y-2">
					<Button asChild variant="default">
						<Link to="/" className="flex items-center justify-center">
							<Home className="mr-2 h-4 w-4" />
							Go to Homepage
						</Link>
					</Button>

					<Button asChild variant="outline">
						<Link to="/login" className="flex items-center justify-center">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Login
						</Link>
					</Button>

					{user && (
						<Button
							variant="ghost"
							onClick={() => handleLogout()}
							className="text-red-500 hover:bg-red-50 hover:text-red-700"
						>
							Logout
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Unauthorized;
