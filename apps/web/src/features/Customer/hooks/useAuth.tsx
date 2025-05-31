import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import Cookies from 'js-cookie';
import { getUserData } from '@/features/users/services';

// Define user types
export type UserRole = 'admin' | 'employee' | 'vendor';

export interface User {
	id: string;
	name: string;
	email: string;
	mobile?: string;
	role: UserRole;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	storeId: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [storeId, setStoreId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [token, setToken] = useState<string | null>(() => {
		return Cookies.get('access_token') || null;
	});

	// Check if user is already logged in (from localStorage)
	const getUserDetails = useCallback(async () => {
		try {
			const response = await getUserData();
			setUser(response.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Failed to get user data:', error);
			setUser(null);
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		// Initialize store ID from cookies
		const storedStoreId = Cookies.get('storeId');
		if (storedStoreId) {
			setStoreId(storedStoreId);
		}

		// Only fetch user data if we have a token
		if (token) {
			getUserDetails();
			setToken(token);
		} else {
			setIsLoading(false);
		}
	}, [token, getUserDetails]);

	// Update auth state when token changes
	const isAuthenticated = !!token;

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				isLoading,
				storeId,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
