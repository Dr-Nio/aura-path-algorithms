import { AdjacencyList, NodeId, ShortestPathResult } from "./types";
import { MinPQ } from "./priorityQueue";
import { buildPath, initDistancePrev, uniqueNodesFromAdj } from "./utils";

/**
 * AURA – Adaptive Unified Routing Algorithm
 * Built on a Dijkstra base with a light-weight, global state–aware
 * redistribution factor (inspired by WBR) that gently penalizes edges
 * as exploration progresses, encouraging balanced routing under load.
 *
 * Redistribution factor:
 *   rf(step) = 1 + alpha * (visitedCount / totalNodes)
 * where alpha ∈ [0, 1) is small (default 0.05).
 */
export interface AuraOptions {
  alpha?: number; // redistribution intensity
}

export class AURA {
  private graph: AdjacencyList;
  private alpha: number;

  constructor(graph: AdjacencyList, opts: AuraOptions = {}) {
    this.graph = graph;
    this.alpha = opts.alpha ?? 0.05;
  }

  shortestPath(source: NodeId, target: NodeId): ShortestPathResult {
    const nodes = uniqueNodesFromAdj(this.graph);
    const total = nodes.length;
    const { dist, prev } = initDistancePrev(nodes, source);
    const visited = new Set<NodeId>();
    const pq = new MinPQ<NodeId>();
    for (const n of nodes) pq.push(dist[n], n);

    while (pq.size()) {
      const popped = pq.pop();
      if (!popped) break;
      const u = popped.value;
      if (visited.has(u)) continue;
      visited.add(u);

      if (dist[u] === Infinity) break;
      if (u === target) break;

      const rf = 1 + this.alpha * (visited.size / Math.max(1, total));

      for (const e of this.graph[u] || []) {
        const alt = dist[u] + e.weight * rf;
        if (alt < dist[e.to]) {
          dist[e.to] = alt;
          prev[e.to] = u;
          pq.push(alt, e.to);
        }
      }
    }

    return {
      distance: dist[target],
      path: buildPath(prev, source, target),
      distances: dist,
      previous: prev
    };
  }
}
