import { memo, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { type Threat } from '../data/mockThreats'; // or your schema
import { useThreatStore } from '../store/useThreatStore';
import styles from './ThreatTable.module.css';

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

export const ThreatTable = memo(() => {
  const threats = useThreatStore(s => s.rawThreats);

  const [severity, setSeverity] = useState('All');
  const [category, setCategory] = useState('All');
  const [timeRange, setTimeRange] = useState('All');

  const cutoff = getCutoff(timeRange);
  
  const filteredThreats = useMemo(() => {
    return threats.filter((threat) => {
      if (severity !== 'All' && threat.severity !== severity) return false;
      if (category !== 'All' && threat.category !== category) return false;
      if (timeRange !== 'All' && (cutoff && new Date(threat.time).getTime() < cutoff)) return false;
      return true;
    });
  }, [threats, severity, category, timeRange, cutoff]);

  function handleInvestigate(threat: Threat) {
    alert(`Investigating resource: ${threat.summary}`);
  }

  function handleIsolate(threat: Threat) {
    toast.success(`Workload ${threat.summary} isolated.`);
    // or simulate animation here
  }

  function handleCopySlack(threat: Threat) {
    const msg = `[${threat.severity}] ${threat.summary} on ${threat.resourceType}`;
    navigator.clipboard.writeText(msg);
    toast(`Slack summary copied`);
  }

  function handleCreateJira(threat: Threat) {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(`
        <h1>JIRA Ticket</h1>
        <p><strong>Title:</strong> ${threat.summary}</p>
        <p><strong>Severity:</strong> ${threat.severity}</p>
        <p><strong>Category:</strong> ${threat.category}</p>
        <p><strong>Project:</strong> ${threat.projectId}</p>
      `);
    }
  }


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
            <th>Actions</th>
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
              <td>
                {(threat.severity === 'High' || threat.severity === 'Critical') && (
                  <div className={styles.actions}>
                    <button onClick={() => handleInvestigate(threat)}>🔍 Investigate</button>
                    <button onClick={() => handleIsolate(threat)}>🚫 Isolate</button>
                    <button onClick={() => handleCopySlack(threat)}>📋 Copy</button>
                    <button onClick={() => handleCreateJira(threat)}>📄 JIRA</button>
                  </div>
                )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
