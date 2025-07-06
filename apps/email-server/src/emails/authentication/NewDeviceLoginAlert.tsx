import * as React from 'react';

interface NewDeviceLoginAlertProps {
	userFirstName: string;
	deviceInfo: string;
	timestamp: string;
}

export const NewDeviceLoginAlert: React.FC<NewDeviceLoginAlertProps> = ({
	userFirstName,
	deviceInfo,
	timestamp,
}) => {
	const formattedDate = new Date(timestamp).toLocaleString();

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
					color: '#dc2626',
					fontSize: '24px',
					marginBottom: '20px',
				}}
			>
				New Login Detected
			</h1>

			<p>Hello {userFirstName},</p>

			<p>A new login was detected on your account:</p>

			<div
				style={{
					backgroundColor: '#fef2f2',
					borderLeft: '4px solid #dc2626',
					padding: '12px 20px',
					margin: '20px 0',
					borderRadius: '4px',
				}}
			>
				<p style={{ margin: '5px 0' }}>
					<strong>Device:</strong> {deviceInfo}
				</p>
				<p style={{ margin: '5px 0' }}>
					<strong>Time:</strong> {formattedDate}
				</p>
			</div>

			<p>
				If this wasn&apos;t you, please secure your account immediately by
				changing your password.
			</p>

			<div style={{ margin: '30px 0' }}>
				<a
					href="https://yourapp.com/reset-password"
					style={{
						display: 'inline-block',
						backgroundColor: '#dc2626',
						color: '#ffffff',
						padding: '12px 24px',
						borderRadius: '4px',
						textDecoration: 'none',
						fontWeight: 'bold',
						marginRight: '10px',
					}}
				>
					Reset Password
				</a>
				<a
					href="https://yourapp.com/security"
					style={{
						display: 'inline-block',
						backgroundColor: '#f3f4f6',
						color: '#1f2937',
						padding: '12px 24px',
						borderRadius: '4px',
						textDecoration: 'none',
						fontWeight: 'bold',
						border: '1px solid #d1d5db',
					}}
				>
					Review Security
				</a>
			</div>

			<p
				style={{
					marginTop: '30px',
					fontSize: '14px',
					color: '#666',
				}}
			>
				If you recognize this activity, you can ignore this message.
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

export default NewDeviceLoginAlert;
