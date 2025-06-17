import { Star, MessageSquare, TrendingUp, Users } from 'lucide-react';

const HeroImage = () => {
	return (
		<div className="relative overflow-hidden rounded-2xl shadow-2xl">
			<div className="aspect-[4/3] rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-6">
				{/* Dashboard UI Mockup */}
				<div className="h-full w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
					{/* Header */}
					<div className="flex h-14 items-center justify-between border-b border-gray-100 bg-white px-6">
						<div className="flex items-center space-x-4">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
								SL
							</div>
							<h3 className="font-semibold text-gray-800">
								Customer Insights Dashboard
							</h3>
						</div>
						<div className="flex space-x-2">
							<div className="h-3 w-3 rounded-full bg-red-400"></div>
							<div className="h-3 w-3 rounded-full bg-yellow-400"></div>
							<div className="h-3 w-3 rounded-full bg-green-400"></div>
						</div>
					</div>

					{/* Content */}
					<div className="h-full p-6">
						{/* Top Stats Row */}
						<div className="mb-6 grid grid-cols-3 gap-4">
							<div className="rounded-lg bg-blue-50 p-4">
								<div className="mb-2 flex items-center justify-between">
									<MessageSquare className="h-5 w-5 text-blue-600" />
									<span className="text-xs font-medium text-green-600">
										+12%
									</span>
								</div>
								<div className="text-2xl font-bold text-gray-800">1,247</div>
								<div className="text-xs text-gray-600">Feedback Items</div>
							</div>
							<div className="rounded-lg bg-green-50 p-4">
								<div className="mb-2 flex items-center justify-between">
									<TrendingUp className="h-5 w-5 text-green-600" />
									<span className="text-xs font-medium text-green-600">
										+8%
									</span>
								</div>
								<div className="text-2xl font-bold text-gray-800">94.2%</div>
								<div className="text-xs text-gray-600">Satisfaction</div>
							</div>
							<div className="rounded-lg bg-orange-50 p-4">
								<div className="mb-2 flex items-center justify-between">
									<Users className="h-5 w-5 text-orange-600" />
									<span className="text-xs font-medium text-red-600">-3%</span>
								</div>
								<div className="text-2xl font-bold text-gray-800">2.1%</div>
								<div className="text-xs text-gray-600">Churn Rate</div>
							</div>
						</div>

						{/* Main Content Areas */}
						<div className="grid h-32 grid-cols-2 gap-6">
							{/* Customer Service Section */}
							<div className="rounded-lg bg-gray-50 p-4">
								<div className="mb-3 flex items-center justify-between">
									<h4 className="text-sm font-semibold text-gray-800">
										Customer Service
									</h4>
									<div className="flex items-center space-x-1">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star
												key={star}
												className="h-3 w-3 fill-current text-yellow-400"
											/>
										))}
										<span className="ml-1 text-xs text-gray-600">4.8</span>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-600">Response Time</span>
										<span className="text-xs font-medium text-green-600">
											Excellent
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-600">
											Resolution Rate
										</span>
										<span className="text-xs font-medium text-blue-600">
											95.4%
										</span>
									</div>
								</div>
							</div>

							{/* App Usability Section */}
							<div className="rounded-lg bg-gray-50 p-4">
								<div className="mb-3 flex items-center justify-between">
									<h4 className="text-sm font-semibold text-gray-800">
										App Usability
									</h4>
									<div className="h-2 w-8 rounded-full bg-gray-200">
										<div className="h-2 w-6 rounded-full bg-blue-500"></div>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-600">Navigation</span>
										<span className="text-xs font-medium text-green-600">
											Good
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-xs text-gray-600">Load Speed</span>
										<span className="text-xs font-medium text-orange-600">
											Needs Work
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Floating Elements */}
			<div className="absolute -top-4 -right-4 h-8 w-8 animate-pulse rounded-full bg-blue-500 opacity-20"></div>
			<div className="absolute -bottom-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-green-500 opacity-20"></div>
			<div className="absolute top-1/2 -left-2 h-4 w-4 animate-bounce rounded-full bg-orange-500 opacity-30"></div>
		</div>
	);
};

export default HeroImage;
