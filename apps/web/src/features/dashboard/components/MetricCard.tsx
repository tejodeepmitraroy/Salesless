import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: React.ElementType;
	color: string;
	iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	color,
	iconColor,
}) => {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex items-start justify-between">
					<div>
						<p className="text-sm font-medium text-gray-500">{title}</p>
						<h3 className="mt-1 text-2xl font-bold">{value}</h3>
						<div className="mt-1 flex items-center">
							<span
								className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
							>
								{change}
							</span>
							{trend === 'up' ? (
								<ArrowUpRight className="ml-1 h-3 w-3 text-green-600" />
							) : (
								<ArrowDownRight className="ml-1 h-3 w-3 text-red-600" />
							)}
							<span className="ml-1 text-xs text-gray-500">vs last month</span>
						</div>
					</div>
					<div className={`${color} rounded-md p-2`}>
						<Icon className={`h-5 w-5 ${iconColor}`} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default MetricCard;
