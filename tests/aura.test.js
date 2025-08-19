import { auraPath } from "../src/algorithms/aura.js";

const graph = {
  A: [{ to: "B", weight: 1 }, { to: "C", weight: 2 }],
  B: [{ to: "C", weight: 1 }, { to: "D", weight: 2 }],
  C: [{ to: "D", weight: 2 }],
  D: []
};

test("Aura uses A* when heuristic provided (fast)", () => {
  const res = auraPath(graph, "A", "D", {
    mode: "fast",
    heuristic: () => 0
  });
  expect(res.distance).toBe(3);
  expect(res.path).toEqual(["A", "B", "D"]);
});

test("Aura falls back to Dijkstra in robust mode", () => {
  const res = auraPath(graph, "A", "D", { mode: "robust" });
  expect(res.distance).toBe(3);
  expect(res.path).toEqual(["A", "B", "D"]);
});
