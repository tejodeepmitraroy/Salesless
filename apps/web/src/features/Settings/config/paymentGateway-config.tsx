export const supportedPaymentsGateways: {
	gateway: 'stripe' | 'razorpay' | 'phonepe' | 'paytm';
	slug: string;
	icon: string;
	name: string;
	description: string;
}[] = [
	{
		gateway: 'stripe',
		name: 'Stripe',
		slug: 'stripe_wrapper',
		icon: '/icons/stripe.png',
		description: 'Stripe Payment processing and subscription management',
	},
	{
		gateway: 'phonepe',
		name: 'PhonePe',
		slug: 'phonepe_wrapper',
		icon: '/icons/phonepe.png',
		description: 'PhonePe Payment processing and subscription management',
	},
	{
		gateway: 'razorpay',
		slug: 'razorpay_wrapper',
		icon: '/icons/razorpay.png',
		name: 'Razorpay',
		description: 'Razorpay Payment processing and subscription management',
	},
	{
		gateway: 'paytm',
		slug: 'paytm_wrapper',
		icon: '/icons/paytm.png',
		name: 'Paytm',
		description: 'Paytm Payment processing and subscription management',
	},
];
