import { create } from 'zustand';
import { type Threat } from '../data/mockThreats'; // or your schema
import threatsByTenant from '../data/threatsByTenant'; // your static JSON

type ThreatStore = {
  tenantId: string | null;
  projectId: string | null;
  setTenant: (tenantId: string | null) => void;
  setProject: (projectId: string | null) => void;

  rawThreats: Threat[];
  trendData: any[];
  categoryData: { name: string; value: number }[];

  computeThreatData: (tenantId: string, projectId: string | null) => void;
};

export const useThreatStore = create<ThreatStore>((set) => ({
  tenantId: null,
  projectId: null,
  setTenant: (tenantId) => set((state) => ({ ...state, tenantId })),
  setProject: (projectId) => set((state) => ({ ...state, projectId })),

  rawThreats: [],
  trendData: [],
  categoryData: [],

  computeThreatData: (tenantId, projectId) => {
    const all = threatsByTenant[tenantId]?.[projectId ?? ''] ?? [];

    // Group by hour
    const trendMap: Record<string, Record<string, number>> = {};
    for (const threat of all) {
      const date = new Date(threat.time);
      const hourKey = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()).toISOString();
      if (!trendMap[hourKey]) trendMap[hourKey] = { Low: 0, Medium: 0, High: 0, Critical: 0 };
      trendMap[hourKey][threat.severity]++;
    }

    const trendData = Object.entries(trendMap).map(([time, counts]) => ({
      time,
      ...counts,
    })).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    // Category breakdown
    const categoryMap: Record<string, number> = {};
    for (const threat of all) {
      categoryMap[threat.category] = (categoryMap[threat.category] || 0) + 1;
    }
    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    set({ rawThreats: [...all] as Threat[], trendData, categoryData });
  },
}));
