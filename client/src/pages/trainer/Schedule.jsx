import { FaClipboardList } from "react-icons/fa";
import { DashboardShell, EmptyState } from "../../components/ui/Dashboard";

const Schedule = () => {
  return (
    <DashboardShell title="Schedule">
      <EmptyState icon={FaClipboardList} title="Nothing here yet" description="This section is coming soon." />
    </DashboardShell>
  );
};

export default Schedule;
