import React, { useState } from 'react';
import styles from './ThreatTable.module.css';
import { mockThreats } from '../data/mockThreats';
import type { Threat } from '../data/mockThreats';
import { useTenantStore } from '../store/useTenantStore';

const severityOptions = ['All', 'Low', 'Medium', 'High', 'Critical'];
const categoryOptions = ['All', 'Runtime', 'Identity', 'Config', 'Network'];
const timeRangeOptions = ['All', '1h', '24h', '7d'];

function getCutoff(range: string): number {
  const now = Date.now();
  switch (range) {
    case '1h':
      return now - 60 * 60 * 1000;
    case '24h':
      return now - 24 * 60 * 60 * 1000;
    case '7d':
      return now - 7 * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}

export default function ThreatTable() {
  const { tenantId, projectId } = useTenantStore();

  const [severity, setSeverity] = useState('All');
  const [category, setCategory] = useState('All');
  const [timeRange, setTimeRange] = useState('All');

  const cutoff = getCutoff(timeRange);

  const filteredThreats = mockThreats.filter((threat: Threat) => {
    if (threat.tenantId !== tenantId) return false;
    if (projectId && threat.projectId !== projectId) return false;
    if (severity !== 'All' && threat.severity !== severity) return false;
    if (category !== 'All' && threat.category !== category) return false;
    if (cutoff && new Date(threat.time).getTime() < cutoff) return false;
    return true;
  });

  return (
    <div className={styles.tableContainer}>
      <div className={styles.filters}>
        <label>
          Severity:
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            {severityOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Time Range:
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            {timeRangeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Severity</th>
            <th>Time</th>
            <th>Resource</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredThreats.map((threat) => (
            <tr key={threat.id}>
              <td>{threat.summary}</td>
              <td>{threat.severity}</td>
              <td>{new Date(threat.time).toLocaleString()}</td>
              <td>{threat.resourceType}</td>
              <td>{threat.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
