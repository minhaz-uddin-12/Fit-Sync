import { FaClipboardList } from "react-icons/fa";
import { DashboardShell, EmptyState } from "../../components/ui/Dashboard";

const Reports = () => {
  return (
    <DashboardShell title="Reports">
      <EmptyState icon={FaClipboardList} title="Nothing here yet" description="This section is coming soon." />
    </DashboardShell>
  );
};

export default Reports;
