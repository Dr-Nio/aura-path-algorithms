const INF = Number.POSITIVE_INFINITY;

export function validateGraph(graph) {
  if (!graph || typeof graph !== "object") {
    throw new TypeError("Graph must be an object of adjacency lists.");
  }
  for (const [u, edges] of Object.entries(graph)) {
    if (!Array.isArray(edges)) {
      throw new TypeError(`Graph node "${u}" must map to an array of edges.`);
    }
    for (const e of edges) {
      if (typeof e !== "object" || e === null) {
        throw new TypeError(`Edge in "${u}" must be an object { to, weight }.`);
      }
      if (typeof e.to !== "string") {
        throw new TypeError(`Edge in "${u}" missing string 'to' field.`);
      }
      if (typeof e.weight !== "number" || Number.isNaN(e.weight)) {
        throw new TypeError(`Edge in "${u}" must have numeric 'weight'.`);
      }
    }
  }
}

export function nodesOf(graph) {
  return Object.keys(graph);
}

export function reconstructPath(prev, start, goal) {
  const path = [];
  if (!(goal in prev) && start !== goal) return path;
  let cur = goal;
  while (cur != null) {
    path.push(cur);
    if (cur === start) break;
    cur = prev[cur];
  }
  if (path[path.length - 1] !== start) return [];
  path.reverse();
  return path;
}

export { INF };
