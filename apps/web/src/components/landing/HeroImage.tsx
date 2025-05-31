const HeroImage = () => {
	return (
		<div className="relative overflow-hidden rounded-lg shadow-xl">
			<div className="aspect-video rounded-lg bg-gradient-to-br from-[#FF6600]/10 to-[#00B86B]/10 p-4">
				{/* Dashboard UI Mockup */}
				<div className="h-full w-full overflow-hidden rounded-md bg-white shadow-lg">
					<div className="flex h-12 items-center bg-[#FF6600] px-4">
						<div className="flex space-x-2">
							<div className="h-3 w-3 rounded-full bg-red-400"></div>
							<div className="h-3 w-3 rounded-full bg-yellow-400"></div>
							<div className="h-3 w-3 rounded-full bg-green-400"></div>
						</div>
						<div className="ml-4 text-xs text-white">SalesSync Dashboard</div>
					</div>
					<div className="p-4">
						<div className="mb-4 grid grid-cols-3 gap-4">
							<div className="h-20 animate-pulse rounded bg-gray-100"></div>
							<div className="h-20 animate-pulse rounded bg-gray-100"></div>
							<div className="h-20 animate-pulse rounded bg-gray-100"></div>
						</div>
						<div className="flex gap-4">
							<div className="w-1/3">
								<div className="mb-4 rounded-lg bg-[#FF6600]/10 p-4">
									<div className="mb-2 h-4 w-3/4 rounded bg-[#FF6600]/20"></div>
									<div className="h-4 w-1/2 rounded bg-[#FF6600]/20"></div>
								</div>
								<div className="h-40 animate-pulse rounded bg-gray-100"></div>
							</div>
							<div className="w-2/3">
								<div className="mb-4 rounded-lg bg-[#00B86B]/10 p-4">
									<div className="mb-2 h-4 w-3/4 rounded bg-[#00B86B]/20"></div>
									<div className="h-4 w-1/2 rounded bg-[#00B86B]/20"></div>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div className="h-24 animate-pulse rounded bg-gray-100"></div>
									<div className="h-24 animate-pulse rounded bg-gray-100"></div>
									<div className="h-24 animate-pulse rounded bg-gray-100"></div>
									<div className="h-24 animate-pulse rounded bg-gray-100"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Animation overlay elements */}
			<div className="absolute -top-6 -right-6 h-12 w-12 animate-pulse rounded-full bg-[#FF6600] opacity-10"></div>
			<div className="absolute -bottom-6 -left-6 h-12 w-12 animate-pulse rounded-full bg-[#00B86B] opacity-10"></div>
		</div>
	);
};

export default HeroImage;
