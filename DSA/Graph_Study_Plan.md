# Graph Algorithms — Study Plan

Study order: learn the algorithm first, then solve 2 problems for each.
**Bold = Batch B assignments you can submit for PSP.**

---

## 1. BFS / DFS / Cycle Detection

**Learn:** BFS template (queue), DFS template (stack/recursion), cycle detection (directed: visited + inStack, undirected: parent tracking).

| Problem | Platform | Link |
|---------|----------|------|
| Rotting Oranges | Leetcode 994 | https://leetcode.com/problems/rotting-oranges/ |
| Course Schedule (cycle detection) | Leetcode 207 | https://leetcode.com/problems/course-schedule/ |
| Find Eventual Safe States | Leetcode 802 | https://leetcode.com/problems/find-eventual-safe-states/ |
| BFS of Graph | GFG Practice | https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1 |
| DFS of Graph | GFG Practice | https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1 |

---

## 2. Dijkstra's Algorithm

**Learn:** Min-heap + relaxation. Greedy single-source shortest path. Only works with non-negative weights.

| Problem | Platform | Link |
|---------|----------|------|
| Network Delay Time | Leetcode 743 | https://leetcode.com/problems/network-delay-time/ |
| Path With Minimum Effort | Leetcode 1631 | https://leetcode.com/problems/path-with-minimum-effort/ |
| Implement Dijkstra's | GFG Practice | https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1 |
| Shortest Path in Weighted undirected graph | Leetcode 1514 | https://leetcode.com/problems/path-with-maximum-probability/ |

---

## 3. Bellman-Ford

**Learn:** Relax all edges V-1 times. Handles negative weights. Detects negative cycles on V-th iteration.

| Problem | Platform | Link |
|---------|----------|------|
| **Bellman Ford** | **Batch B Assignment** | Scaler Dashboard |
| Cheapest Flights Within K Stops | Leetcode 787 | https://leetcode.com/problems/cheapest-flights-within-k-stops/ |
| Distance from the Source (Bellman-Ford) | GFG Practice | https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1 |

---

## 4. Floyd-Warshall

**Learn:** 3 nested loops `for k, for i, for j: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`. All-pairs shortest path.

| Problem | Platform | Link |
|---------|----------|------|
| **Floyd Warshall** | **Batch B Assignment** | Scaler Dashboard |
| **Construct Roads** | **Batch B Assignment** | Scaler Dashboard |
| Find the City With Smallest Number of Neighbors | Leetcode 1334 | https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/ |
| Floyd Warshall | GFG Practice | https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1 |

---

## 5. DSU (Union-Find)

**Learn:** `find(x)` with path compression, `union(x,y)` with union by rank.

```cpp
int par[N], rnk[N];
int find(int x) { return par[x] == x ? x : par[x] = find(par[x]); }
void unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return;
    if (rnk[a] < rnk[b]) swap(a, b);
    par[b] = a;
    if (rnk[a] == rnk[b]) rnk[a]++;
}
```

| Problem | Platform | Link |
|---------|----------|------|
| **Batches** | **Batch B Assignment** | Scaler Dashboard |
| **Gym Trainer** | **Batch B Assignment** | Scaler Dashboard |
| **Cows and Snacks** | **Batch B Assignment** | Scaler Dashboard |
| Redundant Connection | Leetcode 684 | https://leetcode.com/problems/redundant-connection/ |
| Accounts Merge | Leetcode 721 | https://leetcode.com/problems/accounts-merge/ |
| Number of Operations to Make Network Connected | Leetcode 1319 | https://leetcode.com/problems/number-of-operations-to-make-network-connected/ |
| Number of Provinces | Leetcode 547 | https://leetcode.com/problems/number-of-provinces/ |

---

## 6. Kruskal's Algorithm (MST)

**Learn:** Sort edges by weight, greedily pick edges using DSU to avoid cycles. O(E log E).

| Problem | Platform | Link |
|---------|----------|------|
| **Construction Cost** | **Batch B Assignment** | Scaler Dashboard |
| **Commutable Islands** | **Batch B Assignment** | Scaler Dashboard |
| **Edge in MST** | **Batch B Assignment** | Scaler Dashboard |
| Min Cost to Connect All Points | Leetcode 1584 | https://leetcode.com/problems/min-cost-to-connect-all-points/ |
| Find Critical and Pseudo-Critical Edges in MST | Leetcode 1489 | https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/ |
| Minimum Spanning Tree | GFG Practice | https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1 |

---

## 7. Prim's Algorithm (MST)

**Learn:** Start from any node, greedily pick the cheapest edge connecting to an unvisited node using min-heap. O(E log V).

| Problem | Platform | Link |
|---------|----------|------|
| **Construction Cost** | **Batch B Assignment** | Scaler Dashboard |
| **Commutable Islands** | **Batch B Assignment** | Scaler Dashboard |
| **Damaged Roads** | **Batch B Assignment** | Scaler Dashboard |
| Min Cost to Connect All Points (solve with Prim's) | Leetcode 1584 | https://leetcode.com/problems/min-cost-to-connect-all-points/ |

---

## Recommended Study Order

| Order | Algorithm | Time |
|-------|-----------|------|
| 1 | DSU | 30 min |
| 2 | Kruskal's | 30 min |
| 3 | Dijkstra | 30 min |
| 4 | Bellman-Ford | 20 min |
| 5 | Floyd-Warshall | 15 min |
| 6 | Prim's | 20 min |
| 7 | BFS/DFS/Cycle | 15 min |

**Total: ~2.5 hours for all graph algorithms + practice.**
