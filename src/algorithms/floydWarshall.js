import { validateGraph, nodesOf, INF } from "./utils.js";

/**
 * Floyd–Warshall All-Pairs Shortest Paths
 * @param {Record<string, {to:string, weight:number}[]>} graph
 * @returns {{ dist: Record<string, Record<string, number>> }}
 */
export function floydWarshall(graph) {
  validateGraph(graph);
  const nodes = nodesOf(graph);

  // initialize distances
  const dist = {};
  for (const u of nodes) {
    dist[u] = {};
    for (const v of nodes) {
      if (u === v) dist[u][v] = 0;
      else dist[u][v] = INF;
    }
    for (const { to, weight } of graph[u]) {
      dist[u][to] = weight;
    }
  }

  // main triple loop
  for (const k of nodes) {
    for (const i of nodes) {
      for (const j of nodes) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return { dist };
}
