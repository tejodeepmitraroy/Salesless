import React from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
// import { useAuth } from '@/features/users/hooks/useAuth';
import type { UserRole } from '@/features/users/hooks/useAuth';
import Cookies from 'js-cookie';
interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const location = useLocation();
	const { storeId } = useParams<{ storeId: string }>();
	const accessToken = Cookies.get('access_token');
	const navigate = useNavigate();
	// Show loading state if authentication status is being determined
	// if (isLoading) {
	// 	return (
	// 		<div className="flex min-h-screen items-center justify-center">
	// 			<div className="border-vsphere-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
	// 		</div>
	// 	);
	// }

	if (accessToken && storeId) {
		navigate(`/store/${storeId}`);
	} else if (accessToken) {
		navigate('/store');
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// Redirect to login if not authenticated
	// if (!isAuthenticated) {
	// 	return <Navigate to="/login" state={{ from: location }} replace />;
	// }

	// if (isAuthenticated &&!storeId) {
	// 	return <Navigate to="/store" state={{ from: location }} replace />;
	// }

	// Check if user has required role

	// console.log(user);
	// if (!user) {
	// 	return <Navigate to="/unauthorized" replace />;
	// }

	// Render children if authenticated and authorized
	return <>{children}</>;
};

export default ProtectedRoute;
