import AddressSettings from '@/pages/settings/settings/Screens/AddressSettings';
import RegionalSettings from '@/pages/settings/settings/Screens/RegionalSettings';
import DeactivateStore from '@/pages/settings/settings/Screens/DeactivateStore';
import DangerZone from '@/pages/settings/settings/Screens/DangerZone';
import General from '@/pages/settings/settings/Screens/GeneralSettings';

import Settings from './Settings';

const GeneralSettings = () => {
	return (
		<Settings>
			<General />
			<AddressSettings />
			<RegionalSettings />
			<DeactivateStore />
			<DangerZone />
		</Settings>
	);
};

export default GeneralSettings;
