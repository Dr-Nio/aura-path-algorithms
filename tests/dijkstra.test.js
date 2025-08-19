import { dijkstra } from "../src/algorithms/dijkstra.js";

const graph = {
  A: [{ to: "B", weight: 1 }, { to: "C", weight: 2 }],
  B: [{ to: "C", weight: 1 }, { to: "D", weight: 2 }],
  C: [{ to: "D", weight: 2 }],
  D: []
};

test("Dijkstra computes all-pairs distances from A and shortest path to D", () => {
  const res = dijkstra(graph, "A", "D");
  expect(res.distances).toEqual({
    A: 0,
    B: 1,
    C: 2,
    D: 3, // A->B->D
  });
  expect(res.path).toEqual(["A", "B", "D"]);
  expect(res.distance).toBe(3);
});
