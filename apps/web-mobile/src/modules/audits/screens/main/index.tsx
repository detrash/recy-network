import { AuditsList } from '../../components/list';
import { useAudits } from '../../services/audits';

export default function AuditorScreen() {
  const { data: auditsData, isFetching: isFetchingAudits } = useAudits();

  return (
    <div className="container p-4 mx-auto">
      <AuditsList data={auditsData} isFetching={isFetchingAudits} />
    </div>
  );
}
