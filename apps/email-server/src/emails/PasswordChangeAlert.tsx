import * as React from 'react';

interface PasswordChangeAlertProps {
	userFirstName: string;
}

export const PasswordChangeAlert: React.FC<PasswordChangeAlertProps> = ({
	userFirstName,
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
				Password Changed Successfully
			</h1>

			<p>Hello {userFirstName},</p>

			<p>
				Your password has been changed successfully. If you didn&apos;t make
				this change, please contact our support team immediately.
			</p>

			<div style={{ margin: '30px 0' }}>
				<a
					href="https://yoursupportlink.com"
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
					Contact Support
				</a>
			</div>

			<p
				style={{
					marginTop: '30px',
					fontSize: '14px',
					color: '#666',
				}}
			>
				This is a security notification. If you didn&apos;t make this change,
				please secure your account immediately.
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

export default PasswordChangeAlert;
