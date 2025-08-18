import { performance } from "perf_hooks";
import { dijkstra } from "../src/algorithms/dijkstra";
import { bellmanFord } from "../src/algorithms/bellmanFord";
import { floydWarshall } from "../src/algorithms/floydWarshall";

type Graph = Record<string, Record<string, number>>;

// Sample graph for benchmarking
const sampleGraph: Graph = {
  A: { B: 2, C: 4 },
  B: { C: 1, D: 7 },
  C: { D: 3 },
  D: {}
};

function benchmark(fn: () => void, label: string) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(4)} ms`);
}

function runBenchmarks() {
  console.log("=== AURA Graph Algorithms Benchmark ===");

  benchmark(() => {
    dijkstra(sampleGraph, "A");
  }, "Dijkstra");

  benchmark(() => {
    bellmanFord(sampleGraph, "A");
  }, "Bellman-Ford");

  benchmark(() => {
    floydWarshall(sampleGraph);
  }, "Floyd-Warshall");
}

runBenchmarks();
