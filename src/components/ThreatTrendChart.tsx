import { useMemo } from 'react';
import {
CartesianGrid, Legend, Line,   LineChart, ResponsiveContainer,
Tooltip, XAxis, YAxis} from 'recharts';
import mockThreats from '../data/threats.json';

function useTrendData(tenantId: string, projectId: string) {
  const trendData = useMemo(() => {
    const dataMap: Record<string, Record<string, number>> = {};

    mockThreats.forEach(threat => {
      if (threat.tenantId !== tenantId) return;
      if (projectId && threat.projectId !== projectId) return;

      const date = new Date(threat.time);
      const hourKey = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
        .toISOString();

      if (!dataMap[hourKey]) {
        dataMap[hourKey] = { Low: 0, Medium: 0, High: 0, Critical: 0 };
      }
      dataMap[hourKey][threat.severity]++;
    });

    return Object.entries(dataMap).map(([time, counts]) => ({
      time,
      ...counts
    })).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [tenantId, projectId]);
  
  return trendData;
}

export default function ThreatTrendChart(props: { tenantId: string | null; projectId: string | null } ) {
  const { tenantId, projectId } = props;
  if (!tenantId || !projectId) return null; // Ensure tenantId is provided
  const trendData = useTrendData(tenantId, projectId);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Threat Trend (by Severity)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={(v) => new Date(v).toLocaleTimeString()} />
          <YAxis domain={[0, 20]} allowDataOverflow={false} />
          <Tooltip labelFormatter={(v) => new Date(v).toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="Low" stroke="#8884d8" />
          <Line type="monotone" dataKey="Medium" stroke="#82ca9d" />
          <Line type="monotone" dataKey="High" stroke="#ffc658" />
          <Line type="monotone" dataKey="Critical" stroke="#ff4d4f" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
