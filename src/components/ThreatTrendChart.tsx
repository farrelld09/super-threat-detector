import { memo } from 'react';
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
import { useThreatStore } from '../store/useThreatStore';

export const ThreatTrendChart = memo(() => {
  const trendData = useThreatStore(s => s.trendData);

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
