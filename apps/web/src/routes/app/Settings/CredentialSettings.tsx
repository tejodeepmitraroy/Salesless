import ApiKeysSettings from '@/routes/settings/settings/Screens/ApiKeysSettings';
import WebHookSettings from '@/routes/settings/settings/Screens/WebHookSettings';

const CredentialSettings = () => {
	return (
		<>
			<ApiKeysSettings />
			<WebHookSettings />
		</>
	);
};

export default CredentialSettings;
