import { Tailwind } from '@react-email/components';
import React from 'react';

const TailwindCssWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							brand: '#007291',
						},
					},
				},
			}}
		>
			<div className="px-4">{children}</div>
		</Tailwind>
	);
};

export default TailwindCssWrapper;
