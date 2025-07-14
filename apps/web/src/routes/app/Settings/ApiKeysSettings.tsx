import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy } from 'lucide-react';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const ApiKeysSettings = () => {
	const [apiKey] = useState('');

	return (
		<Card className="w-full">
			<section className="grid w-full grid-cols-3">
				<CardHeader className="col-span-1 flex w-full flex-col text-left">
					<CardTitle>
						<Badge variant="outline">Store ID</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className="col-span-2 w-full space-y-4 text-left">
					<section className="space-y-2">
						<div className="flex">
							<Input id="store-id" value={apiKey} readOnly className="flex-1" />
							<Button
								variant="outline"
								size="sm"
								className="ml-2"
								onClick={() => copyToClipboard(apiKey, 'Store ID')}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						{/* <CardDescription>
								This key is safe to use in a browser if you have enabled Row
								Level Security for your tables and configured policies. Prefer
								using Secret API keys instead.
							</CardDescription> */}
					</section>
				</CardContent>
			</section>
			<Separator />
			<section className="grid w-full grid-cols-3">
				<CardHeader className="col-span-1 flex w-full flex-col text-left">
					<CardTitle>
						<Badge variant="outline">public</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className="col-span-2 w-full space-y-4 text-left">
					<section className="space-y-2">
						<div className="flex">
							<Input id="store-id" value={apiKey} readOnly className="flex-1" />
							<Button
								variant="outline"
								size="sm"
								className="ml-2"
								onClick={() => copyToClipboard(apiKey, 'Store ID')}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						<CardDescription>
							This key is safe to use in a browser if you have enabled Row Level
							Security for your tables and configured policies. Prefer using
							Secret API keys instead.
						</CardDescription>
					</section>
				</CardContent>
			</section>
			<Separator />
			<section className="grid w-full grid-cols-3">
				<CardHeader className="col-span-1 flex w-full flex-col text-left">
					<CardTitle className="flex gap-2">
						<Badge variant="outline">secret</Badge>
						<Badge variant="outline">secret</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className="col-span-2 w-full space-y-4 text-left">
					<div className="flex">
						<Input id="store-id" value={apiKey} readOnly className="flex-1" />
						<Button
							variant="outline"
							size="sm"
							className="ml-2"
							onClick={() => copyToClipboard(apiKey, 'Store ID')}
						>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
					<p className="text-muted-foreground text-sm">
						This key is safe to use in a browser if you have enabled Row Level
						Security for your tables and configured policies. Prefer using
						Secret API keys instead.
					</p>
				</CardContent>
			</section>
		</Card>
	);
};

export default ApiKeysSettings;
