import AddressSettings from '@/features/Settings/components/AddressSettings';
import RegionalSettings from '@/features/Settings/components/RegionalSettings';
// import DeactivateStore from '@/routes/settings/settings/Screens/DeactivateStore';
import DangerZone from '@/features/Settings/components/DangerZone';
import General from '@/features/Settings/components/GeneralSettings';

const GeneralSettings = () => {
	return (
		<section className="flex w-full flex-col gap-4 pb-14">
			<General />
			<AddressSettings />
			<RegionalSettings />
			<DangerZone />
		</section>
	);
};

export default GeneralSettings;
