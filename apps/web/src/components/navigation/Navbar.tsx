import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router';

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="fixed top-4 left-1/2 z-50 w-full max-w-6xl -translate-x-1/2 transform px-4">
			<div className="rounded-full border border-gray-200/50 bg-white/90 px-6 py-3 shadow-lg backdrop-blur-md">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
							SL
						</div>
					</div>

					{/* Desktop Navigation - Centered */}
					<div className="mx-8 hidden flex-1 items-center justify-center md:flex">
						<NavigationMenu>
							<NavigationMenuList className="flex items-center space-x-8">
								<NavigationMenuItem>
									<NavigationMenuTrigger className="font-medium text-gray-600 hover:text-blue-600">
										Product
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<a
														className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-white p-6 no-underline outline-none select-none focus:shadow-md"
														href="/"
													>
														<div className="mt-4 mb-2 text-lg font-medium">
															Customer Insights
														</div>
														<p className="text-sm leading-tight text-gray-600">
															Surface hidden customer pains and reduce churn
															with AI-powered insights.
														</p>
													</a>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
														href="/"
													>
														<div className="text-sm font-medium">
															Feedback Analytics
														</div>
														<p className="line-clamp-2 text-sm leading-snug text-gray-500">
															AI-powered feedback categorization
														</p>
													</a>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600"
														href="/"
													>
														<div className="text-sm font-medium">
															Journey Mapping
														</div>
														<p className="line-clamp-2 text-sm leading-snug text-gray-500">
															Understand user experience touchpoints
														</p>
													</a>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<a
										href="/"
										className="inline-block px-4 py-2 font-medium text-gray-600 hover:text-blue-600"
									>
										Solutions
									</a>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<a
										href="/"
										className="inline-block px-4 py-2 font-medium text-gray-600 hover:text-blue-600"
									>
										Resources
									</a>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<a
										href="/"
										className="inline-block px-4 py-2 font-medium text-gray-600 hover:text-blue-600"
									>
										Pricing
									</a>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* CTA Buttons */}
					<div className="hidden items-center space-x-3 md:flex">
						<Link to="/login">
							<Button
								variant="ghost"
								className="text-gray-600 hover:text-blue-600"
							>
								Sign In
							</Button>
						</Link>
						<Button className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700">
							Book a Demo
						</Button>
						{/* <Button className="bg-[#FF6600] text-white hover:bg-orange-700">
							Start Free Trial
						</Button> */}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="text-gray-600 hover:text-blue-600 focus:outline-none"
						>
							<Menu className="h-6 w-6" />
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className="mt-3 border-t pt-4 pb-3 md:hidden">
						<div className="flex flex-col space-y-3">
							<a
								href="/"
								className="px-4 py-2 text-gray-600 hover:text-blue-600"
							>
								Product <ChevronDown className="inline-block h-4 w-4" />
							</a>
							<a
								href="/"
								className="px-4 py-2 text-gray-600 hover:text-blue-600"
							>
								Solutions
							</a>
							<a
								href="/"
								className="px-4 py-2 text-gray-600 hover:text-blue-600"
							>
								Resources
							</a>
							<a
								href="/"
								className="px-4 py-2 text-gray-600 hover:text-blue-600"
							>
								Pricing
							</a>
							<div className="space-y-2 pt-2">
								<Button
									variant="ghost"
									className="w-full text-gray-600 hover:text-blue-600"
								>
									Sign In
								</Button>
								<Button className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700">
									Book a Demo
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
