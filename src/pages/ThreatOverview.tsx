import AiAssistant from '../components/AiAssistant';
import { CategoryBreakdownChart } from '../components/CategoryBreakdownChart.tsx';
import { ThreatTable } from '../components/ThreatTable';
import { ThreatTrendChart } from '../components/ThreatTrendChart.tsx';
import { tenants } from '../data/tenants';
import { useThreatStream } from '../helpers/useThreatStream';
import { useThreatStore } from '../store/useThreatStore.ts';
import styles from './ThreatOverview.module.css';

export default function ThreatOverview() {
  const tenantId = useThreatStore((s) => s.tenantId);
  const projectId = useThreatStore((s) => s.projectId);
  useThreatStream(true, tenantId, projectId);

  const tenant = tenants.find(t => t.id === tenantId);
  const project = tenant?.projects.find(p => p.id === projectId);

  return (
    <div className={styles.container}>
      <h1>Threat Overview</h1>
      <p>
        Viewing alerts for <strong>Tenant:</strong> { tenant ? tenant.name : tenantId || 'Unknown' }
        {project && (
          <>
            {' '}
            | <strong>Project:</strong> { project.name }
          </>
        )}
      </p>
      <ThreatTrendChart />
      <CategoryBreakdownChart />
      <ThreatTable />
      <AiAssistant />
  </div>
  );
}
