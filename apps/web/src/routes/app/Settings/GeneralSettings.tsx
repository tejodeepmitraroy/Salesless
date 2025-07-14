import AddressSettings from '@/features/Settings/components/AddressSettings';
import RegionalSettings from '@/features/Settings/components/RegionalSettings';
// import DeactivateStore from '@/routes/settings/settings/Screens/DeactivateStore';
import DangerZone from '@/features/Settings/components/DangerZone';
import General from '@/features/Settings/components/GeneralSettings';
import DeactivateStore from '@/features/Settings/components/DeactivateStore';

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
