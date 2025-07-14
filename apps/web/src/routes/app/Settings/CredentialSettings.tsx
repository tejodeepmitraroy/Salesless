import ApiKeysSettings from '@/routes/app/Settings/ApiKeysSettings';
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
