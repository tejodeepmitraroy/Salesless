import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Img,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';
import React from 'react';

interface PasswordResetEmailProps {
	userFirstName?: string;
	resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: '';

export const PasswordResetEmail = ({
	userFirstName,
	resetPasswordLink = '#',
}: PasswordResetEmailProps) => {
	const currentYear = new Date().getFullYear();

	return (
		<Html>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Body className="bg-gray-50 p-2.5 font-sans">
				<Preview>Reset your password - SalesSync</Preview>
				<Tailwind>
					<Container className="max-w-2xl mx-auto my-0">
						<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
							{/* Header */}
							<div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
								<div className="inline-block bg-white p-3 rounded-full shadow-md mb-4">
									<Img
										src={`${baseUrl}/static/logo.png`}
										width="48"
										height="48"
										alt="SalesSync"
										className="w-12 h-12 mx-auto"
									/>
								</div>
								<h1 className="text-2xl font-semibold text-white mb-2">
									Password Reset Request
								</h1>
								<p className="text-blue-100 text-sm">
									We&apos;ve received a request to reset your password
								</p>
							</div>

							{/* Content */}
							<div className="p-8">
								<Section className="space-y-6">
									<Text className="text-gray-700 text-base leading-relaxed">
										Hello {userFirstName || 'there'},
									</Text>

									<Text className="text-gray-700 text-base leading-relaxed">
										We received a request to reset your SalesSync account
										password. Click the button below to create a new password:
									</Text>

									<div className="py-4 text-center">
										<Button
											href={resetPasswordLink}
											className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-8 rounded-lg text-sm shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 inline-block"
										>
											Reset My Password
										</Button>
									</div>

									<div className="relative my-6">
										<div className="absolute inset-0 flex items-center">
											<div className="w-full border-t border-gray-200"></div>
										</div>
										<div className="relative flex justify-center text-sm">
											<span className="px-2 bg-white text-gray-500">
												Or copy this link
											</span>
										</div>
									</div>

									<div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
										<Text className="text-sm text-gray-600 break-all font-mono">
											{resetPasswordLink}
										</Text>
									</div>

									<Text className="text-gray-600 text-sm leading-relaxed">
										This link will expire in 1 hour for security reasons. If you
										didn&apos;t request this password reset, please ignore this
										email or contact our support team if you have any questions.
									</Text>

									<Text className="text-gray-700 text-base leading-relaxed">
										Best regards,
										<br />
										<span className="font-medium">The SalesSync Team</span>
									</Text>
								</Section>
							</div>

							{/* Footer */}
							<div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
								<div className="text-center">
									<Img
										src={`${baseUrl}/static/logo.png`}
										width="24"
										height="24"
										alt="SalesSync"
										className="mx-auto mb-3 opacity-70"
									/>
									<p className="text-xs text-gray-500 mb-1">
										{currentYear} SalesSync. All rights reserved.
									</p>
									<p className="text-xs text-gray-400">
										This email was sent to you as part of your SalesSync
										account.
									</p>
									<div className="mt-3 space-x-4">
										<a
											href="#"
											className="text-gray-400 hover:text-gray-600 text-sm"
										>
											Help Center
										</a>
										<span className="text-gray-300">•</span>
										<a
											href="#"
											className="text-gray-400 hover:text-gray-600 text-sm"
										>
											Privacy Policy
										</a>
										<span className="text-gray-300">•</span>
										<a
											href="#"
											className="text-gray-400 hover:text-gray-600 text-sm"
										>
											Contact Us
										</a>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</Tailwind>
			</Body>
		</Html>
	);
};

PasswordResetEmail.PreviewProps = {
	userFirstName: 'John',
	resetPasswordLink: 'https://app.salessync.com/reset-password?token=abc123',
} as PasswordResetEmailProps;

export default PasswordResetEmail;
