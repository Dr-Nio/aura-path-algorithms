import { validateGraph, nodesOf, reconstructPath, INF } from "./utils.js";

/**
 * A* search (uses heuristic; if none provided, behaves like Dijkstra).
 * @param {Record<string, {to:string, weight:number}[]>} graph
 * @param {string} start
 * @param {string} goal
 * @param {(node:string)=>number} [heuristic] admissible heuristic; defaults to 0
 * @returns {{ distance:number, path:string[], gScores:Record<string,number> }}
 */
export function aStar(graph, start, goal, heuristic = () => 0) {
  validateGraph(graph);
  const nodes = nodesOf(graph);
  if (!nodes.includes(start)) throw new Error(`Start node "${start}" not in graph.`);
  if (!nodes.includes(goal)) throw new Error(`Goal node "${goal}" not in graph.`);

  const open = new Set([start]);
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  for (const n of nodes) {
    gScore[n] = INF;
    fScore[n] = INF;
  }
  gScore[start] = 0;
  fScore[start] = heuristic(start);

  while (open.size) {
    // node in open with lowest fScore
    let current = null;
    let best = INF;
    for (const n of open) {
      if (fScore[n] < best) {
        best = fScore[n];
        current = n;
      }
    }
    if (current === goal) {
      const path = reconstructPath(cameFrom, start, goal);
      return { distance: gScore[goal], path, gScores: gScore };
    }

    open.delete(current);

    for (const { to, weight } of graph[current]) {
      const tentative = gScore[current] + weight;
      if (tentative < gScore[to]) {
        cameFrom[to] = current;
        gScore[to] = tentative;
        fScore[to] = tentative + heuristic(to);
        open.add(to);
      }
    }
  }

  return { distance: INF, path: [], gScores: gScore };
}
