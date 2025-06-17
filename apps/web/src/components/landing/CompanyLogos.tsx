import { motion } from 'framer-motion';

const CompanyLogos = () => {
	const companies = [
		{ name: 'Spotify', logo: '🎵' },
		{ name: 'Slack', logo: '💬' },
		{ name: 'Zoom', logo: '📹' },
		{ name: 'Notion', logo: '📝' },
		{ name: 'Figma', logo: '🎨' },
		{ name: 'GitHub', logo: '🐙' },
	];

	return (
		<motion.section
			className="px-4 py-12"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.8, duration: 0.6 }}
		>
			<div className="container mx-auto max-w-6xl text-center">
				<motion.p
					className="mb-8 text-sm text-gray-500"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.5 }}
				>
					Trusted by 2,000+ companies worldwide
				</motion.p>
				<div className="flex items-center justify-center space-x-12 opacity-60">
					{companies.map((company, index) => (
						<motion.div
							key={company.name}
							className="flex flex-col items-center space-y-2"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
							whileHover={{ scale: 1.1, opacity: 1 }}
						>
							<div className="text-2xl">{company.logo}</div>
							<span className="text-xs font-medium text-gray-400">
								{company.name}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
};

export default CompanyLogos;
