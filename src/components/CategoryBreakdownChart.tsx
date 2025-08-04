import { memo } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useThreatStore } from '../store/useThreatStore';

const CATEGORY_COLORS: Record<string, string> = {
  Runtime: '#8884d8',
  Identity: '#82ca9d',
  Config: '#ffc658',
  Network: '#ff4d4f',
};


export const CategoryBreakdownChart = memo(() => {
  const rawCategoryData = useThreatStore(s => s.categoryData);
  const total = rawCategoryData.reduce((sum, entry) => sum + entry.value, 0);
    const categoryData = rawCategoryData.map(entry => ({
    ...entry,
    percent: parseFloat(((entry.value / total) * 100).toFixed(2))
  }));


  return (
    <div style={{ padding: '1rem' }}>
      <h2>Threats by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
           <Pie
            data={categoryData}
            dataKey="percent"
            nameKey="name"
            outerRadius={100}
            // isAnimationActive={false}
            label={({ name, percent }) => `${name} (${percent?.toFixed(0)}%)`}
          >
            {categoryData.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#ccc'} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});
