import { validateGraph, nodesOf, reconstructPath, INF } from "./utils.js";

/**
 * Dijkstra single-source shortest paths.
 * @param {Record<string, {to:string, weight:number}[]>} graph
 * @param {string} start
 * @param {string} [goal] optional, if provided we also return path/distance to goal
 * @returns {{
 *   distances: Record<string, number>,
 *   previous: Record<string, string|null>,
 *   distance?: number,
 *   path?: string[]
 * }}
 */
export function dijkstra(graph, start, goal) {
  validateGraph(graph);
  const nodes = nodesOf(graph);

  if (!nodes.includes(start)) {
    throw new Error(`Start node "${start}" not found in graph.`);
  }

  const dist = {};
  const prev = {};
  const visited = new Set();

  for (const n of nodes) {
    dist[n] = INF;
    prev[n] = null;
  }
  dist[start] = 0;

  // min-priority selection (O(V^2) simple implementation)
  while (visited.size < nodes.length) {
    let u = null;
    let best = INF;
    for (const n of nodes) {
      if (!visited.has(n) && dist[n] < best) {
        best = dist[n];
        u = n;
      }
    }
    if (u == null) break; // remaining unreachable
    visited.add(u);

    if (goal && u === goal) break; // early stop if goal is reached

    for (const { to, weight } of graph[u]) {
      const alt = dist[u] + weight;
      if (alt < dist[to]) {
        dist[to] = alt;
        prev[to] = u;
      }
    }
  }

  const result = { distances: dist, previous: prev };
  if (goal) {
    result.path = reconstructPath(prev, start, goal);
    result.distance = dist[goal];
  }
  return result;
}
