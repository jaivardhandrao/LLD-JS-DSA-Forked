# Q1. Range Minimum Query

> **Source:** Introduction to Segment Trees — Session Assignment (Q1 · Solved)
> **Topic:** Segment Trees → Point Update + Range Min Query
> **Difficulty:** Easy–Medium
> **Pattern:** Classic Segment Tree (SGT) — struct-node template

---

## Problem Statement

Given an integer array **A** of size **N**, you have to perform two types of query. Each query is given three integers `x, y, z`:

- If `x == 0` → **Point update**: set `A[y] = z`.
- If `x == 1` → **Range query**: output the **minimum element** in the array **A** between indices `y` and `z` **inclusive**.

Queries are described by a `2-D` array **B** of size `M x 3` where `B[i][0] = x`, `B[i][1] = y`, `B[i][2] = z`.

Return an integer array denoting the output of each query where the value of `x` is `1`.

### Constraints

```
1 <= N, M <= 10^5
1 <= A[i] <= 10^9
If x == 0,  1 <= y <= N  and  1 <= z <= 10^9
If x == 1,  1 <= y <= z <= N
```

### Input / Output Format

- **Input 1:** The integer array `A` of size `N`.
- **Input 2:** The 2-D array `B` of size `M x 3` describing queries.
- **Output:** Integer array with one entry per query having `x == 1`.

### Example

```
Input:
  A = [1, 4, 1]
  B = [[1, 1, 3],
       [0, 1, 5],
       [1, 1, 2]]

Dry run:
  Query 1 → x=1, range [1..3]        → min(1, 4, 1) = 1
  Query 2 → x=0, A[1] = 5            → A becomes [5, 4, 1]
  Query 3 → x=1, range [1..2]        → min(5, 4)    = 4

Output: [1, 4]
```

> **Note on indexing:** The problem uses **1-indexed** positions, but the segment tree below is **0-indexed**. So every `y` / `z` gets decremented by one before calling `update` / `query`.

---

## Intuition

We need:
1. **Fast range minimum** — naive `O(N)` scan per query is `O(N·M) ≈ 10^10` → TLE.
2. **Fast point updates** — can't rebuild anything per update.

A **Segment Tree** gives both in `O(log N)`:

- Each node of the tree stores the **minimum** of the range `[l, r]` it covers.
- `build` recursively partitions the array, storing merged values bottom-up.
- `update` walks down to a single leaf, then re-merges on the way back up.
- `query` cuts the target range into a logarithmic number of stored nodes.

The **identity element** for `min` is `INT_MAX` — combining any value with `INT_MAX` leaves it unchanged.

---

## Solution (C++)

```cpp
vector<int> a;

const int MX = INT_MAX;

struct node {
    int min;
    node() { min = MX; }        // identity element for the merge
};

node t[4 * 100000];

node merge(node a, node b) {
    node ans;
    ans.min = min(a.min, b.min);
    return ans;
}

void build(int id, int l, int r) {
    if (l == r) {
        t[id].min = a[l];
        return;
    }
    int lc  = 2 * id;
    int rc  = 2 * id + 1;
    int mid = (l + r) / 2;
    build(lc, l,       mid);
    build(rc, mid + 1, r);
    t[id] = merge(t[lc], t[rc]);
}

void update(int id, int l, int r, int pos, int val) {
    if (l > pos || r < pos) return;          // out of range

    if (l == r) {
        t[id].min = val;
        return;                              // MUST return here
    }

    int lc  = 2 * id;
    int rc  = 2 * id + 1;
    int mid = (l + r) / 2;
    update(lc, l,       mid, pos, val);
    update(rc, mid + 1, r,   pos, val);
    t[id] = merge(t[lc], t[rc]);             // re-merge after update
}

node query(int id, int l, int r, int lq, int rq) {
    if (l > rq || lq > r) return node();     // no overlap → identity

    if (lq <= l && r <= rq) return t[id];    // total overlap

    int lc  = 2 * id;
    int rc  = 2 * id + 1;
    int mid = (l + r) / 2;
    return merge(query(lc, l,       mid, lq, rq),
                 query(rc, mid + 1, r,   lq, rq));
}

vector<int> Solution::solve(vector<int> &a1, vector<vector<int>> &b) {
    a = a1;
    int n = a.size();

    build(1, 0, n - 1);

    vector<int> ans;
    for (auto &it : b) {
        int x = it[0];
        int y = it[1];
        int z = it[2];

        if (x == 0) {
            y--;                             // 1-indexed → 0-indexed
            update(1, 0, n - 1, y, z);
        } else {
            y--; z--;
            node nd = query(1, 0, n - 1, y, z);
            ans.push_back(nd.min);
        }
    }
    return ans;
}
```

---

## Complexity

| | |
| :--- | :--- |
| **Build** | O(N) |
| **Point update** | O(log N) |
| **Range query** | O(log N) |
| **Total** | **O((N + M) · log N)** |
| **Space** | O(4·N) for the tree array |

With `N, M = 10^5` → about `10^5 · 17 ≈ 1.7 · 10^6` operations. Fast.

---

## Common Mistakes / Gotchas

