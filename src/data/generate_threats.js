import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export const tenants = [
  {
    id: "tenant-1",
    name: "Avengers Initiative",
    projects: [
      { id: "project-1", name: "Stark Tower" },
      { id: "project-2", name: "Quinjet Systems" },
      { id: "project-3", name: "Helicarrier Ops" },
    ],
  },
  {
    id: "tenant-2",
    name: "Justice League",
    projects: [
      { id: "project-4", name: "Watchtower" },
      { id: "project-5", name: "Hall of Justice" },
      { id: "project-6", name: "Boom Tube Gateway" },
    ],
  },
  {
    id: "tenant-3",
    name: "X-Men",
    projects: [
      { id: "project-7", name: "Cerebro Core" },
      { id: "project-8", name: "Blackbird Jet" },
      { id: "project-9", name: "Danger Room" },
    ],
  },
];

const summaries = [
  "Unusual access to vibranium vault",
  "Kryptonite exposure detected",
  "Unauthorized sentinel override",
  "Suspicious exec into Batcomputer pod",
  "Danger Room anomaly detected",
  "Unknown entity using Speed Force",
  "Pod hijack attempt from Loki node",
  "ServiceAccount mismatch on Cerebro core",
  "Runtime mutation on Stark AI",
  "X-gene suppression virus flagged",
];

const severities = ["Low", "Medium", "High", "Critical"];
const resourceTypes = ["Pod", "ServiceAccount", "Deployment", "ClusterRole"];
const categories = ["Runtime", "Identity", "Config", "Network"];

function generateThreats() {
  const threats = [];

  tenants.forEach((tenant) => {
    tenant.projects.forEach((project) => {
      const clusterTimes = Array.from({ length: 10 }, (_, i) =>
        new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString()
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

        const extraCount = Math.floor(Math.random() * 4);
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

const threats = generateThreats();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "threats.json");

fs.writeFileSync(
  outputPath,
  // path.join(outputPath, "threats.json"),
  JSON.stringify(threats, null, 2),
  "utf-8"
);
