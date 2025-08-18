# USAGE

This guide will walk you through how to use **AURA (Adaptive Unified Routing Algorithm)** once installed.

---

## 1. Importing AURA

```javascript
// Import AURA into your project
const { AURA } = require('aura');
```

---

## 2. Defining Your Graph

AURA works with weighted graphs. You can define a graph using nodes and edges:

```javascript
const graph = {
  A: { B: 2, C: 4 },
  B: { C: 1, D: 7 },
  C: { D: 3 },
  D: {}
};
```

---

## 3. Running the Algorithm

To compute the shortest path:

```javascript
const aura = new AURA(graph);

// Find shortest path from node A to D
const result = aura.findShortestPath('A', 'D');

console.log(result);
```

**Output Example:**

```bash
{
  path: ['A', 'B', 'C', 'D'],
  cost: 6
}
```

---

## 4. Benchmarking (Optional)

AURA includes a benchmarking feature to compare performance:

```javascript
const { benchmark } = require('aura/utils');

benchmark(() => aura.findShortestPath('A', 'D'));
```

This will output execution time and memory usage.

---

## 5. Advanced Options

* **Dynamic Updates**: Supports real-time edge weight updates.
* **Heuristic Tuning**: Adjustable balance between speed and accuracy.
* **Multi-Path Analysis**: Explore multiple near-optimal routes.

---

## 6. Example with Updates

```javascript
// Update edge weight dynamically
aura.updateEdge('B', 'C', 5);

const updatedResult = aura.findShortestPath('A', 'D');
console.log(updatedResult);
```

---

## 7. Visualization Support

AURA integrates with common visualization libraries:

```javascript
const { visualize } = require('aura/visualization');

visualize(graph, result);
```

---

## 8. Next Steps

* Explore **`docs/PROJECT_OVERVIEW.md`** for theory.
* Contribute via **CONTRIBUTING.md**.
* Check **benchmarks/** for performance comparisons.
