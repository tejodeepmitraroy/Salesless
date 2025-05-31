import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Mail, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import HeroImage from '@/components/landing/HeroImage';
import CountdownTimer from '@/components/landing/CountdownTimer';
import TestimonialCard from '@/components/landing/TestimonialCard';
import FeatureCard from '@/components/landing/FeatureCard';
import Navbar from '@/components/navigation/Navbar';
import BenefitsSection from '@/components/landing/BenefitsSection';

// Animation variants for staggered animations
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const Index = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [framework, setFramework] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would integrate with HubSpot or your preferred CRM
		console.log({ email, name, company, framework });
		alert("Thanks for signing up! We'll be in touch soon.");
	};

	return (
		<div className="flex min-h-screen flex-col">
			{/* Navbar */}
			<Navbar />

			{/* Hero Section - Updated to match the reference image */}
			<section className="relative overflow-hidden bg-blue-600 px-4 py-20">
				<div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500 to-blue-700"></div>
				<div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-yellow-300 opacity-10"></div>
				<div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue-400 opacity-20"></div>

				<div className="relative z-10 container mx-auto max-w-6xl">
					<div className="rounded-xl bg-white p-8 shadow-xl md:p-12">
						<div className="mb-8 text-center md:text-left">
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4 }}
								className="mb-2 text-sm text-gray-600"
							>
								All your sales data - from all departments - in one place.
							</motion.p>
						</div>

						<div className="flex flex-col items-center gap-8 md:flex-row">
							<motion.div
								className="flex-1 space-y-6"
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
									Control your sales
									<br />
									with confidence & ease
								</h1>
								<p className="text-xl text-gray-700 md:text-2xl">
									Everything you need to manage, track, and finalize sales — all
									in one clear, actionable space.
								</p>
								<div className="flex flex-col gap-4 pt-4 sm:flex-row">
									<Button
										size="lg"
										className="bg-[#FF6600] px-8 text-white hover:bg-orange-700"
									>
										Sign up for free
									</Button>
									<Button
										size="lg"
										variant="outline"
										className="border-gray-300 text-gray-700 hover:bg-gray-50"
									>
										Request a demo
									</Button>
								</div>
								<div className="flex items-center gap-4">
									<div className="flex items-center">
										<div className="flex">
											{[1, 2, 3, 4, 5].map((star) => (
												<svg
													key={star}
													className="h-4 w-4 text-yellow-400"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
												</svg>
											))}
										</div>
										<span className="ml-2 text-sm font-medium">4.7 rating</span>
									</div>
									<div className="h-6 border-l border-gray-300"></div>
									<div className="rounded-md bg-gray-100 px-3 py-1">
										<span className="text-sm font-medium">Capterra 4.7</span>
									</div>
								</div>
							</motion.div>
							<motion.div
								className="flex-1"
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<HeroImage />
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Offer Countdown Section - Added animation */}
			<motion.section
				className="bg-[#FF6600] py-4 text-white"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.5 }}
			>
				<div className="container mx-auto text-center">
					<div className="flex flex-col items-center justify-center gap-4 md:flex-row">
						<div className="flex items-center">
							<Clock className="mr-2 h-5 w-5" />
							<span className="font-bold">
								🚀 30-Day Money-Back Guarantee – Offer Ends in:
							</span>
						</div>
						<CountdownTimer hours={24} />
					</div>
				</div>
			</motion.section>

			{/* Benefits Section - Added animation */}
			<motion.div
				initial="hidden"
				whileInView="visible"
				variants={containerVariants}
				viewport={{ once: true, margin: '-100px' }}
			>
				<BenefitsSection />
			</motion.div>

			{/* Second Benefits Section with Reversed Layout - Added animation */}
			<motion.div
				initial="hidden"
				whileInView="visible"
				variants={containerVariants}
				viewport={{ once: true, margin: '-100px' }}
			>
				<BenefitsSection reversed={true} />
			</motion.div>

			{/* Benefits Section - Added staggered animation */}
			<motion.section
				className="bg-white px-4 py-20"
				initial="hidden"
				whileInView="visible"
				variants={containerVariants}
				viewport={{ once: true, margin: '-100px' }}
			>
				<div className="container mx-auto max-w-6xl">
					<motion.h2
						className="mb-12 text-center text-3xl font-bold md:text-4xl"
						variants={itemVariants}
					>
						Why Developers & Founders Choose SalesSync
					</motion.h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						<FeatureCard
							title="Save Dev Hours"
							description="Plug-and-play API integration saves your team valuable development time"
							icon="Clock"
						/>
						<FeatureCard
							title="Lightning Fast"
							description="Increase conversions with a backend optimized for speed"
							icon="ExternalLink"
						/>
						<FeatureCard
							title="Scale Without Limits"
							description="Built for growth from day one with no complexity"
							icon="Building"
						/>
						<FeatureCard
							title="Fully Customizable"
							description="No code limits - build exactly what you need"
							icon="User"
						/>
					</div>
				</div>
			</motion.section>

			{/* Features Section - Updated to match the image */}
			<motion.section
				className="bg-white px-4 py-20"
				initial="hidden"
				whileInView="visible"
				variants={containerVariants}
				viewport={{ once: true, margin: '-100px' }}
			>
				<div className="container mx-auto max-w-6xl">
					<motion.div className="mb-12 text-center" variants={itemVariants}>
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="mx-auto mb-4"
						>
							<img
								src="public/lovable-uploads/5f31ef8c-dbd8-473b-8db5-0fcaad7846cf.png"
								alt="Target"
								className="mx-auto h-16 w-16"
							/>
						</motion.div>
						<h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">
							Set a baseline of success for your contracts in 2025
						</h2>
						<p className="mx-auto max-w-3xl text-lg text-gray-600">
							As your budgets get squeezed even tighter, every decision counts!
							Having a clear overview of your contracts means seeing all
							available opportunities at the right time—ASAP.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-1">
						<FeatureCard
							title="See your past, present, and future revenue to execute big decisions with proof."
							description="Make confident decisions with complete visibility."
							icon="Clock"
							tagText="Import & Extract"
							imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop"
							bulletPoints={[
								'Access all contracts and agreements at a glance, whenever you need them.',
								'Spot opportunities for renewals and growth while avoiding unwanted surprises.',
							]}
							ctaText="Learn more"
						/>

						<FeatureCard
							title="Avoid financial risk and costly mistakes, at every stage of your contracts."
							description="Stay in control at every stage of your contracts."
							icon="ExternalLink"
							tagText="Insights"
							imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
							bulletPoints={[
								'Never miss a deadline or face unexpected penalties again. Ensure nothing slips through the cracks by setting renewal reminders and assigned responsibilities.',
								'You decide who does what, and when.',
							]}
							ctaText="Learn more"
						/>

						<FeatureCard
							title="Speed the time to sign with one tool to draft, negotiate and agree"
							description="Draft, negotiate, and finalize contracts effortlessly."
							icon="Building"
							tagText="Create, collaborate & sign"
							imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop"
							bulletPoints={[
								'Save contracts to a secure server with customizable templates to put an end to the copy-paste cycle.',
							]}
							ctaText="Learn more"
						/>
					</div>

					<div className="mt-12 text-center">
						<Button
							size="lg"
							className="bg-[#00B86B] px-8 text-white hover:bg-green-700"
						>
							Start your free trial today
						</Button>
					</div>
				</div>
			</motion.section>

			{/* Social Proof Section - Added animation */}
			<motion.section
				className="bg-gray-50 px-4 py-20"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6 }}
			>
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial="hidden"
						whileInView="visible"
						variants={containerVariants}
						viewport={{ once: true }}
					>
						<motion.h2
							className="mb-3 text-center text-3xl font-bold md:text-4xl"
							variants={itemVariants}
						>
							Trusted By Developers
						</motion.h2>
						<motion.p
							className="mb-12 text-center text-xl text-gray-600"
							variants={itemVariants}
						>
							Join 10,000+ businesses already using SalesSync
						</motion.p>
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<TestimonialCard
								quote="SalesSync cut our development time in half and gave us the flexibility we needed for our custom storefront."
								author="Alex Johnson"
								role="CTO at TechWear"
							/>
							<TestimonialCard
								quote="The API is a dream to work with. Documentation is clear and the performance is outstanding."
								author="Sarah Chen"
								role="Lead Developer at StyleHouse"
							/>
							<TestimonialCard
								quote="We switched from a traditional CRM and saw conversion rates increase by 37% in the first month."
								author="Michael Rodriguez"
								role="Founder at EcoStore"
							/>
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Lead Capture Section - Added animation */}
			<motion.section
				className="bg-white px-4 py-20"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.7 }}
			>
				<div className="container mx-auto max-w-2xl">
					<Card className="border border-gray-200 shadow-lg">
						<CardContent className="p-8">
							<h2 className="mb-6 text-center text-3xl font-bold">
								Start Your Free Trial Today
							</h2>
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="flex flex-col space-y-1.5">
									<label htmlFor="name" className="font-medium">
										Full Name
									</label>
									<div className="relative">
										<User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
										<Input
											id="name"
											placeholder="John Doe"
											className="pl-10"
											value={name}
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="flex flex-col space-y-1.5">
									<label htmlFor="email" className="font-medium">
										Email
									</label>
									<div className="relative">
										<Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
										<Input
											id="email"
											type="email"
											placeholder="john@company.com"
											className="pl-10"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="flex flex-col space-y-1.5">
									<label htmlFor="company" className="font-medium">
										Company Name
									</label>
									<div className="relative">
										<Building className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
										<Input
											id="company"
											placeholder="Acme Inc"
											className="pl-10"
											value={company}
											onChange={(e) => setCompany(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="flex flex-col space-y-1.5">
									<label htmlFor="framework" className="font-medium">
										Which framework do you use? (Optional)
									</label>
									<Textarea
										id="framework"
										placeholder="React, Next.js, Vue, etc."
										value={framework}
										onChange={(e) => setFramework(e.target.value)}
									/>
								</div>
								<div className="pt-4">
									<Button
										type="submit"
										className="w-full bg-[#00B86B] text-white hover:bg-green-700"
										size="lg"
									>
										Claim Your CRM Now
									</Button>
								</div>
								<div className="pt-2 text-center text-sm text-gray-500">
									By signing up, you agree to our Terms of Service and Privacy
									Policy
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</motion.section>

			{/* Trust Indicators - Added animation */}
			<motion.section
				className="bg-gray-50 px-4 py-12"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.5 }}
			>
				<div className="container mx-auto max-w-4xl">
					<div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
						<motion.div
							className="flex flex-col items-center"
							whileHover={{ y: -5, transition: { duration: 0.2 } }}
						>
							<div className="mb-4 rounded-full bg-orange-100 p-3">
								<CheckCircle className="h-6 w-6 text-[#FF6600]" />
							</div>
							<p className="font-medium">Trusted by 10,000+ businesses</p>
						</motion.div>
						<motion.div
							className="flex flex-col items-center"
							whileHover={{ y: -5, transition: { duration: 0.2 } }}
						>
							<div className="mb-4 rounded-full bg-orange-100 p-3">
								<CheckCircle className="h-6 w-6 text-[#FF6600]" />
							</div>
							<p className="font-medium">Modern security best practices</p>
						</motion.div>
						<motion.div
							className="flex flex-col items-center"
							whileHover={{ y: -5, transition: { duration: 0.2 } }}
						>
							<div className="mb-4 rounded-full bg-orange-100 p-3">
								<CheckCircle className="h-6 w-6 text-[#FF6600]" />
							</div>
							<p className="font-medium">HubSpot lead tracking</p>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Footer - Added subtle animation */}
			<motion.footer
				className="mt-auto bg-gray-900 px-4 py-12 text-white"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<div className="container mx-auto max-w-6xl">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
						<div>
							<h3 className="mb-4 text-xl font-bold">SalesSync</h3>
							<p className="text-gray-400">
								The ultimate headless e-commerce operating system for modern
								developers.
							</p>
						</div>
						<div>
							<h4 className="mb-4 font-bold">Resources</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Documentation
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										API Reference
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Tutorials
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-4 font-bold">Company</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										About Us
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Careers
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Blog
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-4 font-bold">Legal</h4>
							<ul className="space-y-2">
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Privacy Policy
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Terms of Service
									</a>
								</li>
								<li>
									<a href="#" className="text-gray-400 hover:text-white">
										Contact Us
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
						<p className="text-gray-400">
							&copy; 2025 SalesSync. All rights reserved.
						</p>
						<div className="mt-4 flex space-x-4 md:mt-0">
							<a href="#" className="text-gray-400 hover:text-white">
								<span className="sr-only">Twitter</span>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</a>
							<a href="#" className="text-gray-400 hover:text-white">
								<span className="sr-only">GitHub</span>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									/>
								</svg>
							</a>
							<a href="#" className="text-gray-400 hover:text-white">
								<span className="sr-only">LinkedIn</span>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</motion.footer>
		</div>
	);
};

export default Index;
