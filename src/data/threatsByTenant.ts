import rawThreats from './threats.json';

type Threat = typeof rawThreats[number];

const threatsByTenant: Record<string, Record<string, Threat[]>> = {};

for (const threat of rawThreats) {
  const { tenantId, projectId } = threat;
  if (!threatsByTenant[tenantId]) threatsByTenant[tenantId] = {};
  if (!threatsByTenant[tenantId][projectId]) threatsByTenant[tenantId][projectId] = [];

  threatsByTenant[tenantId][projectId].push(threat);
}

export default threatsByTenant;