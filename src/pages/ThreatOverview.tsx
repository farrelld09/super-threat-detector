import React from 'react';
import ThreatTable from '../components/ThreatTable';
import { tenants } from '../data/tenants';
import { useTenantStore } from '../store/useTenantStore';
import styles from './ThreatOverview.module.css';

export default function ThreatOverview() {
  const { tenantId, projectId } = useTenantStore();

  const tenant = tenants.find(t => t.id === tenantId);
  const project = tenant?.projects.find(p => p.id === projectId);

  return (
    <div className={styles.container}>
      <h1>Threat Overview</h1>
      <p>
        Viewing alerts for <strong>Tenant:</strong> {tenant ? tenant.name : tenantId || 'Unknown'}
        {project && (
          <>
            {' '}
            | <strong>Project:</strong> {project.name}
          </>
        )}
      </p>
    <ThreatTable />    
  </div>
  );
}
