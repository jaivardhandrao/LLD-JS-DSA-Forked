# DSA IV — Study Order

Exam date: **17 April 2026 · 6:00 PM – 8:00 PM**
Format: **MCQ + Coding**, duration **2 hours**

## Recommended Path

### Day 1–2 · Dynamic Programming (heaviest weight)

1. [Dynamic Programming — patterns cheat sheet](Topics/01_Dynamic_Programming.md)
2. [Matrix Chain Multiplication](Assignments/01_Matrix_Chain_Multiplication.md) — representative interval-DP problem
3. Practice: knapsack, LIS, LCS, edit distance, partition DP

### Day 3 · Graphs — Traversals & Shortest Paths

4. [Graph Basics](Topics/02_Graph_Basics.md) — representations, BFS, DFS, cycle detection, topo sort
5. [Shortest Path Algorithms](Topics/03_Shortest_Paths.md) — Dijkstra, Bellman-Ford, Floyd-Warshall
6. [Minimum Spanning Tree](Topics/04_Minimum_Spanning_Tree.md) — Kruskal + Prim

### Day 4 · Range Queries & Ordered Sets

7. [Segment Trees](Topics/05_Segment_Trees.md) — build / query / update / lazy
8. [TreeSet & TreeMap](Topics/06_TreeSet_TreeMap.md) — Java API and C++ equivalents

### Day 5 · Number Theory + Strings

9. [Modular Arithmetic · Primes · GCD](Topics/07_Number_Theory.md)
10. [Rabin-Karp & Z-Algorithm](Topics/08_String_Matching.md)

### Day 6 · Revise + Simulate

11. Re-read the [Master Cheatsheet](Cheatsheet.md).
12. Re-solve the [assignment problems](Assignments/INDEX.md) without looking at the code.
13. Mock one timed 2-hour session.

## What's In This Section

| Folder | Contents |
| :--- | :--- |
| [`Topics/`](Topics/01_Dynamic_Programming.md) | Revision notes per syllabus topic, code-first |
| [`Assignments/`](Assignments/INDEX.md) | Transcribed class/assignment problems with explanation |
| [`Cheatsheet.md`](Cheatsheet.md) | One-page exam-eve reference |
| `../Graph_Study_Plan.md` | Existing graph study plan |

## Exam-Day Reminders

- `memset(dp, -1, sizeof dp)` **before** each test case.
- `long long` for anything summing > ~10⁹.
- Constraints dictate complexity — read them first.
- For Dijkstra: skip stale entries `if (d > dist[u]) continue`.
- For directed cycle: 3-colour DFS (0 / 1 / 2), not plain `vis`.
- Modular subtraction: `((a - b) % M + M) % M`.
- Modular division: multiply by `modInverse`, never divide directly.
