import { memo, useMemo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import threatsByTenant from '../data/threatsByTenant';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff4d4f'];

export const CategoryBreakdownChart = memo(({ tenantId, projectId }: { tenantId: string | null; projectId: string | null }) => {
  if (!tenantId || !projectId) return null;

  const data = useMemo(() => {
    const threats = threatsByTenant[tenantId]?.[projectId] ?? [];
    const counts: Record<string, number> = {};
    for (const threat of threats) {
      counts[threat.category] = (counts[threat.category] || 0) + 1;
    }
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
            isAnimationActive={false}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});
