import { CategoryBreakdownChart } from '../components/CategoryBreakdownChart.tsx';
import { ThreatTable } from '../components/ThreatTable';
import { ThreatTrendChart } from '../components/ThreatTrendChart.tsx';
import { tenants } from '../data/tenants';
import { useTenantStore } from '../store/useTenantStore';
import styles from './ThreatOverview.module.css';

export default function ThreatOverview() {
  const tenantId = useTenantStore((s) => s.tenantId);
  const projectId = useTenantStore((s) => s.projectId);

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
  </div>
  );
}
