import { floydWarshall } from "../src/algorithms/floydWarshall.js";

const graph = {
  A: [{ to: "B", weight: 1 }, { to: "C", weight: 2 }],
  B: [{ to: "C", weight: 1 }, { to: "D", weight: 2 }],
  C: [{ to: "D", weight: 2 }],
  D: []
};

test("Floyd-Warshall computes all-pairs distances correctly", () => {
  const res = floydWarshall(graph);
  expect(res.dist).toEqual({
    A: { A: 0, B: 1, C: 2, D: 3 },
    B: { A: Infinity, B: 0, C: 1, D: 2 },
    C: { A: Infinity, C: 0, B: Infinity, D: 2 },
    D: { A: Infinity, B: Infinity, C: Infinity, D: 0 }
  });
});
