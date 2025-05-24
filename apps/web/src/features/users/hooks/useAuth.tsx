import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useCallback,
} from 'react';
import Cookies from 'js-cookie';
import { getUserData } from '../services';

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
	const [token, setToken] = useState<string | null>(null);

	// const navigate = useNavigate();

	// Check if user is already logged in (from localStorage)
	const getUserDetails = useCallback(async () => {
		try {
			const response = await getUserData();
			console.log(response);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		const accessToken = Cookies.get('access_token');

		const storeId = Cookies.get('storeId');

		if (accessToken) {
			setToken(accessToken);
			getUserDetails();
		}
		if (storeId) {
			setStoreId(storeId);
		}
		setIsLoading(false);
	}, [getUserDetails]);

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !token,
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
