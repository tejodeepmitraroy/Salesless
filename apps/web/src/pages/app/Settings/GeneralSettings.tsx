import AddressSettings from '@/pages/settings/settings/Screens/AddressSettings';
import RegionalSettings from '@/pages/settings/settings/Screens/RegionalSettings';
import DeactivateStore from '@/pages/settings/settings/Screens/DeactivateStore';
import DangerZone from '@/pages/settings/settings/Screens/DangerZone';
import General from '@/pages/settings/settings/Screens/GeneralSettings';

const GeneralSettings = () => {
	return (
		<>
			<General />
			<AddressSettings />
			<RegionalSettings />
			<DeactivateStore />
			<DangerZone />
		</>
	);
};

export default GeneralSettings;
