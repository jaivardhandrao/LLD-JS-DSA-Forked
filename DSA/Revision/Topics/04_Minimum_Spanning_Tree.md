# Minimum Spanning Tree

> A spanning tree of a connected undirected graph has all `V` vertices and exactly `V − 1` edges.
> An **MST** is a spanning tree of minimum total weight.

## Kruskal — edge-based, uses DSU

Sort edges by weight, greedily add the smallest edge that doesn't create a cycle.

```cpp
struct DSU {
    vector<int> p, r;
    DSU(int n) : p(n + 1), r(n + 1, 0) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (r[a] < r[b]) swap(a, b);
        p[b] = a;
        if (r[a] == r[b]) r[a]++;
        return true;
    }
};

long long kruskal(int n, vector<tuple<int,int,int>> &edges) {
    sort(edges.begin(), edges.end(),
         [](auto &a, auto &b) { return get<2>(a) < get<2>(b); });
    DSU dsu(n);
    long long total = 0; int used = 0;
    for (auto [u, v, w] : edges) {
        if (dsu.unite(u, v)) { total += w; used++; }
        if (used == n - 1) break;
    }
    return total;
}
```

**Complexity:** O(E log E) for the sort, near-linear union-find.

## Prim — vertex-based, uses priority queue

Grow the tree from a start vertex, always taking the cheapest crossing edge.

```cpp
long long prim(int n, vector<vector<pair<int,int>>> &adj) {
    vector<int> inMst(n + 1, 0);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 1});

    long long total = 0;
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMst[u]) continue;
        inMst[u] = 1; total += w;
        for (auto [v, wt] : adj[u])
            if (!inMst[v]) pq.push({wt, v});
    }
    return total;
}
```

**Complexity:** O((V + E) log V).

## Kruskal vs Prim

| | Kruskal | Prim |
| :--- | :--- | :--- |
| Data structure | DSU (union-find) | Priority queue |
| Best for | Sparse graphs | Dense graphs |
| How it grows | Disjoint forests merging | Single tree from one vertex |
| Edge list needed | Yes | No (adjacency list enough) |

## Properties Often Tested

1. MST has exactly `V − 1` edges.
2. If all weights are distinct, the MST is **unique**.
3. **Cycle property:** for any cycle, the heaviest edge is *not* in the MST (assuming unique weights).
4. **Cut property:** for any cut, the lightest crossing edge *is* in the MST.
5. Adding any non-MST edge creates exactly one cycle.
