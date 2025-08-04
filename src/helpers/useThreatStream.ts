import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useThreatStore } from '../store/useThreatStore';
import { generateRandomThreat } from '../utils/generateRandomThreat';

export function useThreatStream(active: boolean, tenantId: string | null, projectId: string | null) {
  const addThreat = useThreatStore(s => s.addThreat);

  useEffect(() => {
    if (!active || !tenantId || !projectId) return;

    const interval = setInterval(() => {
      const newThreat = generateRandomThreat(tenantId, projectId);
      if (['High', 'Critical'].includes(newThreat.severity)) {
        toast(`${newThreat.severity} Threat: ${newThreat.summary}`, {
          icon: '⚠️',
          duration: 5000,
        });
      }
      addThreat(newThreat);
    }, 15000);

    return () => clearInterval(interval);
  }, [active, tenantId, projectId, addThreat]);
}
