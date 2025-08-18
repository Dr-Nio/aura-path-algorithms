import { performance } from "node:perf_hooks";
import { AdjacencyList, NodeId } from "./types";
import { dijkstra } from "./dijkstra";
import { bellmanFord } from "./bellmanFord";
import { floydWarshall } from "./floydWarshall";
import { AURA } from "./aura";

export interface BenchmarkCase {
  name: string;
  algorithm: "aura" | "dijkstra" | "bellman-ford" | "floyd-warshall";
  source?: NodeId;
  target?: NodeId;
  runs?: number;
  auraAlpha?: number;
}

export interface BenchmarkResult {
  name: string;
  algorithm: string;
  runs: number;
  averageMs: number;
  minMs: number;
  maxMs: number;
}

function timeit<T>(fn: () => T, runs: number): { result: T; stats: { avg: number; min: number; max: number } } {
  const times: number[] = [];
  let output: T = fn(); // warm-up
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now();
    output = fn();
    const t1 = performance.now();
    times.push(t1 - t0);
  }
  const sum = times.reduce((a, b) => a + b, 0);
  return {
    result: output,
    stats: { avg: sum / runs, min: Math.min(...times), max: Math.max(...times) }
  };
}

export function runBenchmarks(
  graph: AdjacencyList,
  cases: BenchmarkCase[]
): BenchmarkResult[] {
  const results: BenchmarkResult[] = [];

  for (const c of cases) {
    const runs = c.runs ?? 50;
    let bench: ReturnType<typeof timeit>;

    switch (c.algorithm) {
      case "aura": {
        const a = new AURA(graph, { alpha: c.auraAlpha ?? 0.05 });
        bench = timeit(() => a.shortestPath(c.source!, c.target!), runs);
        break;
      }
      case "dijkstra":
        bench = timeit(() => dijkstra(graph, c.source!, c.target!), runs);
        break;
      case "bellman-ford":
        bench = timeit(() => bellmanFord(graph, c.source!, c.target!), runs);
        break;
      case "floyd-warshall": {
        // For FW, compute once then look up path (same work each run).
        bench = timeit(() => {
          const fw = floydWarshall(graph);
          fw.path(c.source!, c.target!);
          return fw;
        }, runs);
        break;
      }
      default:
        throw new Error(`Unknown algorithm: ${c.algorithm}`);
    }

    results.push({
      name: c.name,
      algorithm: c.algorithm,
      runs,
      averageMs: bench.stats.avg,
      minMs: bench.stats.min,
      maxMs: bench.stats.max
    });
  }

  return results;
}
