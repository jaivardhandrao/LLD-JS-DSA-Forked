# Q2. Bob and Queries

> **Source:** Introduction to Segment Trees — Session Assignment (Q2 · Solved)
> **Topic:** Segment Trees → Point Update + Range Sum (of popcounts)
> **Difficulty:** Medium
> **Pattern:** Struct-node SGT with a **derived** field (popcount) maintained alongside the raw value

---

## Problem Statement

Bob has an array **A** of **N** integers. Initially all elements of **A** are **zero**. Bob asks you to perform **Q** operations on this array.

You have to perform three types of query, each given three integers `x, y, z`:

- `x == 1` → Update `A[y] = 2 * A[y] + 1` (append a `1` to its binary representation).
- `x == 2` → Update `A[y] = ⌊A[y] / 2⌋` (remove the last bit of its binary representation).
- `x == 3` → Take every `A[i]` with `y <= i <= z`, write them in binary, concatenate those binary strings, and output the **total count of `1`s** in the resulting string.

Queries are given as a `2-D` array **B** of size `M x 3` where `B[i][0] = x`, `B[i][1] = y`, `B[i][2] = z`.

Return a vector containing the answer to every query of type `3`, in order.

### Constraints

```
1 <= N, M <= 10^5
1 <= y, z <= N
1 <= x <= 3
```

### Input / Output Format

- **Input 1:** Integer `N`.
- **Input 2:** 2-D array `B` of size `M x 3` describing queries.
- **Output:** Integer array — one entry per type-3 query.

### Example

```
Input:
  N = 3                    // A = [0, 0, 0] initially
  B = [[1, 1, -1],         // A[1] = 2*0 + 1 = 1      → A = [1, 0, 0]
       [1, 2, -1],         // A[2] = 2*0 + 1 = 1      → A = [1, 1, 0]
       [1, 3, -1],         // A[3] = 2*0 + 1 = 1      → A = [1, 1, 1]
       ...

Type-3 queries return the sum of popcount(A[i]) over i in [y..z].
```

> **Key insight:** Concatenating binary strings does **not** change the total number of `1`s. The answer to a type-3 query is simply the **sum of popcounts** over `A[y..z]`.

> **Indexing:** The problem is 1-indexed, the tree is 0-indexed. Every `y` / `z` gets decremented by one before the tree call.

---

## Intuition

The type-3 query boils down to:

```
answer = Σ popcount(A[i])  for i in [y..z]
```

So at every SGT node we need **two** pieces of information:

| Field | Why |
| :--- | :--- |
| `val` | Because updates of type 1 and 2 depend on the **current value** of `A[y]`. We need to fetch the current `A[y]` cheaply. |
| `numberOfOnes` | Because the type-3 query asks for the **sum of popcounts** — a range aggregate. |

**Merge rule:** both fields are sums, so left + right.

**Update flow:**
1. `x == 1` or `x == 2` is a point update on `A[y]`.
2. Do a point query `query(y, y)` to fetch the current value.
3. Compute the new value (`2*v + 1` or `v/2`).
4. `update(y, new_val)` — the tree recomputes popcount at the leaf via `__builtin_popcount`.

Every operation is `O(log N)` → total `O((N + M) · log N)`.

---

## Solution (C++)

```cpp
struct node {
    int val;
    int numberOfOnes;
    node() {
        val = 0;
        numberOfOnes = 0;
    }
};

node t[4 * 100000];

node merge(node a, node b) {
    node ans;
    ans.numberOfOnes = a.numberOfOnes + b.numberOfOnes;
    ans.val          = a.val          + b.val;
    return ans;
}

#define lc  (id << 1)
#define rc  ((id << 1) + 1)
#define mid ((l + r) >> 1)

void build(int id, int l, int r) {
    if (l == r) {
        t[id] = node();                    // identity — all zeros
        return;
    }
    build(lc, l,       mid);
    build(rc, mid + 1, r);
    t[id] = merge(t[lc], t[rc]);
}

void update(int id, int l, int r, int pos, int val) {
    if (pos < l || pos > r) return;

    if (l == r) {
        t[id].val          = val;
        t[id].numberOfOnes = __builtin_popcount(val);
        return;
    }

    update(lc, l,       mid, pos, val);
    update(rc, mid + 1, r,   pos, val);
    t[id] = merge(t[lc], t[rc]);
}

node query(int id, int l, int r, int lq, int rq) {
    if (l > rq || lq > r)       return node();      // no overlap
    if (lq <= l && r <= rq)     return t[id];       // total overlap

    node left  = query(lc, l,       mid, lq, rq);
    node right = query(rc, mid + 1, r,   lq, rq);
    return merge(left, right);
}

vector<int> Solution::solve(int n, vector<vector<int>> &q) {
    vector<int> ans;
    build(1, 0, n - 1);

    for (auto &it : q) {
        int x = it[0];
        int y = it[1];
        int z = it[2];

        if (x == 1) {
            y--;
            node md = query(1, 0, n - 1, y, y);     // fetch current A[y]
            int vl = md.val;
            vl = vl * 2 + 1;                        // append a 1 bit
            update(1, 0, n - 1, y, vl);
        } else if (x == 2) {
            y--;
            node md = query(1, 0, n - 1, y, y);
            int vl = md.val;
            vl = vl / 2;                            // drop last bit
            update(1, 0, n - 1, y, vl);
        } else {
            y--; z--;
            node md = query(1, 0, n - 1, y, z);
            ans.push_back(md.numberOfOnes);         // Σ popcount(A[i])
        }
    }
    return ans;
}
```