1. **Forgetting 1→0 index conversion** — the problem is 1-indexed, the tree is 0-indexed.
2. **No early `return` after leaf update** — the code falls into the recursive branch and accesses `2*id` out of bounds.
3. **Wrong identity** in `node()` — using `0` instead of `INT_MAX` breaks min queries (min of anything with 0 is 0).
4. **Tree size too small** — must be `4 * N`, not `2 * N` or `N`.
5. **Not re-merging after update** — internal nodes silently keep the old minimum.
6. **Confusing "no overlap" with "partial overlap"** — the only overlap cases that return early are *total* overlap or *no* overlap; partial overlap must recurse on **both** children.

---

# Step-by-Step Template (Memorize This Order)

Follow these steps **in this exact order** every time you write a Segment Tree (SGT). Don't skip, don't reorder.

---

## Step 1 — Define the `node` struct

Think: **"What info do I need at each segment tree node to answer my query?"**

- For range **min**: just `int mn`.
- For range **sum**: just `long long sum`.
- For more complex problems: multiple fields (e.g. max + its index, count + sum, etc.).

```cpp
struct node {
    int mn;
    node() { mn = INT_MAX; }    // identity element for min
};
```

**Rule — default constructor stores the *identity* of your merge:**

| Merge | Identity |
| :--- | :--- |
| Min | `INT_MAX` |
| Max | `INT_MIN` |
| Sum | `0` |
| GCD | `0` |
| Product | `1` |

---

## Step 2 — Write `merge()`

Think: **"Given info from left child and right child, how do I combine?"**

```cpp
node merge(node a, node b) {
    node ans;
    ans.mn = min(a.mn, b.mn);
    return ans;
}
```

Sanity check: `merge(node(), x)` must equal `x`. If it doesn't, your identity is wrong.

---

## Step 3 — Declare the tree array

```cpp
node t[4 * N];      // always 4 * N size
```

---

## Step 4 — Write `build(id, l, r)`

**Template (memorize):**

```cpp
void build(int id, int l, int r) {
    if (l == r) {
        t[id].mn = a[l];                 // ← read array here
        return;
    }
    int mid = (l + r) / 2;
    int lc = 2 * id, rc = 2 * id + 1;
    build(lc, l,       mid);
    build(rc, mid + 1, r);
    t[id] = merge(t[lc], t[rc]);         // ← store merge result
}
```

**Two things that MUST be there:**
1. Leaf reads from `a[l]`.
2. Internal node **stores** `merge(...)` into `t[id]`.

---

## Step 5 — Write `update(id, l, r, pos, val)` — point update

**Template:**

```cpp
void update(int id, int l, int r, int pos, int val) {
    if (pos < l || pos > r) return;      // out of range

    if (l == r) {
        t[id].mn = val;                  // ← update leaf
        return;                          // ← DON'T FORGET
    }

    int mid = (l + r) / 2;
    int lc = 2 * id, rc = 2 * id + 1;
    update(lc, l,       mid, pos, val);
    update(rc, mid + 1, r,   pos, val);
    t[id] = merge(t[lc], t[rc]);         // ← re-merge after update
}
```

**Three things that MUST be there:**
1. Out-of-range early return.
2. Leaf case has `return` **after** the assignment.
3. Internal node re-merges after children are updated.

---

## Step 6 — Write `query(id, l, r, lq, rq)`

**Template:**

```cpp
node query(int id, int l, int r, int lq, int rq) {
    if (r < lq || l > rq) return node();      // no overlap → identity

    if (lq <= l && r <= rq) return t[id];     // total overlap → return as-is

    int mid = (l + r) / 2;
    int lc = 2 * id, rc = 2 * id + 1;
    return merge(query(lc, l,       mid, lq, rq),
                 query(rc, mid + 1, r,   lq, rq));
}
```

**Three cases:**
1. **No overlap** → return identity (`node()`).
2. **Total overlap** → return stored value.
3. **Partial overlap** → recurse on **both** children and merge.

---

## Step 7 — Driver Code

```cpp
build(1, 0, n - 1);

// for each query:
update(1, 0, n - 1, pos, val);              // point update
node res = query(1, 0, n - 1, l, r);        // range query
```

---

# The Mental Checklist (Run Through Before Submitting)

Before submitting any SGT code, verify:

1. ☐ `node()` default constructor = identity element?
2. ☐ `merge()` correct for my operation?
3. ☐ `build` leaf reads `a[l]`?
4. ☐ `build` internal node does `t[id] = merge(...)`?
5. ☐ `update` leaf has `return` after the assignment?
6. ☐ `update` internal node does `t[id] = merge(...)`?
7. ☐ `query` no-overlap returns `node()`?
8. ☐ `query` total-overlap returns `t[id]`?
9. ☐ Tree size is `4 * N`?
10. ☐ Called with `build(1, 0, n - 1)` (root id = 1, 0-indexed range)?

---

# How to Drill This

Write segment tree **from scratch 3 times** for these problems, in order:

1. **Range minimum with point update** — the one you just did.
2. **Range sum with point update** — change `merge` to `+` and identity to `0`.
3. **Range max with index** — node has two fields (max value + its index); merge picks the larger, tie-breaks on lower index.

After the 3rd one, the template becomes permanent muscle memory.

---

## Related Problems

- **Bob and Queries** — SGT with multiple tracked stats (0-count, 1-count, longest run).
- **Binary Updates** — XOR-style flip updates on a segment tree.
- **Max Sum Queries** — range max + point update.
- **Kth Smallest in Range** — merge sort tree / persistent SGT.
- **Special Sums** — combining sum and index-weighted sum in one node.

**Tag:** Segment Tree · Point Update · Range Min · Struct-Node Template
