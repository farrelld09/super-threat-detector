import { BrowserRouter, Navigate,Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import NotFound from './pages/NotFound';
import ThreatOverview from './pages/ThreatOverview';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/tenant/tenant-1" />} />
          <Route path="tenant/:tenantId/project/:projectId?" element={<ThreatOverview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
