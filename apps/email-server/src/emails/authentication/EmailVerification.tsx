import React from 'react';

interface EmailVerificationProps {
	userName: string;
	verificationLink: string;
}

const EmailVerification = ({
	userName,
	verificationLink,
}: EmailVerificationProps) => {
	return (
		<div
			style={{
				fontFamily: 'Arial, sans-serif',
				lineHeight: '1.6',
				color: '#333',
				maxWidth: '600px',
				margin: '0 auto',
				padding: '20px',
			}}
		>
			<h1
				style={{
					color: '#2563eb',
					fontSize: '24px',
					marginBottom: '20px',
				}}
			>
				Verify Your Email Address
			</h1>

			<p>Hello {userName},</p>

			<p>
				Thank you for signing up! Please verify your email address by clicking
				the button below:
			</p>

			<div style={{ margin: '30px 0' }}>
				<a
					href={verificationLink}
					style={{
						display: 'inline-block',
						backgroundColor: '#2563eb',
						color: '#ffffff',
						padding: '12px 24px',
						borderRadius: '4px',
						textDecoration: 'none',
						fontWeight: 'bold',
					}}
				>
					Verify Email Address
				</a>
			</div>

			<p>Or copy and paste this link into your browser:</p>
			<p
				style={{
					wordBreak: 'break-all',
					padding: '10px',
					backgroundColor: '#f5f5f5',
					borderRadius: '4px',
					fontSize: '14px',
				}}
			>
				{verificationLink}
			</p>

			<p
				style={{
					marginTop: '30px',
					fontSize: '14px',
					color: '#666',
				}}
			>
				If you didn&apos;t create an account, you can safely ignore this email.
			</p>

			<p
				style={{
					marginTop: '30px',
					borderTop: '1px solid #eee',
					paddingTop: '20px',
					fontSize: '12px',
					color: '#999',
				}}
			>
				This email was sent from SalesSync. Please do not reply to this email.
			</p>
		</div>
	);
};

export default EmailVerification;
