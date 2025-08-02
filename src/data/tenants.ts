export type Project = {
  id: string;
  name: string;
};

export type Tenant = {
  id: string;
  name: string;
  projects: Project[];
};

export const tenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Avengers Initiative',
    projects: [
      { id: 'project-1', name: 'Stark Tower' },
      { id: 'project-2', name: 'Quinjet Systems' },
      { id: 'project-3', name: 'Helicarrier Ops' },
    ],
  },
  {
    id: 'tenant-2',
    name: 'Justice League',
    projects: [
      { id: 'project-4', name: 'Watchtower' },
      { id: 'project-5', name: 'Hall of Justice' },
      { id: 'project-6', name: 'Boom Tube Gateway' },
    ],
  },
  {
    id: 'tenant-3',
    name: 'X-Men',
    projects: [
      { id: 'project-7', name: 'Cerebro Core' },
      { id: 'project-8', name: 'Blackbird Jet' },
      { id: 'project-9', name: 'Danger Room' },
    ],
  },
];
