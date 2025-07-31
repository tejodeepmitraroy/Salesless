import HeaderSection from '@/components/layouts/HeaderSection';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

import { FcCamera } from 'react-icons/fc';
import { Link, useParams } from 'react-router';

const ThirdPartyProviders = () => {
	const payments = [
		{
			slug: 'stripe',
			name: 'Stripe',
			description: 'Payment processing and subscription management',
			icon: '/icons/stripe.png',
			status: 'Active',
		},
		{
			slug: 'phone-pe',
			name: 'PhonePe',
			description: 'Payment processing and subscription management',
			icon: '/icons/phone-pe.png',
			status: 'disabled',
		},
	];

	const { storeId } = useParams<{ storeId: string }>();
	return (
		<section className="mx-auto w-full max-w-7xl">
			<HeaderSection
				icon={<FcCamera />}
				title="Third-party payment providers"
				description="Manage your products"
			/>

			<Separator className="mb-4" />
			<section className="space-y-4">
				<section className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div className="relative flex w-full items-center gap-2">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						<Input
							type="text"
							placeholder="Search payment providers..."
							className="w-full rounded-md border py-2 pr-4 pl-10"
							// value={searchQuery}
							// onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<Select
					// onValueChange={(sort: string) => setSort(sort)}
					// defaultValue={sort}
					>
						<SelectTrigger className="w-fit">
							<SelectValue placeholder="Sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sort</SelectLabel>
								<SelectItem value="apple">Apple</SelectItem>
								<SelectItem value="banana">Banana</SelectItem>
								<SelectItem value="blueberry">Blueberry</SelectItem>
								<SelectItem value="grapes">Grapes</SelectItem>
								<SelectItem value="pineapple">Pineapple</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</section>
				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{payments?.map((payment) => (
						<Link
							to={`/store/${storeId}/settings/payments/${payment.slug}`}
							key={payment.slug}
							className="h-full cursor-pointer"
						>
							<Card className="bg-background flex h-full items-center justify-start py-6 text-left shadow-none">
								<CardHeader className="mx-4 flex w-full items-start justify-start gap-3">
									<div className="flex aspect-square h-11 w-11 items-center justify-center rounded-lg border bg-white p-2">
										<img
											src={
												payment.slug
													? `/icons/${payment.slug}.png`
													: '/icons/payment-default.png'
											}
											alt=""
										/>
									</div>
									<section className="flex flex-col gap-1">
										<CardTitle className="text-base font-medium">
											{payment.name}
										</CardTitle>
										<CardDescription className="text-xs">
											{payment.description}
										</CardDescription>
									</section>
								</CardHeader>
							</Card>
						</Link>
					))}
				</section>
			</section>
		</section>
	);
};

export default ThirdPartyProviders;
