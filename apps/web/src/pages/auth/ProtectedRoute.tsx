import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router';
import { useAuth } from '@/features/users/hooks/useAuth';
import type { UserRole } from '@/features/users/hooks/useAuth';

interface ProtectedRouteProps {
	children: React.ReactNode;
	allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user, isAuthenticated, isLoading } = useAuth();
	const location = useLocation();
	const { storeId } = useParams<{ storeId: string }>();


	// Show loading state if authentication status is being determined
	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="border-vsphere-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	// if (isAuthenticated &&!storeId) {
	// 	return <Navigate to="/store" state={{ from: location }} replace />;
	// }

	// Check if user has required role
	// if (user && !allowedRoles.includes(user.role)) {
	if (!user) {
		return <Navigate to="/unauthorized" replace />;
	}

	if (!isAuthenticated && storeId) {
		return (
			<Navigate to={`/store/${storeId}`} state={{ from: location }} replace />
		);
	}

	// Render children if authenticated and authorized
	return <>{children}</>;
};

export default ProtectedRoute;
