# Q3. Matrix Chain Multiplication

> **Source:** Dynamic Programming IV — Session Assignment (Q3 · Solved · 300 pts)
> **Topic:** Dynamic Programming → MCM / Interval DP
> **Difficulty:** Medium–Hard
> **Pattern:** Partition DP (choose a split point `k` inside a range `[i..j]`)

---

## Problem Statement

Given an array of integers **A** representing a chain of 2-D matrices such that the dimensions of the *i*-th matrix are `A[i-1] x A[i]`.

Find the most efficient way to multiply these matrices together. The problem is **not** to actually perform the multiplications, but merely to decide in which order to perform the multiplications.

Return the **minimum number of multiplications** needed to multiply the chain.

### Constraints

```
1 <= length of the array <= 1000
1 <= A[i] <= 100
```

### Input Format

The only argument is the integer array `A`.

### Example

```
Input:  A = [40, 20, 30, 10, 30]
Matrices: M1 = 40x20, M2 = 20x30, M3 = 30x10, M4 = 10x30

Optimal parenthesisation: (M1 x (M2 x M3)) x M4
Output: 26000
```

---

## Intuition

Multiplying a `p x q` matrix with a `q x r` matrix costs `p * q * r` scalar multiplications and produces a `p x r` matrix.

Matrix multiplication is **associative** — `(A*B)*C == A*(B*C)` — but the *number of operations* differs dramatically between parenthesisations. We need to pick the optimal split.

**Sub-problem:** `rec(i, j)` = minimum cost to multiply matrices `M_i ... M_j`.

For every possible split `k` (where `i <= k < j`), we break the chain into `[i..k]` and `[k+1..j]`, solve each half recursively, and add the cost of combining the two resulting matrices:

```
cost(i, j, k) = rec(i, k) + rec(k+1, j) + A[i-1] * A[k] * A[j]
                \_________/   \__________/   \_________________/
                 left half     right half     final multiplication
```

Take the minimum over all valid `k`.

**Base case:** `i == j` → a single matrix, no multiplication needed → return `0`.

---

## Solution (C++)

```cpp
const int INF = INT_MAX;
int dp[1010][1010];

int rec(int i, int j, vector<int> &a) {
    if (i == j) return 0;                 // single matrix — no cost

    int &ans = dp[i][j];
    if (ans != -1) return ans;            // memoised

    ans = INF;
    for (int k = i; k < j; k++) {
        ans = min(ans,
                  rec(i, k, a)
                + rec(k + 1, j, a)
                + (a[i-1] * a[k] * a[j])
                 );
    }
    return ans;
}

int Solution::solve(vector<int> &a) {
    memset(dp, -1, sizeof dp);
    return rec(1, a.size() - 1, a);       // matrices are indexed 1..n-1
}
```

---

## Line-by-Line Explanation

| Line | What it does |
| :--- | :--- |
| `dp[1010][1010]` | 2-D memo table — `dp[i][j]` caches the answer for range `[i..j]` |
| `if (i == j) return 0;` | One matrix in the range → nothing to multiply |
| `int &ans = dp[i][j];` | Reference so assigning to `ans` writes straight into the DP table |
| `if (ans != -1) return ans;` | Memoisation hit — skip recomputation |
| `for (k = i; k < j; k++)` | Try every valid split point between `i` and `j` |
| `a[i-1] * a[k] * a[j]` | Cost to multiply the **resulting** `(a[i-1] x a[k])` and `(a[k] x a[j])` matrices |
| `rec(1, a.size() - 1, a)` | The chain has `n-1` matrices; indices run from 1 to `n-1` |

### Why the indexing starts at 1

If `A = [p0, p1, p2, ..., pn]` (length `n+1`), then there are `n` matrices:

```
M1 = p0 x p1
M2 = p1 x p2
...
Mi = p[i-1] x p[i]
```

Matrix `Mi` has dimensions `a[i-1] x a[i]`, which is why the recursion uses `a[i-1]` for the "left" dimension, `a[k]` for the shared middle dimension after splitting at `k`, and `a[j]` for the "right" dimension.

---

## Complexity

| | |
| :--- | :--- |
| **States** | O(n²) — every `(i, j)` pair |
| **Transition** | O(n) — loop over split points `k` |
| **Time** | **O(n³)** |
| **Space** | **O(n²)** for the DP table + O(n) recursion stack |

With `n = 1000`, that is `10⁹` operations worst case — tight but passes with memoisation and tight inner loop.

---

## Dry Run · `A = [40, 20, 30, 10, 30]`

Matrices: `M1(40x20)  M2(20x30)  M3(30x10)  M4(10x30)`

| Range | Split at `k` | Cost breakdown | Min |
| :---: | :---: | :--- | ---: |
| `[1,1]` | — | single matrix | 0 |
| `[2,2]` | — | single matrix | 0 |
| `[3,3]` | — | single matrix | 0 |
| `[4,4]` | — | single matrix | 0 |
| `[1,2]` | k=1 | 0 + 0 + 40·20·30 | 24000 |
| `[2,3]` | k=2 | 0 + 0 + 20·30·10 | 6000 |
| `[3,4]` | k=3 | 0 + 0 + 30·10·30 | 9000 |
| `[1,3]` | k=1: 0 + 6000 + 40·20·10 = 14000<br>k=2: 24000 + 0 + 40·30·10 = 36000 | | **14000** |
| `[2,4]` | k=2: 0 + 9000 + 20·30·30 = 27000<br>k=3: 6000 + 0 + 20·10·30 = 12000 | | **12000** |
| `[1,4]` | k=1: 0 + 12000 + 40·20·30 = 36000<br>k=2: 24000 + 9000 + 40·30·30 = **69000**<br>k=3: 14000 + 0 + 40·10·30 = **26000** | | **26000** |

**Answer: 26000**, achieved by `(M1 x (M2 x M3)) x M4`.

---

## Common Mistakes / Gotchas

1. **Off-by-one on indices** — matrices are indexed from 1 because `Mi = a[i-1] x a[i]`. Starting recursion at `rec(0, n-1)` is wrong.
2. **Wrong "combine" cost** — it's `a[i-1] * a[k] * a[j]`, NOT `a[i] * a[k] * a[j]`.
3. **Forgetting to reset `dp`** — `memset(dp, -1, sizeof dp)` must run per test case.
4. **Integer overflow** — with dimensions up to 100 and `n = 1000`, intermediate costs can exceed `INT_MAX`. Using `INT_MAX` as sentinel is fine only because we never *add to* `INF`; but in harder variants upgrade to `long long`.

---

## Tabulation (Bottom-Up) Version

Sometimes asked to convert — same O(n³) time, iterative:

```cpp
int solve(vector<int> &a) {
    int n = a.size() - 1;                    // number of matrices
    vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));

    for (int len = 2; len <= n; len++) {              // chain length
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                dp[i][j] = min(dp[i][j],
                               dp[i][k] + dp[k+1][j] + a[i-1]*a[k]*a[j]);
            }
        }
    }
    return dp[1][n];
}
```

---

## Related Problems · "Partition DP" Family

- **Burst Balloons** (LC 312) — same split-on-`k` skeleton, trickier combine cost
- **Boolean Parenthesisation** — count valid parenthesisations yielding `true`
- **Palindrome Partitioning II** (LC 132) — min cuts, 1-D partition DP
- **Minimum Cost to Cut a Stick** (LC 1547) — geometric cousin of MCM
- **Rod Cutting** — same family, different combine rule

**Tag:** Dynamic Programming · Interval DP · Partition DP · Memoisation
