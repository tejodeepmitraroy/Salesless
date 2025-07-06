import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import React from 'react';

interface EmailVerificationProps {
	verificationCode?: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: '';

export default function EmailVerificationTemplate({
	verificationCode,
}: EmailVerificationProps) {
	return (
		<Html lang="en">
			<Head />
			<Body className="bg-white text-[#212121] m-0 p-0">
				<Preview>AWS Email Verification</Preview>
				<Container className="bg-gray-200 p-5 max-w-[600px] mx-auto">
					<Section className="bg-white">
						<Section className="bg-[#252f3d] flex py-5 items-center justify-center">
							<Img
								src={`${baseUrl}/static/aws-logo.png`}
								width="75"
								height="45"
								alt="AWS's Logo"
							/>
						</Section>
						<Section className="py-6 px-9">
							<Heading className="text-[#333] font-sans text-xl font-bold mb-4">
								Verify your email address
							</Heading>
							<Text className="text-[#333] font-sans text-sm mb-4">
								Thanks for starting the new AWS account creation process. We
								want to make sure it&apos;s really you. Please enter the
								following verification code when prompted. If you don&apos;t
								want to create an account, you can ignore this message.
							</Text>
							<Section className="flex flex-col items-center justify-center my-6">
								<Text className="text-[#333] font-sans text-sm font-bold mb-2 text-center">
									Verification code
								</Text>
								<Text className="text-[#333] font-sans text-4xl font-bold my-3 text-center">
									{verificationCode}
								</Text>
								<Text className="text-[#333] font-sans text-sm text-center">
									(This code is valid for 10 minutes)
								</Text>
							</Section>
						</Section>
						<Hr className="border-t border-gray-200" />
						<Section className="py-6 px-9">
							<Text className="text-[#333] font-sans text-sm m-0">
								Amazon Web Services will never email you and ask you to disclose
								or verify your password, credit card, or banking account number.
							</Text>
						</Section>
					</Section>
					<Text className="text-[#333] font-sans text-xs px-5 py-4">
						This message was produced and distributed by Amazon Web Services,
						Inc., 410 Terry Ave. North, Seattle, WA 98109. 2022, Amazon Web
						Services, Inc.. All rights reserved. AWS is a registered trademark
						of{' '}
						<Link
							href="https://amazon.com"
							target="_blank"
							className="text-[#2754C5] font-sans text-xs underline"
						>
							Amazon.com
						</Link>
						, Inc. View our{' '}
						<Link
							href="https://amazon.com"
							target="_blank"
							className="text-[#2754C5] font-sans text-xs underline"
						>
							privacy policy
						</Link>
						.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

// EmailVerification.PreviewProps = {
// 	verificationCode: '596853',
// } satisfies EmailVerificationProps;
