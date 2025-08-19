# Installation Guide for AURA

This document provides instructions for setting up and installing **AURA (Adaptive Unified Routing Algorithm)** locally for benchmarking, experimentation, and integration.

---

## Prerequisites

Ensure you have the following installed on your system:

* **Node.js** (>= 18.x recommended)
* **npm** or **yarn** package manager
* **Git** (for cloning the repository)

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/aura.git
cd aura
```

### 2. Install Dependencies

```bash
npm install
```

*or*

```bash
yarn install
```

### 3. Build the Package

```bash
npm run build
```

### 4. Run Tests (Optional)

```bash
npm test
```

---

## Installing as a Package

To use **AURA** as a package in your own project:

```bash
npm install aura-routing
```

Then import it into your code:

```javascript
const { AURA } = require ("aura-routing";

const aura = new AURA();
```

---

## Benchmarking Setup

To run the **benchmark suite** included with AURA:

```bash
npm run benchmark
```

This will execute performance tests comparing AURA against other routing strategies.

---

## Troubleshooting

* If you encounter issues with dependencies, delete `node_modules` and reinstall.
* Ensure your Node.js version is 18 or higher.
* For benchmark visualization, ensure you have compatible terminal or logging tools.

---

## Next Steps

Once installed, check out the [Usage Guide](USAGE.md) to learn how to:

* Configure AURA
* Run adaptive routing simulations
* Extend with custom routing policies
