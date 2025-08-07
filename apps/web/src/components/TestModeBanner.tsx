import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

/**
 * Displays a thin sticky bar at the very top of the viewport that indicates the
 * application is running in Test Mode – similar to Stripe's dashboard.
 *
 * The banner is only rendered when the `show` prop is true. Consumers should
 * determine from their own logic (e.g. environment flag, store setting) when
 * to show the banner.
 */
export interface TestModeBannerProps {
	/** Whether the banner should be visible. */
	show?: boolean;
	/** Optional URL to link users to complete their profile (or any CTA). */
	ctaUrl?: string;
	/** Optional text for the right-side CTA; defaults to "Complete profile". */
	ctaText?: string;
}

export const TestModeBanner: React.FC<TestModeBannerProps> = ({
	show = false,
	ctaUrl = '#',
	ctaText = 'Complete profile',
}) => {
	if (!show) return null;

	return (
		<div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center bg-[#cb410b] px-4 py-2 text-xs font-medium text-white md:text-sm">
			<span>
				You're using test data. To accept payments, complete your business
				profile.
			</span>
			{ctaUrl && (
				<Link
					to={ctaUrl}
					className="flex items-center gap-1 transition-opacity hover:opacity-90"
				>
					{ctaText}
					<ArrowUpRight className="h-4 w-4" />
				</Link>
			)}
		</div>
	);
};

export default TestModeBanner;
