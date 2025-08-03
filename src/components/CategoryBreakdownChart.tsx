import { memo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useThreatStore } from '../store/useThreatStore';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff4d4f'];

export const CategoryBreakdownChart = memo(() => {
  const categoryData = useThreatStore(s => s.categoryData);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Threats by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            isAnimationActive={false}
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});
