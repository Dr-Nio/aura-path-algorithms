import { aStar } from "../src/algorithms/astar.js";

// simple admissible heuristic: straight-line-ish (here, trivial 0 works)
const h0 = () => 0;

const graph = {
  A: [{ to: "B", weight: 1 }, { to: "C", weight: 2 }],
  B: [{ to: "C", weight: 1 }, { to: "D", weight: 2 }],
  C: [{ to: "D", weight: 2 }],
  D: []
};

test("A* returns optimal path with zero heuristic (degenerates to Dijkstra)", () => {
  const res = aStar(graph, "A", "D", h0);
  expect(res.distance).toBe(3);
  expect(res.path).toEqual(["A", "B", "D"]);
});
