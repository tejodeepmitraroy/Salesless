import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import { getUserData } from '@/features/users/services';
import Cookies from 'js-cookie';
import { logoutService } from '@/features/Auth/services';
// Define user types
export type UserRole = 'admin' | 'employee' | 'vendor';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	mobile?: string;
	role: UserRole;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	storeId: string | null;
	logOut: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [storeId, setStoreId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Check if user is already logged in (from cookies)
	const getUserDetails = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await getUserData();
			setUser(response.data.data);
			setIsLoading(false);
		} catch (error) {
			console.error('Failed to get user data:', error);
			setUser(null);
			setIsLoading(false);
		}
	}, []);

	const logOut = useCallback(() => {
		setIsLoading(true);
		setUser(null);
		setStoreId(null);
		logoutService();
		setIsLoading(false);
	}, []);

	const getStoreId = useCallback(() => {
		const storeId = Cookies.get('storeId');
		if (!storeId) {
			setStoreId(null);
		} else {
			setStoreId(storeId);
		}
	}, []);
	console.log('getUserDetails', user);

	useEffect(() => {
		getStoreId();
		getUserDetails();
	}, [getStoreId, getUserDetails]);

	// Update auth state when token changes
	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				logOut,
				isAuthenticated,
				isLoading,
				setUser,
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
