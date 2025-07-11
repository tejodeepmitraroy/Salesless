import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
	status: 'connected' | 'disconnected' | 'error';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	switch (status) {
		case 'connected':
			return (
				<Badge className="bg-green-100 text-green-700">
					<CheckCircle className="mr-1 h-3 w-3" />
					Connected
				</Badge>
			);
		case 'error':
			return (
				<Badge className="bg-red-100 text-red-700">
					<AlertCircle className="mr-1 h-3 w-3" />
					Error
				</Badge>
			);
		default:
			return <Badge variant="secondary">Disconnected</Badge>;
	}
};

export default StatusBadge;
