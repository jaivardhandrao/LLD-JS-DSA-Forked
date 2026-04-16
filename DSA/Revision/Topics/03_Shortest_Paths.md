# Shortest Path Algorithms

| Algorithm | Works on | Weights | Complexity |
| :--- | :--- | :--- | :--- |
| BFS | Unweighted | — | O(V + E) |
| **Dijkstra** | Weighted | Non-negative only | O((V + E) log V) |
| **Bellman-Ford** | Weighted | Any (incl. negative) | O(V · E) |
| **Floyd–Warshall** | All-pairs | Any (no neg cycle) | O(V³) |
| 0/1 BFS (deque) | Weighted | 0 or 1 only | O(V + E) |

## Dijkstra (single-source, no negatives)

```cpp
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
vector<long long> dist(n + 1, LLONG_MAX);
dist[src] = 0;
pq.push({0, src});

while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;                 // stale entry
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}
```

**Why no negatives?** Once a node is popped with distance `d`, Dijkstra assumes no shorter path exists. A negative edge could make a longer-looking path shorter.

## Bellman-Ford (handles negatives, detects negative cycle)

```cpp
vector<long long> dist(n + 1, LLONG_MAX);
dist[src] = 0;

for (int i = 1; i < n; i++) {
    for (auto [u, v, w] : edges) {
        if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
            dist[v] = dist[u] + w;
    }
}
// one more pass → if still relaxing, a negative cycle is reachable
for (auto [u, v, w] : edges)
    if (dist[u] != LLONG_MAX && dist[u] + w < dist[v])
        /* negative cycle */;
```

## Floyd–Warshall (all-pairs)

```cpp
// dist[i][j] = direct edge weight, INF if none, 0 if i == j
for (int k = 1; k <= n; k++)
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (dist[i][k] + dist[k][j] < dist[i][j])
                dist[i][j] = dist[i][k] + dist[k][j];
```

**Key idea:** `dp[k][i][j]` = shortest path from `i` to `j` using intermediate vertices only from `{1..k}`. Drop the `k` dimension by iterating `k` outermost.

## 0/1 BFS (edges are 0 or 1 only)

```cpp
deque<int> dq;
dist[src] = 0; dq.push_front(src);
while (!dq.empty()) {
    int u = dq.front(); dq.pop_front();
    for (auto [v, w] : adj[u]) {
        if (dist[u] + w < dist[v]) {
            dist[v] = dist[u] + w;
            if (w == 0) dq.push_front(v);
            else        dq.push_back(v);
        }
    }
}
```

## Which Algorithm When — Decision Tree

```
Unweighted?                → BFS
Weights are 0/1 only?      → 0/1 BFS (deque)
Need single-source, no neg → Dijkstra
Need negative edges?       → Bellman-Ford
Need all pairs, small V?   → Floyd-Warshall
```
