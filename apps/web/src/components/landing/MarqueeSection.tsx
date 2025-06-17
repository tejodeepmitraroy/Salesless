import { motion } from 'framer-motion';

const MarqueeSection = () => {
	const companies = [
		'Shopify',
		'Amazon',
		'Etsy',
		'WooCommerce',
		'BigCommerce',
		'Magento',
		'Squarespace',
		'Wix',
		'PrestaShop',
		'OpenCart',
	];

	return (
		<section className="overflow-hidden bg-gray-50 py-12">
			<div className="container mx-auto max-w-6xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="mb-8 text-center"
				>
					<p className="text-lg font-medium text-gray-600">
						Trusted by leading e-commerce companies worldwide
					</p>
				</motion.div>

				<div className="relative">
					<div className="animate-marquee flex space-x-12">
						{[...companies, ...companies].map((company, index) => (
							<div
								key={index}
								className="flex-shrink-0 rounded-lg border border-gray-100 bg-white px-8 py-4 shadow-sm"
							>
								<span className="text-xl font-semibold text-gray-700">
									{company}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MarqueeSection;
