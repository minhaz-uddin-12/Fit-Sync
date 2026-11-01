import { FaClipboardList } from "react-icons/fa";
import { DashboardShell, EmptyState } from "../../components/ui/Dashboard";

const Settings = () => {
  return (
    <DashboardShell title="System settings">
      <EmptyState icon={FaClipboardList} title="Nothing here yet" description="This section is coming soon." />
    </DashboardShell>
  );
};

export default Settings;
