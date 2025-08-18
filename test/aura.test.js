import { AURA, benchmark } from "../src/index.js";

// Example graph (adjacency list)
const graph = {
  A: [{ neighbor: "B", weight: 2 }, { neighbor: "C", weight: 4 }],
  B: [{ neighbor: "C", weight: 1 }, { neighbor: "D", weight: 7 }],
  C: [{ neighbor: "D", weight: 3 }],
  D: []
};

const aura = new AURA(graph);
const result = aura.shortestPath("A", "D");

console.log("Shortest Path A->D:", result);
console.log("Benchmark:", benchmark(graph, "A", "D", 50));
