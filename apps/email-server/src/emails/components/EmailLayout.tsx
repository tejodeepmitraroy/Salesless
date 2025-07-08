import {
	Html,
	Head,
	Body,
	Container,
	Section,
	Img,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailLayoutProps {
	children: React.ReactNode;
	previewText?: string;
	title?: string;
}

export const baseStyles = {
	fontFamily: 'Arial, sans-serif',
	lineHeight: '1.6',
	color: '#333333',
	fontSize: '16px',
};

const containerStyles = {
	maxWidth: '600px',
	margin: '0 auto',
	padding: '20px',
	border: '1px solid #eaeaea',
	borderRadius: '8px',
};

const headerStyles = {
	backgroundColor: '#4f46e5',
	padding: '20px 0',
	textAlign: 'center' as const,
	marginBottom: '20px',
	borderRadius: '8px 8px 0 0',
};

const logoStyles = {
	maxWidth: '150px',
	height: 'auto',
};

const footerStyles = {
	textAlign: 'center' as const,
	fontSize: '14px',
	color: '#666666',
	marginTop: '30px',
	paddingTop: '20px',
	borderTop: '1px solid #eaeaea',
};

export const EmailLayout = ({
	previewText = '',
	title = 'SalesSync Notification',
}: EmailLayoutProps) => {
	return (
		<Html>
			<Head>
				<title>{title}</title>
			</Head>
			<Body style={baseStyles}>
				<Container style={containerStyles}>
					<Section style={headerStyles}>
						<Img
							src={`${process.env.APP_URL}/logo.png`}
							alt="SalesSync"
							style={logoStyles}
						/>
					</Section>

					{previewText && (
						<Text style={{ display: 'none' }}>{previewText}</Text>
					)}

					{/* {children} */}

					<Section style={footerStyles}>
						<Text>
							© {new Date().getFullYear()} SalesSync. All rights reserved.
						</Text>
						<Text
							style={{ marginTop: '10px', fontSize: '12px', color: '#999' }}
						>
							This email was sent to you as part of your SalesSync account. If
							you didn&apos;t request this, please ignore this email.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default EmailLayout;
