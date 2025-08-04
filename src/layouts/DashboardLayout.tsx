import { Outlet } from 'react-router-dom';
import TenantProjectSwitcher from '../components/TenantProjectSwitcher';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <h1>Hero Threat Dashboard</h1>
      <p>Welcome to the Hero Threat Dashboard. Use the switcher below to select a tenant and project.</p>
      <TenantProjectSwitcher />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
