import { useNavigate, useParams } from 'react-router-dom';
import { tenants } from '../data/tenants';
import { useTenantStore } from '../store/useTenantStore';
import styles from './TenantProjectSwitcher.module.css';

export default function TenantProjectSwitcher() {
  const { tenantId: routeTenantId, projectId: routeProjectId } = useParams();
  const navigate = useNavigate();

  const { setTenant, setProject } = useTenantStore();

  const handleTenantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTenantId = e.target.value;
    const firstProject = tenants.find(t => t.id === newTenantId)?.projects[0] || null;
    
    setTenant(newTenantId, firstProject?.id || null);
    navigate(`/tenant/${newTenantId}${firstProject ? `/project/${firstProject.id}` : ''}`);
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!routeTenantId) return;
    const newProjectId = e.target.value;
    
    setProject(newProjectId);
    navigate(`/tenant/${routeTenantId}/project/${newProjectId}`);
  };

  const currentTenant = tenants.find(t => t.id === routeTenantId);
  const projects = currentTenant?.projects || [];

  return (
    <div className={styles.switcher}>
      <label className={styles.tenantSwitcher}>
        Tenant:{' '}
        <select value={routeTenantId} onChange={handleTenantChange}>
          {tenants.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      {projects.length > 0 && (
        <label className={styles.projectSwitcher}>
          Project:{' '}
          <select value={routeProjectId || ''} onChange={handleProjectChange}>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                { p.name || 'No Project' }
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
