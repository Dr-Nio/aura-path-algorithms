import { AdjacencyList, NodeId, ShortestPathResult } from "./types";
import { buildPath, initDistancePrev, uniqueNodesFromAdj } from "./utils";

/**
 * Bellman–Ford algorithm (supports negative edges; detects negative cycles).
 */
export function bellmanFord(
  graph: AdjacencyList,
  source: NodeId,
  target?: NodeId
): ShortestPathResult {
  const nodes = uniqueNodesFromAdj(graph);
  const { dist, prev } = initDistancePrev(nodes, source);

  const edges: { u: NodeId; v: NodeId; w: number }[] = [];
  for (const u of Object.keys(graph)) {
    for (const { to, weight } of graph[u]) edges.push({ u, v: to, w: weight });
  }

  // Relax edges |V|-1 times
  for (let i = 0; i < nodes.length - 1; i++) {
    let changed = false;
    for (const { u, v, w } of edges) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        changed = true;
      }
    }
    if (!changed) break;
  }

  // Detect negative cycles (optional: mark distances as -Infinity or throw)
  for (const { u, v, w } of edges) {
    if (dist[u] + w < dist[v]) {
      throw new Error("Negative cycle detected");
    }
  }

  const t = target ?? source;
  const path = target ? buildPath(prev, source, target) : [source];
  return { distance: dist[t], path, distances: dist, previous: prev };
}
