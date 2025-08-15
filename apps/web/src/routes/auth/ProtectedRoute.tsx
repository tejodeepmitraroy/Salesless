import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/context/AuthContext';

// import Cookies from 'js-cookie';
interface ProtectedRouteProps {
	allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
	const { isAuthenticated, isLoading, user, storeId } = useAuth();
	// const storeId = Cookies.get('storeId');
	const location = useLocation();
	const pathName = location.pathname;

	console.log('Authenticated--->', isAuthenticated, isLoading);

	console.log('storeId--->', storeId);
	// Show loading state if authentication status is being determined
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
			</div>
		);
	}

	if (pathName === '/accounts') {
		return (
			<Navigate
				to={`/accounts/${user?.id}/general`}
				state={{ from: location }}
				replace
			/>
		);
	}

	// If not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// Render children if authenticated and authorized
	return (
		<>
			{/* {children} */}
			<Outlet />
		</>
	);
};

export default ProtectedRoute;
