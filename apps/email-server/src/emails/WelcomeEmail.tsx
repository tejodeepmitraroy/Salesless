import * as React from 'react';

interface WelcomeEmailProps {
	userFirstName: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
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
				textAlign: 'center',
			}}
		>
			<div
				style={{
					marginBottom: '30px',
					paddingBottom: '20px',
					borderBottom: '1px solid #eee',
				}}
			>
				<h1
					style={{
						color: '#2563eb',
						fontSize: '28px',
						marginBottom: '10px',
					}}
				>
					Welcome to SalesSync, {userFirstName}!
				</h1>
				<p
					style={{
						color: '#6b7280',
						fontSize: '16px',
						margin: '0',
					}}
				>
					We&apos;re thrilled to have you on board
				</p>
			</div>

			<div
				style={{
					backgroundColor: '#f8fafc',
					padding: '30px',
					borderRadius: '8px',
					marginBottom: '30px',
					textAlign: 'left',
				}}
			>
				<h2
					style={{
						color: '#1e40af',
						fontSize: '20px',
						marginTop: '0',
					}}
				>
					Getting Started
				</h2>

				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						margin: '20px 0',
					}}
				>
					<div
						style={{
							backgroundColor: '#dbeafe',
							color: '#1e40af',
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: '15px',
							flexShrink: 0,
						}}
					>
						1
					</div>
					<div>
						<h3
							style={{
								margin: '0 0 5px 0',
								fontSize: '16px',
								color: '#111827',
							}}
						>
							Complete Your Profile
						</h3>
						<p
							style={{
								margin: '0',
								color: '#4b5563',
								fontSize: '14px',
							}}
						>
							Add your business details and preferences to get personalized
							recommendations.
						</p>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						margin: '20px 0',
					}}
				>
					<div
						style={{
							backgroundColor: '#dbeafe',
							color: '#1e40af',
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: '15px',
							flexShrink: 0,
						}}
					>
						2
					</div>
					<div>
						<h3
							style={{
								margin: '0 0 5px 0',
								fontSize: '16px',
								color: '#111827',
							}}
						>
							Connect Your Store
						</h3>
						<p
							style={{
								margin: '0',
								color: '#4b5563',
								fontSize: '14px',
							}}
						>
							Import your products and start managing your inventory in one
							place.
						</p>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						margin: '20px 0 0 0',
					}}
				>
					<div
						style={{
							backgroundColor: '#dbeafe',
							color: '#1e40af',
							width: '30px',
							height: '30px',
							borderRadius: '50%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							marginRight: '15px',
							flexShrink: 0,
						}}
					>
						3
					</div>
					<div>
						<h3
							style={{
								margin: '0 0 5px 0',
								fontSize: '16px',
								color: '#111827',
							}}
						>
							Explore Features
						</h3>
						<p
							style={{
								margin: '0',
								color: '#4b5563',
								fontSize: '14px',
							}}
						>
							Discover powerful tools to grow your eCommerce business.
						</p>
					</div>
				</div>
			</div>

			<div
				style={{
					margin: '30px 0',
					textAlign: 'center',
				}}
			>
				<a
					href="https://yourapp.com/dashboard"
					style={{
						display: 'inline-block',
						backgroundColor: '#2563eb',
						color: '#ffffff',
						padding: '14px 28px',
						borderRadius: '6px',
						textDecoration: 'none',
						fontWeight: 'bold',
						fontSize: '16px',
						boxShadow:
							'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					}}
				>
					Go to Dashboard
				</a>
			</div>

			<div
				style={{
					marginTop: '40px',
					paddingTop: '20px',
					borderTop: '1px solid #eee',
					fontSize: '14px',
					color: '#6b7280',
				}}
			>
				<p>
					Need help? Our{' '}
					<a
						href="https://yourapp.com/support"
						style={{
							color: '#2563eb',
							textDecoration: 'none',
							fontWeight: '500',
						}}
					>
						support team
					</a>{' '}
					is here to help you get started.
				</p>

				<p
					style={{
						marginTop: '20px',
						fontSize: '12px',
						color: '#9ca3af',
					}}
				>
					© {new Date().getFullYear()} SalesSync. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default WelcomeEmail;
