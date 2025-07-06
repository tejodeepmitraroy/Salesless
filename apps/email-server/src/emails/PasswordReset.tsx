import * as React from 'react';

interface PasswordResetProps {
	userFirstName: string;
	resetLink: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
	userFirstName,
	resetLink,
}) => {
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
				Password Reset Request
			</h1>

			<p>Hello {userFirstName},</p>

			<p>
				You have requested to reset your password. Please click the button below
				to set a new password:
			</p>

			<div style={{ margin: '30px 0' }}>
				<a
					href={resetLink}
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
					Reset Password
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
				{resetLink}
			</p>

			<p
				style={{
					marginTop: '30px',
					fontSize: '14px',
					color: '#666',
				}}
			>
				If you didn&apos;t request a password reset, you can safely ignore this
				email.
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

export default PasswordReset;
