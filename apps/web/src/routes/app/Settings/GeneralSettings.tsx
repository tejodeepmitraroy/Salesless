import AddressSettings from '@/routes/settings/settings/Screens/AddressSettings';
import RegionalSettings from '@/routes/settings/settings/Screens/RegionalSettings';
// import DeactivateStore from '@/routes/settings/settings/Screens/DeactivateStore';
import DangerZone from '@/routes/settings/settings/Screens/DangerZone';
import General from '@/routes/settings/settings/Screens/GeneralSettings';

const GeneralSettings = () => {
	return (
		<>
			<General />
			<AddressSettings />
			<RegionalSettings />
			{/* <DeactivateStore /> */}
			<DangerZone />
		</>
	);
};

export default GeneralSettings;
