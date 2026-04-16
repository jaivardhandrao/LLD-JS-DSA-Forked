# DSA IV — Master Cheatsheet

> One-page revision for the end-term. Covers every topic listed in the exam handbook.

## Dynamic Programming

| Pattern | State | Answer at |
| :--- | :--- | :--- |
| 0/1 Knapsack | `(i, W)` | `dp[n][W]` |
| LIS | `(i)` | `max(dp[i])` or O(n log n) via tails |
| LCS | `(i, j)` | `dp[n][m]` |
| Edit Distance | `(i, j)` | `dp[n][m]` |
| **Matrix Chain Mult** | `(i, j)` + split `k` | `dp[1][n-1]` |
| Coin Change (min coins) | `(amount)` | `dp[amount]` |
| Longest Palindromic Substring | `(i, j)` | expand-around-center O(n²) |

**MCM recurrence** — [`Assignments/01_Matrix_Chain_Multiplication.md`](Assignments/01_Matrix_Chain_Multiplication.md)

```cpp
rec(i, j) = min over k in [i, j-1] of
            rec(i, k) + rec(k+1, j) + a[i-1] * a[k] * a[j]
```

## Graphs — Algorithm Chooser

```
Unweighted shortest path          → BFS
0/1-weighted shortest path        → 0/1 BFS (deque)
Weighted, non-negative            → Dijkstra
Weighted, negative edges          → Bellman-Ford
All-pairs, small V                → Floyd-Warshall
Min spanning tree, sparse         → Kruskal (sort + DSU)
Min spanning tree, dense          → Prim (PQ)
Topological order / cycle (DAG)   → Kahn / DFS colouring
Strongly connected components    → Kosaraju / Tarjan
Bipartite check                   → BFS/DFS 2-colouring
```

**Key complexities**

| Algorithm | Time |
| :--- | :---: |
| BFS / DFS | O(V + E) |
| Dijkstra (heap) | O((V+E) log V) |
| Bellman-Ford | O(V·E) |
| Floyd-Warshall | O(V³) |
| Kruskal | O(E log E) |
| Prim (heap) | O((V+E) log V) |

## Segment Tree

- Tree size: `4 * n`.
- Build: O(n). Update: O(log n). Query: O(log n).
- Lazy propagation for range updates.
- Query helper ranges: *disjoint → 0; fully inside → node value; partial → recurse both*.

## TreeSet / TreeMap → C++

| Java | C++ |
| :--- | :--- |
| `floor(x)` | `prev(s.upper_bound(x))` |
| `ceiling(x)` | `s.lower_bound(x)` |
| `lower(x)` | `prev(s.lower_bound(x))` |
| `higher(x)` | `s.upper_bound(x)` |
| `first/last` | `*s.begin() / *s.rbegin()` |

## Modular Arithmetic

- `(a - b) % M` → add `M` first: `((a - b) % M + M) % M`.
- `(a / b) % M` → `a * modInverse(b) % M`.
- Fermat inverse (prime M): `b⁻¹ = b^(M-2) mod M`.
- Binary exponentiation: O(log b).

## Primes

- Sieve of Eratosthenes: O(N log log N), inner loop starts at `i*i`.
- Primality O(√n).
- Linear sieve: computes `spf[i]` (smallest prime factor) alongside primes.

## GCD

- Euclidean: `gcd(a, b) = gcd(b, a % b)`, base `b == 0`.
- `gcd(a, b) · lcm(a, b) = a · b`.
- Extended Euclidean finds `x, y` with `a·x + b·y = g`.

## String Matching

| | Rabin-Karp | Z-Algorithm |
| :--- | :--- | :--- |
| Worst | O(nm) | **O(n+m)** |
| Avg | O(n+m) | O(n+m) |
| Needs verify | Yes | No |

Z-match pattern via `P + '#' + T`, find indices with `z[i] == m`.

## Complexity Ladder — reference during MCQ

| n | Feasible in 1 sec |
| :---: | :---: |
| 10⁸ | O(n) |
| 10⁷ | O(n log n) |
| 10⁴ | O(n²) |
| 500 | O(n³) |
| 20 | O(2ⁿ · n) (bitmask DP) |
| 11 | O(n!) |

## Exam-Day Checklist

1. **Read constraints first** — they tell you the allowed complexity.
2. Reset `dp[]`, `vis[]`, `dist[]` between test cases.
3. Use `long long` anywhere sums might exceed 2·10⁹.
4. `memset(..., -1, sizeof dp)` — not `0` — for "not computed" sentinel.
5. For directed-cycle detection, use 3-colour DFS (0/1/2), not plain `vis`.
6. Dijkstra must skip stale entries (`if (d > dist[u]) continue;`).
