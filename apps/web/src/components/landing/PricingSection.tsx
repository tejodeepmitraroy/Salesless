import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Star, Zap } from 'lucide-react';

const PricingSection = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const cardVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	const plans = [
		{
			name: 'Starter',
			price: '$29',
			period: '/month',
			description: 'Perfect for small businesses getting started',
			features: [
				'Up to 1,000 customers',
				'Basic CRM features',
				'Email support',
				'API access',
				'Standard analytics',
			],
			popular: false,
			cta: 'Start Free Trial',
		},
		{
			name: 'Professional',
			price: '$99',
			period: '/month',
			description: 'Ideal for growing businesses',
			features: [
				'Up to 10,000 customers',
				'Advanced AI insights',
				'Priority support',
				'Custom integrations',
				'Advanced analytics',
				'Workflow automation',
				'Multi-channel support',
			],
			popular: true,
			cta: 'Get Started',
		},
		{
			name: 'Enterprise',
			price: 'Custom',
			period: '',
			description: 'For large-scale operations',
			features: [
				'Unlimited customers',
				'White-label solution',
				'Dedicated support',
				'Custom development',
				'Advanced security',
				'SLA guarantee',
				'Training & onboarding',
			],
			popular: false,
			cta: 'Contact Sales',
		},
	];

	return (
		<section className="bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-20">
			<div className="container mx-auto max-w-6xl">
				<motion.div
					initial="hidden"
					whileInView="visible"
					variants={containerVariants}
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.div variants={cardVariants} className="mb-16 text-center">
						<span className="mb-4 block text-4xl">💰</span>
						<h2 className="mb-4 text-4xl font-bold md:text-5xl">
							Choose Your Plan
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-gray-600">
							Scale your business with the right plan for your needs. All plans
							include our core CRM features.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{plans.map((plan, index) => (
							<motion.div
								key={index}
								variants={cardVariants}
								whileHover={{
									y: -10,
									transition: { duration: 0.3 },
								}}
								className="relative"
							>
								{plan.popular && (
									<motion.div
										initial={{ opacity: 0, scale: 0 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 1, duration: 0.5 }}
										className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform"
									>
										<div className="flex items-center rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-4 py-2 text-sm font-medium text-white">
											<Star className="mr-1 h-4 w-4" />
											Most Popular
										</div>
									</motion.div>
								)}

								<Card
									className={`h-full border-2 transition-all duration-300 ${
										plan.popular
											? 'border-orange-400 bg-white shadow-xl'
											: 'border-gray-200 bg-white hover:border-blue-300'
									}`}
								>
									<CardContent className="p-8">
										<div className="mb-8 text-center">
											<h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
											<p className="mb-4 text-gray-600">{plan.description}</p>
											<div className="mb-4 flex items-baseline justify-center">
												<motion.span
													initial={{ scale: 0 }}
													whileInView={{ scale: 1 }}
													viewport={{ once: true }}
													transition={{
														delay: 0.5 + index * 0.1,
														duration: 0.5,
													}}
													className="text-4xl font-bold text-gray-900"
												>
													{plan.price}
												</motion.span>
												{plan.period && (
													<span className="ml-1 text-gray-500">
														{plan.period}
													</span>
												)}
											</div>
										</div>

										<ul className="mb-8 space-y-4">
											{plan.features.map((feature, featureIndex) => (
												<motion.li
													key={featureIndex}
													initial={{ opacity: 0, x: -20 }}
													whileInView={{ opacity: 1, x: 0 }}
													viewport={{ once: true }}
													transition={{
														delay: 0.7 + index * 0.1 + featureIndex * 0.05,
														duration: 0.4,
													}}
													className="flex items-start"
												>
													<Check className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
													<span className="text-gray-700">{feature}</span>
												</motion.li>
											))}
										</ul>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
										>
											<Button
												className={`w-full py-3 ${
													plan.popular
														? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
														: 'bg-blue-600 text-white hover:bg-blue-700'
												}`}
												size="lg"
											>
												{plan.popular && <Zap className="mr-2 h-4 w-4" />}
												{plan.cta}
											</Button>
										</motion.div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>

					<motion.div variants={cardVariants} className="mt-12 text-center">
						<p className="mb-4 text-gray-600">
							All plans come with a 30-day money-back guarantee
						</p>
						<div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
							<span>✓ No setup fees</span>
							<span>✓ Cancel anytime</span>
							<span>✓ 24/7 support</span>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default PricingSection;
