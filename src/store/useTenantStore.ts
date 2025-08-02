import { create } from 'zustand';

type TenantStore = {
  tenantId: string | null;
  projectId: string | null;
  setTenant: (tenantId: string, projectId?: string | null) => void;
  setProject: (projectId: string | null) => void;
};

export const useTenantStore = create<TenantStore>((set) => ({
  tenantId: null,
  projectId: null,
  setTenant: (tenantId, projectId = null) => set({ tenantId, projectId }),
  setProject: (projectId) => set((state) => ({ ...state, projectId })),
}));

export const useProjectId = () => {
  const { projectId } = useTenantStore();
  return projectId;
};

export const useCurrentTenant = () => {
  const { tenantId, projectId } = useTenantStore();
  return { tenantId, projectId };
};