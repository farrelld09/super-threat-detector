import { useMemo, memo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import threatsByTenant from '../data/threatsByTenant';

function useTrendData(tenantId: string, projectId: string) {
  return useMemo(() => {
    const dataMap: Record<string, Record<string, number>> = {};
    const threats = threatsByTenant[tenantId]?.[projectId] ?? [];

    for (const threat of threats) {
      const date = new Date(threat.time);
      const hourKey = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).toISOString();
      if (!dataMap[hourKey]) dataMap[hourKey] = { Low: 0, Medium: 0, High: 0, Critical: 0 };
      dataMap[hourKey][threat.severity]++;
    }

    return Object.entries(dataMap)
      .map(([time, counts]) => ({ time, ...counts }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [tenantId, projectId]);
}

export const ThreatTrendChart = memo(
  (props: { tenantId: string | null; projectId: string | null }) => {
    const { tenantId, projectId } = props;
    if (!tenantId || !projectId) return null;

    const trendData = useTrendData(tenantId, projectId);

    return (
      <div style={{ padding: '1rem' }}>
        <h2>Threat Trend (by Severity)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(v) => new Date(v).toLocaleTimeString()}
            />
            <YAxis domain={[0, 10]} tickCount={11} allowDataOverflow={false} />
            <Tooltip labelFormatter={(v) => new Date(v).toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="Low" stroke="#8884d8" isAnimationActive={false} />
            <Line type="monotone" dataKey="Medium" stroke="#82ca9d" isAnimationActive={false} />
            <Line type="monotone" dataKey="High" stroke="#ffc658" isAnimationActive={false} />
            <Line type="monotone" dataKey="Critical" stroke="#ff4d4f" isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);
