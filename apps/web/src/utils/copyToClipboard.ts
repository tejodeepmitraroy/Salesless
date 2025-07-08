import { toast } from 'sonner';

export const copyToClipboard = async (text: string, label: string) => {
	try {
		await navigator.clipboard.writeText(text);
		toast('Copied!', {
			description: `${label} copied to clipboard.`,
		});
	} catch {
		toast('Failed to copy', {
			description: 'Could not copy to clipboard.',
			// variant: 'destructive',
		});
	}
};
