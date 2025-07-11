import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User, Shield, CheckCircle, Plus, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const UserProfile = () => {
	const { user } = useAuth();

	const [activeTab, setActiveTab] = useState('general');
	const [firstName, setFirstName] = useState(user?.firstName || '');
	const [lastName, setLastName] = useState(user?.lastName || '');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleProfileUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// const fullName = `${firstName} ${lastName}`.trim();
			// await updateUserProfile({ name: fullName, email: user?.email, mobile: user?.mobile });

			toast('Profile updated', {
				description: 'Your profile information has been updated successfully.',
			});
		} catch (error) {
			console.log(error);
			toast('Update failed', {
				description:
					'There was an error updating your profile. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handlePasswordUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast("Passwords don't match", {
				description: 'New password and confirmation must match.',
			});
			return;
		}

		setIsLoading(true);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');

			toast('Password updated', {
				description: 'Your password has been changed successfully.',
			});
		} catch (error) {
			console.log(error);
			toast('Update failed', {
				description:
					'There was an error updating your password. Please try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const sidebarItems = [
		{ id: 'general', label: 'General', icon: User },
		{ id: 'security', label: 'Security', icon: Shield },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex">
				{/* Sidebar */}
				<div className="min-h-screen w-64 border-r border-gray-200 bg-white">
					<div className="p-6">
						<h1 className="text-xl font-semibold text-gray-900">
							Account Settings
						</h1>
					</div>
					<nav className="px-4">
						{sidebarItems.map((item) => {
							const Icon = item.icon;
							return (
								<button
									key={item.id}
									onClick={() => setActiveTab(item.id)}
									className={`mb-1 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
										activeTab === item.id
											? 'bg-gray-100 text-gray-900'
											: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
									}`}
								>
									<Icon className="mr-3 h-4 w-4" />
									{item.label}
								</button>
							);
						})}
					</nav>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-8">
					{activeTab === 'general' && (
						<div className="max-w-4xl">
							<h2 className="mb-8 text-2xl font-bold text-gray-900">General</h2>

							<Card className="mb-8">
								<CardHeader>
									<CardTitle className="text-lg">Details</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="mb-6 flex items-start space-x-6">
										<div className="flex items-center space-x-4">
											<Avatar className="h-16 w-16">
												<AvatarImage
													src={user?.avatar || '/placeholder.svg'}
													alt={user?.firstName}
												/>
												<AvatarFallback className="bg-green-100 text-lg font-semibold text-green-700">
													{firstName?.charAt(0)}
													{lastName?.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<Button variant="outline" size="sm">
												Upload photo
											</Button>
										</div>
									</div>

									<form onSubmit={handleProfileUpdate} className="space-y-6">
										<div className="grid grid-cols-2 gap-4">
											<div>
												<Label
													htmlFor="firstName"
													className="text-sm font-medium text-gray-700"
												>
													First name
												</Label>
												<Input
													id="firstName"
													value={firstName}
													onChange={(e) => setFirstName(e.target.value)}
													className="mt-1"
													required
												/>
											</div>
											<div>
												<Label
													htmlFor="lastName"
													className="text-sm font-medium text-gray-700"
												>
													Last name
												</Label>
												<Input
													id="lastName"
													value={lastName}
													onChange={(e) => setLastName(e.target.value)}
													className="mt-1"
													required
												/>
											</div>
										</div>
										<p className="text-sm text-gray-500">
											Use your first and last name as they appear on your
											government-issued ID.
										</p>

										<div>
											<Label
												htmlFor="email"
												className="text-sm font-medium text-gray-700"
											>
												Email
											</Label>
											<div className="mt-1 flex items-center space-x-2">
												<Input
													id="email"
													type="email"
													value={user?.email}
													// onChange={(e) => setEmail(e.target.value)}
													className="flex-1"
													required
												/>
												<div className="flex items-center space-x-1 text-sm text-green-600">
													<CheckCircle className="h-4 w-4" />
													<span>Verified</span>
												</div>
												<Button
													variant="link"
													size="sm"
													className="text-blue-600"
												>
													Update
												</Button>
											</div>
										</div>

										<div>
											<Label
												htmlFor="mobile"
												className="text-sm font-medium text-gray-700"
											>
												Phone Number (optional)
											</Label>
											<div className="mt-1 flex items-center space-x-2">
												<Input
													id="mobile"
													type="tel"
													value={user?.mobile}
													// onChange={(e) => setMobile(e.target.value)}
													placeholder="No phone number"
													className="flex-1"
												/>
												<Button
													variant="link"
													size="sm"
													className="text-blue-600"
												>
													<Plus className="mr-1 h-4 w-4" />
													Add
												</Button>
											</div>
										</div>

										<Button type="submit" disabled={isLoading}>
											{isLoading ? 'Saving...' : 'Save'}
										</Button>
									</form>
								</CardContent>
							</Card>

							<Card className="mb-8">
								<CardHeader>
									<CardTitle className="text-lg">Login service</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="mb-4 text-sm text-gray-600">
										Connect an external login service to quickly and securely
										access your account.
									</p>
									<div className="flex items-center justify-between rounded-lg border p-4">
										<div className="flex items-center space-x-3">
											<div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500">
												<span className="text-xs font-bold text-white">G</span>
											</div>
											<span className="text-sm">
												You can log in using Google
											</span>
										</div>
										<Button variant="link" size="sm" className="text-blue-600">
											Disconnect
										</Button>
									</div>
									<p className="mt-2 text-sm text-gray-600">
										Connected to {user?.email}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Stores</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="mb-4 text-sm text-gray-600">
										View and access stores connected to your account.
									</p>
									<Button
										variant="link"
										size="sm"
										className="p-0 text-blue-600"
									>
										View all stores
									</Button>
								</CardContent>
							</Card>
						</div>
					)}

					{activeTab === 'security' && (
						<div className="max-w-2xl">
							<h2 className="mb-8 text-2xl font-bold text-gray-900">
								Security
							</h2>

							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Change Password</CardTitle>
								</CardHeader>
								<CardContent>
									<form onSubmit={handlePasswordUpdate} className="space-y-4">
										<div>
											<Label
												htmlFor="currentPassword"
												className="text-sm font-medium text-gray-700"
											>
												Current Password
											</Label>
											<div className="relative mt-1">
												<Input
													id="currentPassword"
													type={showPassword ? 'text' : 'password'}
													value={currentPassword}
													onChange={(e) => setCurrentPassword(e.target.value)}
													required
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 transform"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? (
														<EyeOff className="h-4 w-4" />
													) : (
														<Eye className="h-4 w-4" />
													)}
												</Button>
											</div>
										</div>

										<div>
											<Label
												htmlFor="newPassword"
												className="text-sm font-medium text-gray-700"
											>
												New Password
											</Label>
											<Input
												id="newPassword"
												type={showPassword ? 'text' : 'password'}
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
												className="mt-1"
												required
											/>
										</div>

										<div>
											<Label
												htmlFor="confirmPassword"
												className="text-sm font-medium text-gray-700"
											>
												Confirm New Password
											</Label>
											<Input
												id="confirmPassword"
												type={showPassword ? 'text' : 'password'}
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
												className="mt-1"
												required
											/>
										</div>

										<Button type="submit" disabled={isLoading}>
											{isLoading ? 'Updating...' : 'Update Password'}
										</Button>
									</form>
								</CardContent>
							</Card>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
