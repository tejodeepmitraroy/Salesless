import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Clock, ExternalLink, Building, User } from "lucide-react";

interface FeatureCardProps {
	title: string;
	description: string;
	icon?: string;
	tagText?: string;
	imageUrl?: string;
	bulletPoints?: string[];
	ctaText?: string;
}

const FeatureCard = ({
	title,
	description,
	// icon,
	tagText,
	imageUrl,
	bulletPoints = [],
	ctaText = 'Learn more',
}: FeatureCardProps) => {
	// const iconMap = {
	//   Clock,
	//   ExternalLink,
	//   Building,
	//   User
	// };

	// const IconComponent = iconMap[icon as keyof typeof iconMap] || Clock;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			whileHover={{ y: -5 }}
			className="mb-12"
		>
			<Card className="border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
				<CardContent className="p-8">
					<div className="flex flex-col items-center gap-8 lg:flex-row">
						<div className="flex-1 space-y-6">
							{tagText && (
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2, duration: 0.5 }}
									className="inline-block"
								>
									<span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
										{tagText}
									</span>
								</motion.div>
							)}

							<motion.h3
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.3, duration: 0.5 }}
								className="text-2xl font-bold text-gray-900 lg:text-3xl"
							>
								{title}
							</motion.h3>

							<motion.p
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className="text-lg text-gray-600"
							>
								{description}
							</motion.p>

							{bulletPoints.length > 0 && (
								<motion.ul
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.5, duration: 0.5 }}
									className="space-y-3"
								>
									{bulletPoints.map((point, index) => (
										<motion.li
											key={index}
											initial={{ opacity: 0, x: -10 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true }}
											transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
											className="flex items-start"
										>
											<div className="mt-1 mr-3 flex-shrink-0 rounded-full bg-green-100 p-1">
												<div className="h-2 w-2 rounded-full bg-green-500"></div>
											</div>
											<span className="text-gray-700">{point}</span>
										</motion.li>
									))}
								</motion.ul>
							)}

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.7, duration: 0.5 }}
							>
								<Button
									variant="outline"
									className="border-blue-500 text-blue-600 transition-colors hover:bg-blue-50"
								>
									{ctaText}
								</Button>
							</motion.div>
						</div>

						{imageUrl && (
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.4, duration: 0.8 }}
								className="relative flex-1 overflow-hidden rounded-lg"
							>
								<motion.img
									src={imageUrl}
									alt={title}
									className="h-64 w-full rounded-lg object-cover lg:h-80"
									whileHover={{ scale: 1.05, rotate: 2 }}
									animate={{
										x: [0, -10, 0],
										rotate: [-1, 1, -1],
									}}
									transition={{
										duration: 4,
										ease: 'easeInOut',
										repeat: Infinity,
										repeatType: 'reverse',
									}}
								/>
							</motion.div>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
};

export default FeatureCard;
