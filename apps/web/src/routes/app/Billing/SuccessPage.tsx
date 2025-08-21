import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useParams } from 'react-router';

const SuccessPage = () => {
	const { storeId } = useParams<{ storeId: string }>();
	const navigate = useNavigate();
	const { width, height } = useWindowSize();
	const [confetti, setConfetti] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setConfetti(false);
		}, 10000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence>
			{confetti && (
				<Confetti
					width={width}
					height={height}
					recycle={false}
					numberOfPieces={500}
					gravity={0.2}
					style={{ position: 'fixed', top: 0, left: 0, zIndex: 60 }}
				/>
			)}
			<div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.3,
						ease: [0.16, 1, 0.3, 1],
					}}
					className="relative w-full max-w-md"
				>
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{
							delay: 0.1,
							duration: 0.4,
							ease: [0.16, 1, 0.3, 1],
						}}
						className="w-full space-y-6 overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: 'spring',
								stiffness: 260,
								damping: 20,
								delay: 0.2,
							}}
							className="mb-6 flex justify-center"
						>
							<div className="relative">
								<CheckCircle2 className="h-24 w-24 text-green-500" />
								<div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-0" />
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<h1 className="text-2xl font-bold text-gray-900">
								Payment Successful!
							</h1>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<p className="text-gray-600">
								Your store is now active with our premium plan.
							</p>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.5 }}
						>
							<Button
								onClick={() =>
									navigate(`/store/${storeId}
									`)
								}
								className="bg-primary hover:bg-primary/90 w-full"
							>
								Go to Dashboard
							</Button>
						</motion.div>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.5 }}
							className="mt-4 text-sm text-gray-500"
						>
							Need help? Contact our support team at support@sales-sync.com
						</motion.p>
					</motion.div>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default SuccessPage;
