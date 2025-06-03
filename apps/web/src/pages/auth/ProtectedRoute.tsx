import { Navigate, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/context/AuthContext';
// import Cookies from 'js-cookie';
interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuth();
	// const storeId = Cookies.get('storeId');
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

	// Render children if authenticated and authorized
	return <>{children}</>;
};

export default ProtectedRoute;
