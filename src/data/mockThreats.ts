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

function random<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function generateThreats(): Threat[] {
  const threats: Threat[] = [];

  tenants.forEach((tenant) => {
    tenant.projects.forEach((project) => {
      for (let i = 0; i < 10; i++) {
        threats.push({
          id: `${project.id}-threat-${i}`,
          summary: random(summaries),
          severity: random(severities),
          time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // within last 7d
          resourceType: random(resourceTypes),
          category: random(categories),
          tenantId: tenant.id,
          projectId: project.id,
        });
      }
    });
  });

  return threats;
}

export const mockThreats: Threat[] = generateThreats();

export function getThreatsForTenant(tenantId: string): Threat[] {
  return mockThreats.filter(threat => threat.tenantId === tenantId);
}

export function getThreatsForProject(tenantId: string, projectId: string): Threat[] {
  return mockThreats.filter(threat => threat.tenantId === tenantId && threat.projectId === projectId);
}

export function getThreatsForTenantAndProject(tenantId: string, projectId: string): Threat[] {
  return mockThreats.filter(threat => threat.tenantId === tenantId && threat.projectId === projectId);
}

export function getAllThreats(): Threat[] {
  return mockThreats;
}