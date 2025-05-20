import React, { Suspense } from 'react';
import './App.css';
import { Loader } from 'lucide-react';
import { AuthProvider } from './features/users/hooks/useAuth';
import { BrowserRouter, Route, Routes } from 'react-router';
import AdminDashboard from './pages/app/Dashboard/AdminDashboard';
// import { ThemeProvider } from './components/ThemeProvider';
// import { AnimatePresence, motion } from 'motion/react';
import AdminLayout from './components/AdminLayout';
import { Toaster } from './components/ui/sonner';
import AppLauncher from './pages/app/Dashboard/AppLauncher';

function App() {
	// Animation configurations for page transitions

	// const Index = React.lazy(() => import('./pages/Index'));
	const Login = React.lazy(() => import('./pages/auth/Login'));
	const SignUp = React.lazy(() => import('./pages/auth/Signup'));
	const ForgotPassword = React.lazy(
		() => import('./pages/auth/ForgotPassword')
	);
	const Unauthorized = React.lazy(() => import('./pages/Unauthorized'));
	const StoreSelection = React.lazy(
		() => import('./pages/app/Store/StoreSelection')
	);
	const CreateStore = React.lazy(() => import('./pages/app/Store/CreateStore'));
	const ProtectedRoute = React.lazy(
		() => import('./pages/auth/ProtectedRoute')
	);

	const Loading = () => (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col items-center">
				<Loader className="text-vsphere-primary mb-4 h-10 w-10 animate-spin" />
				<p className="text-lg font-medium">Loading...</p>
			</div>
		</div>
	);

	return (
		<BrowserRouter>
			<AuthProvider>
				<Toaster />
				<Suspense fallback={<Loading />}>
					<Routes>
						{/* Public routes */}
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<AdminLayout>
										<AdminDashboard />
									</AdminLayout>
								</ProtectedRoute>
							}
						/>

						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/unauthorized" element={<Unauthorized />} />

						{/* Protected admin routes */}
						<Route
							path="/store-selection"
							element={
								<ProtectedRoute>
									<StoreSelection />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/create-store"
							element={
								<ProtectedRoute>
									<CreateStore />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<AdminLayout>
										<AppLauncher />
									</AdminLayout>
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Suspense>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
