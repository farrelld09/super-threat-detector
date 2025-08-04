import { create } from 'zustand';
import { type Threat } from '../data/mockThreats';
import threatsByTenant from '../data/threatsByTenant';

type TrendDatum = {
  time: string;
};

type ThreatStore = {
  tenantId: string | null;
  projectId: string | null;
  setTenant: (tenantId: string | null) => void;
  setProject: (projectId: string | null) => void;

  rawThreats: Threat[];
  trendData: TrendDatum[];
  categoryData: { name: string; value: number }[];

  computeThreatData: (tenantId: string, projectId: string | null) => void;
  addThreat: (newThreat: Threat) => void;
};

function recomputeThreatAnalytics(threats: Threat[]) {
  const trendMap: Record<string, Record<string, number>> = {};
  const categoryMap: Record<string, number> = {};

  threats.forEach((t) => {
    const hourKey = new Date(new Date(t.time).setMinutes(0, 0, 0)).toISOString();
    if (!trendMap[hourKey]) trendMap[hourKey] = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    trendMap[hourKey][t.severity]++;

    categoryMap[t.category] = (categoryMap[t.category] || 0) + 1;
  });

  const trendData = Object.entries(trendMap)
    .map(([time, counts]) => ({ time, ...counts }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }));

  return { trendData, categoryData };
}

export const useThreatStore = create<ThreatStore>((set) => ({
  tenantId: 'tenant-1',
  projectId: 'project-1',
  setTenant: (tenantId) => set((state) => ({ ...state, tenantId })),
  setProject: (projectId) => set((state) => ({ ...state, projectId })),

  rawThreats: [],
  trendData: [],
  categoryData: [],

  computeThreatData: (tenantId, projectId) => {
    const all = threatsByTenant[tenantId]?.[projectId ?? ''] ?? [];
    const rawThreats = [...all as Threat[]];
    const { trendData, categoryData } = recomputeThreatAnalytics(rawThreats);

    set({ rawThreats, trendData, categoryData });
  },

  addThreat: (newThreat) => set((state) => {
    const rawThreats = [newThreat, ...state.rawThreats];
    const { trendData, categoryData } = recomputeThreatAnalytics(rawThreats);

    return { rawThreats, trendData, categoryData };
  })
}));
