import { AdjacencyList, NodeId, ShortestPathResult } from "./types";
import { MinPQ } from "./priorityQueue";
import { buildPath, initDistancePrev, uniqueNodesFromAdj } from "./utils";

/**
 * Classic Dijkstra's algorithm (non-negative weights).
 */
export function dijkstra(
  graph: AdjacencyList,
  source: NodeId,
  target?: NodeId
): ShortestPathResult {
  const nodes = uniqueNodesFromAdj(graph);
  const { dist, prev } = initDistancePrev(nodes, source);

  const pq = new MinPQ<NodeId>();
  for (const n of nodes) pq.push(dist[n], n);

  const visited = new Set<NodeId>();

  while (pq.size()) {
    const popped = pq.pop();
    if (!popped) break;
    const u = popped.value;

    if (visited.has(u)) continue;
    visited.add(u);

    if (dist[u] === Infinity) break;
    if (target && u === target) break;

    for (const e of graph[u] || []) {
      const alt = dist[u] + e.weight;
      if (alt < dist[e.to]) {
        dist[e.to] = alt;
        prev[e.to] = u;
        pq.push(alt, e.to); // simple re-insert; PQ isn't strictly decrease-key optimized
      }
    }
  }

  const t = target ?? source;
  const path = target ? buildPath(prev, source, target) : [source];
  return { distance: dist[t], path, distances: dist, previous: prev };
}
