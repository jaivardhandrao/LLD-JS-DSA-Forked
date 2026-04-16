# Segment Trees

> Answer range queries (sum / min / max / gcd / …) and point updates in **O(log n)**.

## Mental Model

- Each node covers a range `[l, r]`.
- Root covers `[0, n-1]`.
- Left child covers `[l, mid]`, right child covers `[mid+1, r]`.
- Leaves correspond to individual array elements.
- Tree size: allocate `4 * n`.

## Sum Segment Tree — Point Update, Range Query

```cpp
int seg[4 * MAXN];
int a[MAXN];

void build(int node, int l, int r) {
    if (l == r) { seg[node] = a[l]; return; }
    int mid = (l + r) / 2;
    build(2*node,     l,     mid);
    build(2*node + 1, mid+1, r);
    seg[node] = seg[2*node] + seg[2*node + 1];
}

void update(int node, int l, int r, int idx, int val) {
    if (l == r) { seg[node] = val; return; }
    int mid = (l + r) / 2;
    if (idx <= mid) update(2*node,     l,     mid, idx, val);
    else            update(2*node + 1, mid+1, r,   idx, val);
    seg[node] = seg[2*node] + seg[2*node + 1];
}

int query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;              // disjoint
    if (ql <= l && r <= qr) return seg[node];    // fully inside
    int mid = (l + r) / 2;
    return query(2*node,     l,     mid, ql, qr)
         + query(2*node + 1, mid+1, r,   ql, qr);
}
```

## Range Update — Lazy Propagation

Push updates down only when a child is actually visited.

```cpp
int seg[4 * MAXN], lazy[4 * MAXN];

void push(int node, int l, int r) {
    if (lazy[node]) {
        seg[node] += (r - l + 1) * lazy[node];
        if (l != r) {
            lazy[2*node]     += lazy[node];
            lazy[2*node + 1] += lazy[node];
        }
        lazy[node] = 0;
    }
}

void update(int node, int l, int r, int ql, int qr, int val) {
    push(node, l, r);
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) {
        lazy[node] += val;
        push(node, l, r);
        return;
    }
    int mid = (l + r) / 2;
    update(2*node,     l,     mid, ql, qr, val);
    update(2*node + 1, mid+1, r,   ql, qr, val);
    seg[node] = seg[2*node] + seg[2*node + 1];
}

int query(int node, int l, int r, int ql, int qr) {
    push(node, l, r);
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return seg[node];
    int mid = (l + r) / 2;
    return query(2*node,     l,     mid, ql, qr)
         + query(2*node + 1, mid+1, r,   ql, qr);
}
```

## Complexity

| Operation | Time |
| :--- | :---: |
| Build | O(n) |
| Point / range update | O(log n) |
| Range query | O(log n) |
| Space | O(4n) |

## Variants You Might See

- **Min/Max seg tree** — replace `+` with `min` / `max`, neutral element with `INT_MAX` / `INT_MIN`.
- **GCD seg tree** — replace `+` with `gcd`.
- **XOR seg tree** — useful for parity / subset-XOR problems.
- **Fenwick / BIT** — simpler `O(log n)` structure for sum-with-point-update, less flexible.

## MCQ Traps

- Tree size must be `4n`, not `2n` (enough for any `n`).
- Query range `[ql, qr]` must be **fully inside** `[l, r]` to short-circuit; only *disjoint* if fully outside.
- Remember to push lazy **before** descending and recombine children **after**.