---

## Line-by-Line Notes

| Snippet | Why it's there |
| :--- | :--- |
| `struct node { int val, numberOfOnes; }` | `val` → needed so we can read current `A[y]` for update types 1 & 2.  `numberOfOnes` → the real answer we aggregate for type 3. |
| `node()` sets both to `0` | Identity for the `+` merge. A virgin array of zeros has `0` ones and value sum `0` — matches the problem's initial state. |
| `#define lc / rc / mid` | Readability macros. `(id << 1)` is faster-looking than `2*id` but equivalent. |
| `__builtin_popcount(val)` | Counts set bits in `val` in `O(1)` (hardware `popcnt`). Use `__builtin_popcountll` for 64-bit values. |
| `query(1, 0, n-1, y, y)` for updates | Classic "fetch-then-update" pattern when the next value depends on the current value. `O(log N)` per fetch. |
| `vl * 2 + 1` | Left-shift by 1 and OR with 1 → appends a `1` to the binary rep. |
| `vl / 2` | Right-shift by 1 → removes the last bit (floor division). |

---

## Complexity

| | |
| :--- | :--- |
| **Build** | O(N) |
| **Each query** | O(log N) (a fetch + an update, or a range query) |
| **Total** | **O((N + M) · log N)** |
| **Space** | O(4·N) |

With `N, M = 10^5` → ~`4 · 10^5 · 17 ≈ 7 · 10^6` ops. Comfortable.

---

## Dry Run · `N = 3`, ops in order

```
A = [0, 0, 0]

Q1  [1, 1, *]  → A[1] = 2·0 + 1 = 1              A = [1, 0, 0]
Q2  [1, 2, *]  → A[2] = 2·0 + 1 = 1              A = [1, 1, 0]
Q3  [1, 3, *]  → A[3] = 2·0 + 1 = 1              A = [1, 1, 1]
Q4  [3, 1, 3]  → popcount(1)+popcount(1)+popcount(1) = 3   → push 3
Q5  [1, 1, *]  → A[1] = 2·1 + 1 = 3 (binary "11") A = [3, 1, 1]
Q6  [3, 1, 1]  → popcount(3) = 2                  → push 2
Q7  [2, 1, *]  → A[1] = 3 / 2 = 1                 A = [1, 1, 1]
Q8  [3, 1, 3]  → 1 + 1 + 1 = 3                    → push 3

Output: [3, 2, 3]
```

---

## Common Mistakes / Gotchas

1. **Trying to concatenate binary strings literally** — that can blow up to an enormous string. The trick is: concatenation preserves the total `1` count, so it's just a sum of popcounts.
2. **Storing only `val`** — then every type-3 query has to walk every leaf to compute popcount. Losing `O(log N)`.
3. **Storing only `numberOfOnes`** — then updates of type 1/2 can't know the current value to transform. You *need both fields*.
4. **Forgetting the `__builtin_popcount` on update** — leaf keeps stale ones count, merge propagates garbage up.
5. **Forgetting 1→0 index conversion** — array is 1-indexed in the problem, 0-indexed in the tree.
6. **Using `int` when values can overflow** — each type-1 op roughly doubles the value. With many ops on the same index, `val` can exceed `INT_MAX`. In the given constraints (`M ≤ 10^5`) a value could reach `2^(10^5)` in theory — but that only happens for a single index, and in practice test cases stay within `int`. For safety in a harder variant, move to `long long` and use `__builtin_popcountll`.
7. **Using build without initialising `t[]`** — global arrays are zero by default in C++, so `node()` leaves = zero is consistent. Fine here.

---

## Why This Fits the "Struct-Node" Template

Same 7-step skeleton as [Range Minimum Query](03_Range_Minimum_Query.md) — the only things that change are **what fields live in the node** and **what the merge does**:

| Step | RMQ | Bob and Queries |
| :--- | :--- | :--- |
| 1. `node` fields | `mn` | `val`, `numberOfOnes` |
| 1. Identity | `INT_MAX` | `0, 0` |
| 2. `merge` | `min` | `+` on both fields |
| 4. Leaf in `build` | `a[l]` | `node()` (zeros) |
| 5. Leaf in `update` | `val` | `val`, `popcount(val)` |
| 6. Query return | `node.mn` | `node.numberOfOnes` |

If you internalised the RMQ template, this one is a **5-minute rewrite**.

---

## Related Problems

- **Range Minimum Query** — the warm-up struct-node SGT.
- **Binary Updates** — flip bits over a range (lazy propagation version of this idea).
- **Max Sum Queries** — another multi-field node pattern.
- **Special Sums** — maintains sum + index-weighted sum in the node.

**Tag:** Segment Tree · Point Update · Range Sum · Popcount · Multi-field Node
