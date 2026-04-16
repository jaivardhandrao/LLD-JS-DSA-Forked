# Q4. Unique Binary Search Trees II

> **Source:** Dynamic Programming IV — Session Assignment (Q4 · Solved)
> **Topic:** Dynamic Programming → Catalan Numbers
> **Difficulty:** Medium
> **Pattern:** Count-DP · pick-a-root partition

---

## Problem Statement

Given an integer **A**, how many **structurally unique BSTs** (binary search trees) exist that can store values `1 … A`?

### Constraints

```
1 <= A <= 18
```

### Input Format

Single integer `A`.

### Output Format

Single integer — the number of structurally unique BSTs.

### Example

```
Input:  A = 3
Output: 5

The five structurally unique BSTs holding {1, 2, 3}:

   1          1            2           3        3
    \          \          / \         /        /
     2          3        1   3       1        2
      \        /                      \      /
       3      2                        2    1
```

---

## Intuition

"Structurally unique" means only the **shape** matters, not the labels.

**Pick a root.** If `i` is the root, then:
- Nodes `1 .. i-1` form the left subtree → that's a BST problem of size `i-1`.
- Nodes `i+1 .. n` form the right subtree → that's a BST problem of size `n-i`.

Since the two subtrees are independent, multiply their counts. Sum over every choice of root:

```
numTrees(n) = Σ  numTrees(i-1) · numTrees(n-i)       for i = 1..n
```

**Base case:** `numTrees(0) = 1` (empty tree is one "shape") and `numTrees(1) = 1`.

This recurrence is exactly the **Catalan numbers**:

```
C(n) = Σ  C(i) · C(n-1-i)       for i = 0..n-1

C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42, ...
```

So `numTrees(n) = C(n)`.

---

## Solution (C++)

```cpp
vector<int> dp(20, -1);

int Solution::numTrees(int n) {
    if (n <= 1) return 1;                 // empty / single-node tree

    int &ans = dp[n];
    if (ans != -1) return ans;            // memoised

    ans = 0;
    for (int i = 1; i <= n; i++) {
        ans += numTrees(i - 1) * numTrees(n - i);
    }
    return ans;
}
```

---

## Line-by-Line Explanation

| Line | What it does |
| :--- | :--- |
| `vector<int> dp(20, -1);` | Memo table — `A ≤ 18` so size 20 is enough. Sentinel `-1` = not computed |
| `if (n <= 1) return 1;` | Empty tree and single-node tree each contribute exactly 1 shape |
| `int &ans = dp[n];` | Reference — writing to `ans` writes straight into `dp[n]` |
| `if (ans != -1) return ans;` | Memoisation hit |
| `for (i = 1; i <= n; i++)` | Try every value as root |
| `numTrees(i-1) * numTrees(n-i)` | Independent left (`i-1` nodes) and right (`n-i` nodes) subtrees multiply |

### Why "structurally unique" matches this recurrence

If the nodes were unlabeled, any two subtrees of the same size are interchangeable and we'd count shapes. But in a BST the **keys force the structure** — the smaller `i-1` keys must go left, the larger `n-i` must go right — so choosing the root determines which keys land in which subtree, and the count of "shapes with those keys" is the same as the count of shapes with `1..size`.

---

## Complexity

| | |
| :--- | :--- |
| **States** | O(n) — one per `numTrees(k)` for `k = 0..n` |
| **Transition** | O(n) — loop over split points |
| **Time** | **O(n²)** |
| **Space** | **O(n)** for memo + O(n) recursion stack |

With `n = 18` this is trivial. The answer `C(18) = 477638700` fits comfortably in `int`.

**For reference — how big do Catalans get?**

| n | C(n) |
| :---: | ---: |
| 0 | 1 |
| 5 | 42 |
| 10 | 16,796 |
| 15 | 9,694,845 |
| 18 | **477,638,700** |
| 20 | 6,564,120,420 ← overflows 32-bit `int` |

The constraint `A ≤ 18` is chosen precisely so the answer stays within `int`.

---

## Dry Run · `A = 4`

Goal: compute `numTrees(4)`.

```
numTrees(0) = 1      (base)
numTrees(1) = 1      (base)

numTrees(2) = numTrees(0)·numTrees(1)  +  numTrees(1)·numTrees(0)
            = 1·1 + 1·1
            = 2

numTrees(3) = numTrees(0)·numTrees(2)  (root=1)
            + numTrees(1)·numTrees(1)  (root=2)
            + numTrees(2)·numTrees(0)  (root=3)
            = 1·2 + 1·1 + 2·1
            = 5

numTrees(4) = numTrees(0)·numTrees(3)  (root=1)
            + numTrees(1)·numTrees(2)  (root=2)
            + numTrees(2)·numTrees(1)  (root=3)
            + numTrees(3)·numTrees(0)  (root=4)
            = 1·5 + 1·2 + 2·1 + 5·1
            = 14
```

**Answer: 14.**

---

## Bottom-Up (Tabulation) Version

Same recurrence, loops instead of recursion:

```cpp
int numTrees(int n) {
    vector<int> dp(n + 1, 0);
    dp[0] = dp[1] = 1;
    for (int k = 2; k <= n; k++) {
        for (int i = 1; i <= k; i++) {
            dp[k] += dp[i - 1] * dp[k - i];
        }
    }
    return dp[n];
}
```

## Closed Form (nice to know)

The Catalan number has a direct formula:

```
C(n) = (1 / (n + 1)) · C(2n, n)        [binomial coefficient]
```

And a simpler recurrence for on-the-fly calculation:

```
C(n+1) = C(n) · 2(2n + 1) / (n + 2)
```

Either lets you compute the answer in O(n) with constant-space integer math — but not needed for this constraint.

---

## Common Mistakes / Gotchas

1. **Forgetting `dp[0] = 1`.** The empty tree counts as one shape; without it, every recursion that has an empty side returns 0 and the whole sum collapses to 0.
2. **Using `dp[n]` at global scope without resetting.** Fine here because the memo is filled purely from the recurrence and all inputs ≤ 18 give the same answer, but in general a global memo is a footgun.
3. **Confusing with "Unique BSTs II" (LC 95)** which asks to **return all the trees**, not just the count — that one requires constructing `TreeNode`s and has exponential output size.
4. **Overflow** — at `n = 20` the answer passes `INT_MAX`. Constraint `A ≤ 18` keeps you safe; if the constraint were larger, switch to `long long`.

---

## Related Problems · Catalan Family

All of the following count combinatorial structures and collapse to Catalan numbers:

| Problem | Catalan interprets as |
| :--- | :--- |
| **Unique BSTs** (this) | Shapes of BSTs on `n` ordered keys |
| Balanced parentheses | Valid bracket sequences of length `2n` |
| Dyck paths | Paths on a grid staying above the diagonal |
| Mountain ranges | Up-down steps returning to origin without going below |
| Non-crossing chords on a circle | Ways to pair `2n` points |
| Ways to triangulate a convex `(n+2)`-gon | Same recurrence |
| Full binary trees with `n+1` leaves | Structural count |

**Tag:** Dynamic Programming · Catalan · Memoisation · Tree Counting
