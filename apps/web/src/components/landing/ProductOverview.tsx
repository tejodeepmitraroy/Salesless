import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	Brain,
	Zap,
	Globe,
	Palette,
	Settings,
	Target,
	ArrowRight,
	Check,
} from 'lucide-react';

const ProductOverview = () => {
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

	const features = [
		{
			icon: <Zap className="h-6 w-6" />,
			title: 'Headless, API-First Architecture',
			points: [
				'RESTful + GraphQL APIs for seamless integration',
				'Works out-of-the-box with front-end frameworks like Next.js, React.js, Vue, and Astro',
				'Microservices-based for modular, independent scaling',
			],
		},
		{
			icon: <Brain className="h-6 w-6" />,
			title: 'AI-Driven CRM Core',
			points: [
				'Smart customer profiles with AI-powered insights',
				'Predictive segmentation based on real-time behaviors and trends',
				'Automated workflows that launch the right campaigns at the right time',
			],
		},
		{
			icon: <Globe className="h-6 w-6" />,
			title: 'Omnichannel Ready',
			points: [
				'Unified view of customer activity across web, mobile, social, and in-store',
				'Centralized CRM with decentralized experiences',
				'Brand consistency across all touchpoints',
			],
		},
		{
			icon: <Palette className="h-6 w-6" />,
			title: 'Total Design Freedom',
			points: [
				'Bring your own front end—SalesSync integrates with any tech stack',
				'Built to support headless CMS platforms like Storyblok, Contentful, and Strapi',
				'Let devs innovate while marketers control content, independently',
			],
		},
		{
			icon: <Settings className="h-6 w-6" />,
			title: 'Enterprise-Level Performance',
			points: [
				'Cloud-native, auto-scalable Kubernetes infrastructure',
				'Integrated with top-tier CDNs for lightning-fast delivery',
				'Robust analytics and uptime monitoring baked in',
			],
		},
	];

	const targetAudience = [
		'Direct-to-Consumer Brands looking to build deep customer relationships',
		'Retailers with online + physical presence needing unified customer views',
		'B2B Sellers managing complex sales funnels and account histories',
		'Marketplaces that support multiple vendors with custom storefronts',
		'Agencies building custom commerce experiences at scale',
	];

	const frameworks = [
		'Next.js – Optimized for SEO and server-side rendering',
		'React.js – Flexible for complex UIs',
		'Astro JS – Fastest static site generation for headless commerce',
		'Vue.js – Lightweight and performant option',
		'SvelteKit, Nuxt, and more via API integrations',
	];

	const faqs = [
		{
			question:
				'What makes SalesSync different from traditional CRM platforms?',
			answer:
				"SalesSync is built API-first with AI baked in. Unlike legacy CRMs, it's designed for omnichannel e-commerce and integrates cleanly with modern stacks.",
		},
		{
			question: 'Do I need to use a specific CMS or front-end framework?',
			answer:
				'Nope. Bring your own tools. SalesSync is headless—use what you love.',
		},
		{
			question: 'Is SalesSync scalable for large enterprise use cases?',
			answer:
				'Absolutely. It runs on cloud-native Kubernetes infrastructure, supports multi-region deployments, and handles high traffic with ease.',
		},
		{
			question: 'Can non-technical users manage campaigns?',
			answer:
				'Yes. The intuitive dashboard lets marketers segment audiences, launch automations, and view insights—no code required.',
		},
	];

	return (
		<section className="bg-white px-4 py-20">
			<div className="container mx-auto max-w-6xl">
				{/* Header */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="mb-16 text-center"
				>
					<motion.div variants={itemVariants} className="mb-4">
						<span className="text-4xl">🧠</span>
					</motion.div>
					<motion.h2
						variants={itemVariants}
						className="mb-4 text-4xl font-bold md:text-5xl"
					>
						SalesSync
					</motion.h2>
					<motion.h3
						variants={itemVariants}
						className="mb-6 text-2xl font-semibold text-gray-700 md:text-3xl"
					>
						AI-Powered Headless CRM for Modern E-Commerce Brands
					</motion.h3>
					<motion.p
						variants={itemVariants}
						className="mx-auto max-w-4xl text-xl text-gray-600"
					>
						Unleash the power of personalized customer engagement across every
						channel. SalesSync decouples your front end from your commerce and
						CRM engine—so you scale faster, market smarter, and convert better.
					</motion.p>
				</motion.div>

				{/* Key Features */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="mb-20"
				>
					<motion.div variants={itemVariants} className="mb-12 text-center">
						<span className="mb-4 block text-3xl">🔧</span>
						<h3 className="text-3xl font-bold">
							Key Features That Drive Growth
						</h3>
					</motion.div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => (
							<motion.div key={index} variants={itemVariants}>
								<Card className="h-full border border-gray-200 transition-shadow hover:shadow-lg">
									<CardContent className="p-6">
										<div className="mb-4 inline-block rounded-lg bg-blue-50 p-3">
											<div className="text-blue-600">{feature.icon}</div>
										</div>
										<h4 className="mb-4 text-lg font-bold">{feature.title}</h4>
										<ul className="space-y-2">
											{feature.points.map((point, pointIndex) => (
												<li key={pointIndex} className="flex items-start">
													<Check className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
													<span className="text-sm text-gray-600">{point}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Platform Diagram */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="mb-20"
				>
					<motion.div variants={itemVariants} className="mb-12 text-center">
						<span className="mb-4 block text-3xl">🧭</span>
						<h3 className="text-3xl font-bold">
							Visual Overview: Platform Diagram
						</h3>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Card className="border border-gray-200">
							<CardContent className="p-8">
								<div className="space-y-6 text-center">
									<div className="rounded-lg bg-blue-50 p-4">
										<h4 className="mb-2 font-bold text-blue-800">Channels</h4>
										<p className="text-sm text-blue-600">
											Web | Mobile App | In-Store Kiosk | Social Commerce
										</p>
									</div>
									<div className="rounded-lg bg-green-50 p-4">
										<h4 className="mb-2 font-bold text-green-800">
											Headless Frontend + CMS
										</h4>
									</div>
									<div className="rounded-lg bg-orange-50 p-4">
										<h4 className="mb-2 font-bold text-orange-800">
											SalesSync Engine
										</h4>
										<p className="text-sm text-orange-600">
											CRM Module | AI Layer | API Gateway | Workflow Automation
											| Data Lake
										</p>
									</div>
									<div className="rounded-lg bg-purple-50 p-4">
										<h4 className="mb-2 font-bold text-purple-800">
											Microservices
										</h4>
										<p className="text-sm text-purple-600">
											Payments, Inventory, Auth, Shipping, etc.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>

				{/* Target Audience */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="mb-20"
				>
					<motion.div variants={itemVariants} className="mb-12 text-center">
						<span className="mb-4 block text-3xl">🎯</span>
						<h3 className="text-3xl font-bold">Who It's Built For</h3>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="grid grid-cols-1 gap-4 md:grid-cols-2"
					>
						{targetAudience.map((audience, index) => (
							<div
								key={index}
								className="flex items-start rounded-lg bg-gray-50 p-4"
							>
								<Target className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
								<span className="text-gray-700">{audience}</span>
							</div>
						))}
					</motion.div>
				</motion.div>

				{/* Frameworks */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="mb-20"
				>
					<motion.div variants={itemVariants} className="mb-12 text-center">
						<span className="mb-4 block text-3xl">🧱</span>
						<h3 className="text-3xl font-bold">
							Built for Modern Front-End Frameworks
						</h3>
						<p className="mt-4 text-lg text-gray-600">
							SalesSync supports and plays well with:
						</p>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="grid grid-cols-1 gap-4 md:grid-cols-2"
					>
						{frameworks.map((framework, index) => (
							<div
								key={index}
								className="flex items-start rounded-lg bg-blue-50 p-4"
							>
								<Check className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
								<span className="text-gray-700">{framework}</span>
							</div>
						))}
					</motion.div>
				</motion.div>

				{/* FAQs with Accordion */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="mb-20"
				>
					<motion.div variants={itemVariants} className="mb-12 text-center">
						<span className="mb-4 block text-3xl">❓</span>
						<h3 className="text-3xl font-bold">Frequently Asked Questions</h3>
					</motion.div>

					<motion.div variants={itemVariants} className="mx-auto max-w-4xl">
						<Accordion type="single" collapsible className="space-y-4">
							{faqs.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="rounded-lg border border-gray-200 px-6"
								>
									<AccordionTrigger className="text-left hover:no-underline">
										<span className="text-lg font-semibold">
											{faq.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="pb-4 text-gray-600">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</motion.div>
				</motion.div>

				{/* CTA Section */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
					className="text-center"
				>
					<motion.div variants={itemVariants} className="mb-8">
						<span className="mb-4 block text-3xl">⚡</span>
						<h3 className="mb-4 text-3xl font-bold">
							Ready to Supercharge Your Commerce Stack?
						</h3>
						<p className="text-xl text-gray-600">
							Start your SalesSync journey today.
						</p>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="flex flex-col justify-center gap-4 sm:flex-row"
					>
						<Button
							size="lg"
							className="bg-[#00B86B] text-white hover:bg-green-700"
						>
							Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-gray-300 text-gray-700 hover:bg-gray-50"
						>
							Start Free Trial
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-gray-300 text-gray-700 hover:bg-gray-50"
						>
							Talk to Sales
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default ProductOverview;
