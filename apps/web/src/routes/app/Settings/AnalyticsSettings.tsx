import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

const AnalyticsSettings = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Google Analytics</CardTitle>
					<CardDescription>
						Connect your Google Analytics account to track website traffic and
						user behavior.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="ga-id">Measurement ID</Label>
						<Input id="ga-id" placeholder="G-XXXXXXXXXX" />
						<p className="text-muted-foreground text-xs">
							Enter your Google Analytics 4 measurement ID (starts with G-).
						</p>
					</div>
					<div className="space-y-2">
						<Label htmlFor="ga-view">Property View ID</Label>
						<Input id="ga-view" placeholder="123456789" />
					</div>
					<div className="space-y-2">
						<Label className="flex items-center gap-2" htmlFor="ga-enhanced">
							<input
								type="checkbox"
								id="ga-enhanced"
								className="rounded border-gray-300"
							/>
							<span>Enable enhanced measurement</span>
						</Label>
					</div>
				</CardContent>
				<CardFooter>
					<Button>
						<Save className="mr-2 h-4 w-4" />
						Save Changes
					</Button>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Facebook Meta Pixel</CardTitle>
					<CardDescription>
						Connect your Facebook Meta Pixel to track conversions and optimize
						ads.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="fb-pixel">Pixel ID</Label>
						<Input id="fb-pixel" placeholder="1234567890123456" />
					</div>
					<div className="space-y-2">
						<Label className="flex items-center gap-2" htmlFor="fb-advanced">
							<input
								type="checkbox"
								id="fb-advanced"
								className="rounded border-gray-300"
							/>
							<span>Enable advanced matching</span>
						</Label>
					</div>
				</CardContent>
				<CardFooter>
					<Button>
						<Save className="mr-2 h-4 w-4" />
						Save Changes
					</Button>
				</CardFooter>
			</Card>
		</>
	);
};

export default AnalyticsSettings;
