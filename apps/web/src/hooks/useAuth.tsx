
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router';

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
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, mobile?: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data (would be replaced with actual API calls)
const SAMPLE_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    mobile: '+1 (555) 123-4567',
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Employee User',
    email: 'employee@example.com',
    password: 'employee123',
    role: 'employee' as UserRole,
    mobile: '+1 (555) 987-6543',
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Vendor User',
    email: 'vendor@example.com',
    password: 'vendor123',
    role: 'vendor' as UserRole,
    mobile: '+1 (555) 456-7890',
    avatar: '/placeholder.svg'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in our sample data
    const foundUser = SAMPLE_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }
    
    // Create user object without password
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
    
    return;
  };

  const register = async (name: string, email: string, password: string, mobile?: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = SAMPLE_USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userExists) {
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // In a real app, you would send this to an API to create a user
    // Here we're just simulating the process
    setIsLoading(false);
    
    return;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user exists
    const userExists = SAMPLE_USERS.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!userExists) {
      setIsLoading(false);
      // Don't throw error for security reasons - don't reveal if an email exists or not
    }
    
    // In a real app, you would send a reset email
    setIsLoading(false);
    
    return;
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    
    if (!user) {
      setIsLoading(false);
      throw new Error('No user logged in');
    }
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user data
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    
    // Update in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setIsLoading(false);
    return;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      resetPassword,
      updateUserProfile
    }}>
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
