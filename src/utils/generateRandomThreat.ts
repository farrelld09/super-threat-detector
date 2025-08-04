import { type Threat } from '../data/mockThreats';

const summaries = [
  'Hydra infiltration detected',
  'Mutant registry access attempt',
  'Shield firewall bypassed',
  'Speed Force destabilization',
  'Gamma burst in containment unit',
];

const severities: Threat['severity'][] = ['Low', 'Medium', 'High', 'Critical'];
const resourceTypes: Threat['resourceType'][] = ['Pod', 'ServiceAccount', 'Deployment', 'ClusterRole'];
const categories: Threat['category'][] = ['Runtime', 'Identity', 'Config', 'Network'];

export function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateRandomThreat(tenantId: string, projectId: string): Threat {
  return {
    id: `${projectId}-threat-${Date.now()}`,
    summary: randomFrom(summaries),
    severity: randomFrom(severities),
    time: new Date().toISOString(),
    resourceType: randomFrom(resourceTypes),
    category: randomFrom(categories),
    tenantId,
    projectId,
  };
}
