import { dijkstra } from "./dijkstra.js";
import { aStar } from "./astar.js";

/**
 * Aura Path: pragmatic chooser (A* when a heuristic is provided, otherwise Dijkstra).
 * You can extend this with more modes later (multi-source, multi-criteria, etc.)
 *
 * @param {Record<string, {to:string, weight:number}[]>} graph
 * @param {string} start
 * @param {string} goal
 * @param {{ mode?: "auto"|"fast"|"robust", heuristic?: (node:string)=>number }} [options]
 * @returns {{ distance:number, path:string[], distances?:Record<string,number>, previous?:Record<string,string|null> }}
 */
export function auraPath(graph, start, goal, options = {}) {
  const mode = options.mode ?? "auto";
  const hasHeuristic = typeof options.heuristic === "function";

  if (mode === "fast" || (mode === "auto" && hasHeuristic)) {
    const res = aStar(graph, start, goal, options.heuristic ?? (() => 0));
    return { distance: res.distance, path: res.path };
  }

  // robust/default: dijkstra
  const res = dijkstra(graph, start, goal);
  return {
    distance: res.distance,
    path: res.path,
    distances: res.distances,
    previous: res.previous
  };
}
