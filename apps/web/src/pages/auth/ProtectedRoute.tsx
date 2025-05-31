import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/features/users/hooks/useAuth';
import type { UserRole } from '@/features/users/hooks/useAuth';

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading, storeId } = useAuth();
	const location = useLocation();

	// Show loading state if authentication status is being determined
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
			</div>
		);
	}

	// If not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// If authenticated but no store selected, redirect to store selection
	console.log('No store selected', storeId);
	// if (isAuthenticated && !storeId) {
	//   return <Navigate to="/store" state={{ from: location }} replace />;
	// }

	// If authenticated and store is selected, redirect to store/{storeId}
	//   if (isAuthenticated && authStoreId) {
	//     return <Navigate to={`/store/${authStoreId}`} state={{ from: location }} replace />;
	//   }

	// Render children if authenticated and authorized
	return <>{children}</>;
};

export default ProtectedRoute;
