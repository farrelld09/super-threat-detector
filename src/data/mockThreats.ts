import { tenants } from './tenants';

export type Threat = {
  id: string;
  summary: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  time: string;
  resourceType: 'Pod' | 'ServiceAccount' | 'Deployment' | 'ClusterRole';
  category: 'Runtime' | 'Identity' | 'Config' | 'Network';
  tenantId: string;
  projectId: string;
};

const summaries = [
  'Unusual access to vibranium vault',
  'Kryptonite exposure detected',
  'Unauthorized sentinel override',
  'Suspicious exec into Batcomputer pod',
  'Danger Room anomaly detected',
  'Unknown entity using Speed Force',
  'Pod hijack attempt from Loki node',
  'ServiceAccount mismatch on Cerebro core',
  'Runtime mutation on Stark AI',
  'X-gene suppression virus flagged',
];

const severities: Threat['severity'][] = ['Low', 'Medium', 'High', 'Critical'];
const resourceTypes: Threat['resourceType'][] = ['Pod', 'ServiceAccount', 'Deployment', 'ClusterRole'];
const categories: Threat['category'][] = ['Runtime', 'Identity', 'Config', 'Network'];

export function random<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateThreats(): Threat[] {
  const threats: Threat[] = [];

  tenants.forEach((tenant) => {
    tenant.projects.forEach((project) => {
      const clusterTimes = Array.from({ length: 10 }, (_, i) =>
        new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString() // every 2 hours
      );

      for (let i = 0; i < clusterTimes.length; i++) {
        threats.push({
          id: `${project.id}-threat-${i}`,
          summary: random(summaries),
          severity: random(severities),
          time: clusterTimes[i],
          resourceType: random(resourceTypes),
          category: random(categories),
          tenantId: tenant.id,
          projectId: project.id,
        });

        const extraCount = Math.floor(Math.random() * 6);
        for (let j = 0; j < extraCount; j++) {
          threats.push({
            ...threats[threats.length - 1],
            id: `${project.id}-threat-${i}-${j}`,
          });
        }
      }
    });
  });

  return threats;
}
