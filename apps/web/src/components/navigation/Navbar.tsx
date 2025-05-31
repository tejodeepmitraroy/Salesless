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
		<nav className="sticky top-0 z-50 bg-white shadow-sm">
			<div className="container mx-auto px-4 py-3">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center">
						<a href="/" className="text-2xl font-bold text-[#FF6600]">
							SalesSync
						</a>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden items-center space-x-8 md:flex">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-gray-600 hover:text-[#FF6600]">
										Products
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<a
														className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-orange-50 to-white p-6 no-underline outline-none select-none focus:shadow-md"
														href="/"
													>
														<div className="mt-4 mb-2 text-lg font-medium">
															SalesSync CRM
														</div>
														<p className="text-sm leading-tight text-gray-600">
															All-in-one headless e-commerce platform for modern
															businesses.
														</p>
													</a>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-orange-50 hover:text-[#FF6600] focus:bg-orange-50 focus:text-[#FF6600]"
														href="/"
													>
														<div className="text-sm font-medium">Analytics</div>
														<p className="line-clamp-2 text-sm leading-snug text-gray-500">
															Advanced metrics to grow your business
														</p>
													</a>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-orange-50 hover:text-[#FF6600] focus:bg-orange-50 focus:text-[#FF6600]"
														href="/"
													>
														<div className="text-sm font-medium">
															API Access
														</div>
														<p className="line-clamp-2 text-sm leading-snug text-gray-500">
															Developer-friendly integrations
														</p>
													</a>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-gray-600 hover:text-[#FF6600]">
										Resources
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[200px] gap-3 p-4">
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-orange-50 hover:text-[#FF6600] focus:bg-orange-50 focus:text-[#FF6600]"
														href="/"
													>
														<div className="text-sm font-medium">
															Documentation
														</div>
													</a>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-orange-50 hover:text-[#FF6600] focus:bg-orange-50 focus:text-[#FF6600]"
														href="/"
													>
														<div className="text-sm font-medium">Guides</div>
													</a>
												</NavigationMenuLink>
											</li>
											<li>
												<NavigationMenuLink asChild>
													<a
														className="block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-orange-50 hover:text-[#FF6600] focus:bg-orange-50 focus:text-[#FF6600]"
														href="/"
													>
														<div className="text-sm font-medium">Blog</div>
													</a>
												</NavigationMenuLink>
											</li>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<a
										href="/"
										className="inline-block px-4 py-2 text-gray-600 hover:text-[#FF6600]"
									>
										Pricing
									</a>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<Link to="/login">
							<Button className="bg-[#FF6600] text-white hover:bg-orange-700">
								Log In
							</Button>{' '}
						</Link>
						<Button className="bg-[#FF6600] text-white hover:bg-orange-700">
							Start Free Trial
						</Button>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="text-gray-600 hover:text-[#FF6600] focus:outline-none"
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
								className="px-4 py-2 text-gray-600 hover:text-[#FF6600]"
							>
								Products <ChevronDown className="inline-block h-4 w-4" />
							</a>
							<a
								href="/"
								className="px-4 py-2 text-gray-600 hover:text-[#FF6600]"
							>
								Resources <ChevronDown className="inline-block h-4 w-4" />
							</a>
							<a
								href="/"
								className="px-4 py-2 text-gray-600 hover:text-[#FF6600]"
							>
								Pricing
							</a>
							<div className="pt-2">
								<Button className="w-full bg-[#FF6600] text-white hover:bg-orange-700">
									Start Free Trial
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
