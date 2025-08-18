import { NodeId } from "./types";

export function buildPath(
  prev: Record<NodeId, NodeId | null>,
  source: NodeId,
  target: NodeId
): NodeId[] {
  const path: NodeId[] = [];
  let u: NodeId | null = target;
  while (u !== null) {
    path.unshift(u);
    u = prev[u] ?? null;
  }
  if (path[0] !== source) return []; // unreachable
  return path;
}

export function initDistancePrev(
  nodes: NodeId[],
  source: NodeId
): { dist: Record<NodeId, number>; prev: Record<NodeId, NodeId | null> } {
  const dist: Record<NodeId, number> = {};
  const prev: Record<NodeId, NodeId | null> = {};
  for (const n of nodes) {
    dist[n] = Infinity;
    prev[n] = null;
  }
  dist[source] = 0;
  return { dist, prev };
}

export function uniqueNodesFromAdj(adj: Record<NodeId, { to: NodeId; weight: number }[]>): NodeId[] {
  const s = new Set<NodeId>(Object.keys(adj));
  for (const u of Object.keys(adj)) {
    for (const e of adj[u]) s.add(e.to);
  }
  return [...s];
}
