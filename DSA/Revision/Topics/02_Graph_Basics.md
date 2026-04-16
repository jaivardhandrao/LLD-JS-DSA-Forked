# Graph Basics — Revision

## Representations

### Adjacency List (preferred for sparse graphs)

```cpp
vector<vector<int>> adj(n + 1);              // unweighted
vector<vector<pair<int,int>>> adj(n + 1);    // weighted: {neighbour, weight}

adj[u].push_back(v);
adj[v].push_back(u);                         // undirected
```

### Adjacency Matrix (dense / O(1) edge lookup)

```cpp
vector<vector<int>> mat(n + 1, vector<int>(n + 1, 0));
mat[u][v] = w;
```

| | List | Matrix |
| :--- | :---: | :---: |
| Space | O(V + E) | O(V²) |
| Edge check | O(deg) | O(1) |
| Traversal | O(V + E) | O(V²) |

## BFS — shortest path by **edges**, works on unweighted graphs

```cpp
vector<int> dist(n + 1, -1);
queue<int> q;
q.push(src); dist[src] = 0;
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
        if (dist[v] == -1) {
            dist[v] = dist[u] + 1;
            q.push(v);
        }
    }
}
```

## DFS — recursion or explicit stack

```cpp
vector<int> vis(n + 1, 0);
function<void(int)> dfs = [&](int u) {
    vis[u] = 1;
    for (int v : adj[u]) if (!vis[v]) dfs(v);
};
dfs(src);
```

## Cycle Detection

### Undirected — DFS with parent

```cpp
bool dfs(int u, int par) {
    vis[u] = 1;
    for (int v : adj[u]) {
        if (!vis[v]) { if (dfs(v, u)) return true; }
        else if (v != par) return true;      // back edge to non-parent
    }
    return false;
}
```

### Directed — DFS with recursion stack colouring

```cpp
// 0 = unvisited, 1 = in-stack, 2 = done
bool dfs(int u) {
    state[u] = 1;
    for (int v : adj[u]) {
        if (state[v] == 1) return true;      // back edge → cycle
        if (state[v] == 0 && dfs(v)) return true;
    }
    state[u] = 2;
    return false;
}
```

### Kahn's Algorithm (topological sort) — cycle iff some node never reaches in-degree 0

```cpp
vector<int> indeg(n + 1, 0);
for (int u = 1; u <= n; u++) for (int v : adj[u]) indeg[v]++;

queue<int> q;
for (int i = 1; i <= n; i++) if (!indeg[i]) q.push(i);

vector<int> order;
while (!q.empty()) {
    int u = q.front(); q.pop();
    order.push_back(u);
    for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
}
if (order.size() != n) /* cycle exists */;
```

## Connected Components

- **Undirected:** plain DFS / BFS from each unvisited node, increment counter.
- **Directed (Strongly Connected):** Kosaraju (2 DFS) or Tarjan (low-link).

## Bipartite Check — BFS/DFS 2-colouring

```cpp
vector<int> colour(n + 1, -1);
bool bfs(int s) {
    queue<int> q; q.push(s); colour[s] = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (colour[v] == -1) { colour[v] = colour[u] ^ 1; q.push(v); }
            else if (colour[v] == colour[u]) return false;
        }
    }
    return true;
}
```
