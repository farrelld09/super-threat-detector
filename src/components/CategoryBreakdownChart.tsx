import { useMemo } from 'react';
import {
Cell, Legend, Pie,   PieChart, ResponsiveContainer,
Tooltip} from 'recharts';
import mockThreats from '../data/threats.json';
import { useTenantStore } from '../store/useTenantStore';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff4d4f'];

export default function CategoryBreakdownChart() {
  const tenantId = useTenantStore((s) => s.tenantId);
  const projectId = useTenantStore((s) => s.projectId);

  const data = useMemo(() => {
    const counts: Record<string, number> = {};

    mockThreats.forEach(threat => {
      if (threat.tenantId !== tenantId) return;
      if (projectId && threat.projectId !== projectId) return;

      counts[threat.category] = (counts[threat.category] || 0) + 1;
    });

    return Object.entries(counts).map(([category, value]) => ({ name: category, value }));
  }, [tenantId, projectId]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Threats by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
