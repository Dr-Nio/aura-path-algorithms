export type NodeId = string;

export interface Edge {
  to: NodeId;
  weight: number;
}

export type AdjacencyList = Record<NodeId, Edge[]>;

export interface ShortestPathResult {
  distance: number;
  path: NodeId[];
  distances: Record<NodeId, number>;
  previous: Record<NodeId, NodeId | null>;
}
