import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BenefitsSectionProps {
	reversed?: boolean;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
	reversed = false,
}) => {
	const controls = useAnimation();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	useEffect(() => {
		if (isInView) {
			controls.start('visible');
		}
	}, [controls, isInView]);

	const fadeVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.4,
				ease: 'easeIn',
			},
		},
	};

	return (
		<section ref={ref} className="bg-white px-4 py-16">
			<div className="container mx-auto max-w-6xl">
				<div
					className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
				>
					<motion.div
						className="flex-1"
						initial="hidden"
						animate={controls}
						variants={fadeVariants}
						exit="exit"
					>
						<img
							src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop"
							alt="SalesSync CRM Benefits"
							className="h-auto w-full rounded-lg object-cover shadow-lg"
						/>
					</motion.div>
					<motion.div
						className="flex-1 space-y-6"
						initial="hidden"
						animate={controls}
						variants={fadeVariants}
					>
						<span className="font-medium text-[#00B86B]">
							STREAMLINED WORKFLOW
						</span>
						<h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
							Boost Your Team's Productivity by Up to 40%
						</h2>
						<p className="text-lg text-gray-700">
							SalesSync integrates seamlessly with your existing tools,
							eliminating data silos and reducing manual tasks that waste
							valuable time. Our customers report saving an average of 15 hours
							per week on administrative work.
						</p>
						<div className="space-y-4">
							<div className="flex items-start">
								<div className="mt-1 mr-3 rounded-full bg-green-50 p-2">
									<svg
										className="h-4 w-4 text-[#00B86B]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</div>
								<div>
									<h3 className="text-lg font-bold">Automated Data Entry</h3>
									<p className="text-gray-600">
										Smart forms and AI-powered tools capture and organize
										customer data without manual input.
									</p>
								</div>
							</div>
							<div className="flex items-start">
								<div className="mt-1 mr-3 rounded-full bg-green-50 p-2">
									<svg
										className="h-4 w-4 text-[#00B86B]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
								</div>
								<div>
									<h3 className="text-lg font-bold">Smart Integrations</h3>
									<p className="text-gray-600">
										Connect with 100+ popular tools like Slack, Zoom, and Google
										Workspace out of the box.
									</p>
								</div>
							</div>
						</div>
						<Button className="mt-4 bg-[#00B86B] text-white hover:bg-green-700">
							Explore Features <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default BenefitsSection;
