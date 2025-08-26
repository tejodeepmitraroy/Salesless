import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, CircleDashed, ChevronRight } from 'lucide-react';

const STEPS = [
	{
		id: 1,
		title: 'Store Information',
		description: 'Add your store name, logo, and contact details',
		completed: true,
	},
	{
		id: 2,
		title: 'Add Products',
		description: 'Upload your product catalog',
		completed: true,
	},
	{
		id: 3,
		title: 'Payment Setup',
		description: 'Connect your payment processor',
		completed: false,
	},
	{
		id: 4,
		title: 'Shipping Settings',
		description: 'Configure shipping zones and rates',
		completed: false,
	},
];

export default function SetupProgress() {
	const completedSteps = STEPS.filter((step) => step.completed).length;
	const progress = (completedSteps / STEPS.length) * 100;

	return (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Complete your store setup</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="space-y-2">
						<div className="text-muted-foreground flex justify-between text-sm">
							<span>Progress</span>
							<span>
								{completedSteps} of {STEPS.length} completed
							</span>
						</div>
						<Progress value={progress} className="h-2" />
					</div>

					<div className="space-y-4">
						<h3 className="text-sm font-medium">Next steps:</h3>
						<div className="space-y-2">
							{STEPS.map((step) => (
								<div
									key={step.id}
									className={`flex items-center rounded-lg p-3 ${
										!step.completed ? 'bg-muted/50' : ''
									}`}
								>
									{step.completed ? (
										<CheckCircle2 className="mr-3 h-5 w-5 text-green-500" />
									) : (
										<CircleDashed className="text-muted-foreground/50 mr-3 h-5 w-5" />
									)}
									<div className="flex-1">
										<h4
											className={`font-medium ${step.completed ? 'text-muted-foreground' : ''}`}
										>
											{step.title}
										</h4>
										<p className="text-muted-foreground text-sm">
											{step.description}
										</p>
									</div>
									{!step.completed && (
										<ChevronRight className="text-muted-foreground h-5 w-5" />
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
