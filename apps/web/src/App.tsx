import React, { Suspense } from 'react';
import './App.css';
import { Loader } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router';
import AdminDashboard from './routes/app/Dashboard/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotFound from './routes/NotFound';
import Index from './routes/home/Index';
import ProtectedRoute from './routes/auth/ProtectedRoute';
import CustomerDetails from './routes/app/Customer/CustomerDetails';
import LoginPage from './routes/auth/Login';
import { AuthProvider } from './context/AuthContext';
import ProductDetails from './routes/app/Products/ProductDetails';
import MediaDetails from './routes/app/Media/MediaDetails';
import GeneralSettings from './routes/app/Settings/GeneralSettings';
import ApiKeysSettings from './routes/app/Settings/ApiKeysSettings';
import PaymentsGateway from './features/Settings/components/PaymentsGateway';
import OrderDetails from './routes/app/Orders/OrderDetails';
import AdminLayout from './components/layouts/AdminLayout';
import IntegrationManagement from './routes/app/Integrations/IntegrationManagement';
import PaymentsDashboard from './routes/app/Integrations/PaymentsDashboard';
import AccountLayout from './components/layouts/AccountLayout';
import AccountGeneral from './routes/accounts/AccountGeneral';
import AccountSecurity from './routes/accounts/AccountSecurity';
import GatewaySlug from './routes/app/Settings/Payments/GatewaySlug';
import ThirdPartyProviders from './routes/app/Settings/Payments/ThirdPartyProviders';
import Settings from './routes/app/Settings/Settings';
import Billing from './routes/app/Billing/Billing';
import SuccessPage from './routes/app/Billing/SuccessPage';
import StoreSelection from './routes/app/Store/StoreSelection';

const queryClient = new QueryClient();
function App() {
	const SignUp = React.lazy(() => import('./routes/auth/Signup'));
	const ForgotPassword = React.lazy(
		() => import('./routes/auth/ForgotPassword')
	);
	const Unauthorized = React.lazy(() => import('./routes/Unauthorized'));
	// const StoreSelection = React.lazy(
	// 	() => import('./routes/app/Store/StoreSelection')
	// );
	const CreateStore = React.lazy(
		() => import('./routes/app/Store/CreateStore')
	);

	const ProductManagement = React.lazy(
		() => import('./routes/app/Products/ProductManagement')
	);
	const MediaManagement = React.lazy(
		() => import('./routes/app/Media/MediaManagement')
	);
	const CreateNewProduct = React.lazy(
		() => import('./routes/app/Products/CreateNewProduct')
	);
	const OrderManagement = React.lazy(
		() => import('./routes/app/Orders/OrderManagement')
	);
	const InventoryManagement = React.lazy(
		() => import('./routes/app/Products/Inventory/InventoryManagement')
	);
	const Notifications = React.lazy(
		() => import('./routes/settings/notifications/Notifications')
	);
	const CustomerManagement = React.lazy(
		() => import('./routes/app/Customer/CustomerManagement')
	);
	const CollectionManagement = React.lazy(
		() => import('./routes/app/Products/Collections/CollectionManagement')
	);

	const Loading = () => (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col items-center">
				<Loader className="text-primary mb-4 h-10 w-10 animate-spin" />
				<p className="text-lg font-medium">Loading...</p>
			</div>
		</div>
	);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<BrowserRouter>
					<Toaster />
					<Suspense fallback={<Loading />}>
						<Routes>
							{/* Public routes */}
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/unauthorized" element={<Unauthorized />} />
							<Route path="*" element={<NotFound />} />
							<Route path="/" element={<Index />} />

							{/* Protected Routes for App*/}
							<Route element={<ProtectedRoute />}>
								{/* Store Section */}
								<Route path="/store">
									<Route index element={<StoreSelection />} />
									<Route path="undefined" element={<NotFound />} />
									<Route path="create" element={<CreateStore />} />

									{/* Store-Specific Nested Routes */}
									<Route path=":storeId" element={<AdminLayout />}>
										<Route index element={<AdminDashboard />} />
										<Route path="products">
											<Route index element={<ProductManagement />} />
											<Route path="create" element={<CreateNewProduct />} />
											<Route
												path="collections"
												element={<CollectionManagement />}
											/>
											<Route
												path="inventory"
												element={<InventoryManagement />}
											/>
											<Route path=":productId" element={<ProductDetails />} />
										</Route>

										<Route path="orders">
											<Route index element={<OrderManagement />} />
											<Route path=":orderId" element={<OrderDetails />} />
										</Route>
										<Route path="media">
											<Route index element={<MediaManagement />} />
											<Route path=":mediaId" element={<MediaDetails />} />
										</Route>
										<Route path="integrations">
											<Route index element={<IntegrationManagement />} />
										</Route>
										<Route path="finances">
											<Route path="payments" element={<PaymentsDashboard />} />
										</Route>
										<Route path="billing">
											<Route index element={<Billing />} />
											<Route path="success" element={<SuccessPage />} />
										</Route>

										{/* Settings */}
										<Route path="settings" element={<Settings />}>
											<Route path="general" element={<GeneralSettings />} />
											<Route path="api-keys" element={<ApiKeysSettings />} />
											<Route path="payments" element={<PaymentsGateway />} />
											{/* <Route path="analytics" element={<AnalyticsSettings />} /> */}
										</Route>
										<Route path="settings/payments">
											<Route path=":gatewaySlug" element={<GatewaySlug />} />
											<Route
												path="third-party-providers"
												element={<ThirdPartyProviders />}
											/>
										</Route>
										{/* Settings */}

										{/* Notification */}
										<Route path="notifications" element={<Notifications />} />
										<Route path="customers">
											<Route index element={<CustomerManagement />} />
											<Route path=":customerId" element={<CustomerDetails />} />
										</Route>
									</Route>
								</Route>
								{/* Protected Routes for User */}
								<Route path="/accounts">
									<Route path=":accountId" element={<AccountLayout />}>
										<Route path="general" element={<AccountGeneral />} />
										<Route path="security" element={<AccountSecurity />} />
									</Route>
								</Route>
							</Route>
						</Routes>
					</Suspense>
				</BrowserRouter>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
