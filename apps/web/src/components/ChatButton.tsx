import { Button } from './ui/button';
import { PhoneCall } from 'lucide-react';

const ChatButton = () => {
	return (
		<div className="fixed right-5 bottom-5 z-50">
			<Button className="bg-primary rounded-full p-2 text-white">
				<PhoneCall />
			</Button>
		</div>
	);
};

export default ChatButton;
