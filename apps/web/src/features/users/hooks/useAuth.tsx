import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import Cookies from 'js-cookie';

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
	const [user] = useState<User | null>(null);
	const [storeId, setStoreId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// const navigate = useNavigate();

	// Check if user is already logged in (from localStorage)
	const getUser = useCallback(async () => {
		try {
			// const response = await getUserData();
			// console.log(response);
			// setUser(true);
		} catch (error) {
			console.log(error);
		}
	}, []);
	useEffect(() => {
		const accessToken = Cookies.get('access_token');
		const storeId = Cookies.get('storeId');
		if (accessToken) {
			getUser();
		}
		if (storeId) {
			setStoreId(storeId);
		}
		setIsLoading(false);
	}, [getUser]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
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
