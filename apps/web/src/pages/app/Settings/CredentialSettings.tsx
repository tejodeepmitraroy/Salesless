import Settings from './Settings';
import ApiKeysSettings from '@/pages/settings/settings/Screens/ApiKeysSettings';
import WebHookSettings from '@/pages/settings/settings/Screens/WebHookSettings';

const CredentialSettings = () => {
	return (
		<Settings>
			<ApiKeysSettings />
			<WebHookSettings />
		</Settings>
	);
};

export default CredentialSettings;
