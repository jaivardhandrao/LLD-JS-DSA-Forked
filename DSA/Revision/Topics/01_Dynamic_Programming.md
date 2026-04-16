# Dynamic Programming — Exam Revision

> **Weight in DSA IV exam:** Highest. Expect at least one coding DP + several MCQs.

## 1. When to Reach for DP

Three signals:

1. **Overlapping sub-problems** — the same smaller problem recurs many times.
2. **Optimal substructure** — optimum of the whole can be built from optima of parts.
3. Answer asks for *min / max / count / true-false* over a combinatorial space.

If you see "try all" in the recursion and the same `(state)` repeats → memoise.

## 2. DP Patterns Cheat Sheet

| Pattern | Typical states | Problems |
| :--- | :--- | :--- |
| **0/1 Knapsack** | `(i, capacity)` | Subset sum, partition equal, target sum |
| **Unbounded Knapsack** | `(i, capacity)` with `i` stays | Coin change min, rod cutting |
| **LIS-like** | `(i)` + previous index | LIS, Russian-doll envelopes |
| **LCS / Edit-distance** | `(i, j)` over two strings | LCS, edit distance, palindrome subseq |
| **Interval / Partition DP** | `(i, j)` pick split `k` | **Matrix Chain Mult**, Burst Balloons, Palindrome Partition II |
| **DP on subsets (bitmask)** | `(mask, i)` | TSP, assignment problem |
| **Grid DP** | `(i, j)` | Unique paths, min path sum, edit grids |
| **Digit DP** | `(pos, tight, state)` | Count numbers with property ≤ N |
| **DP on Trees** | `(node, state)` | Diameter, House Robber III |

## 3. The Universal DP Template (Memoisation)

```cpp
int dp[N][M];            // -1 means "not computed"

int rec(int state1, int state2) {
    if (base_case) return base_value;

    int &ans = dp[state1][state2];
    if (ans != -1) return ans;

    ans = initial;                 // INT_MAX for min, 0 for count, etc.
    for (every choice) {
        ans = combine(ans, rec(new_state1, new_state2));
    }
    return ans;
}
```

## 4. Memoisation → Tabulation Conversion

1. Identify all states and their ranges.
2. Figure out the order of dependency (which smaller state does each state need).
3. Loop in that order.
4. Translate base case to initial fills.
5. `return dp[initial_state]`.

## 5. Space Optimisation Tricks

- **1-D rolling array** when transition only uses `dp[i-1][*]`.
- **Two rows** when it needs `dp[i]` and `dp[i-1]`.
- **In-place traversal direction** for 0/1 vs unbounded knapsack:
  - 0/1 knapsack: iterate capacity `W ... w` (right to left).
  - Unbounded: iterate capacity `w ... W` (left to right).

## 6. Must-Know Code Snippets

### LIS (O(n log n))

```cpp
vector<int> tails;
for (int x : a) {
    auto it = lower_bound(tails.begin(), tails.end(), x);
    if (it == tails.end()) tails.push_back(x);
    else *it = x;
}
int lis = tails.size();
```

### 0/1 Knapsack (1-D)

```cpp
vector<int> dp(W + 1, 0);
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
return dp[W];
```

### LCS

```cpp
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        dp[i][j] = (s[i-1] == t[j-1])
                 ? dp[i-1][j-1] + 1
                 : max(dp[i-1][j], dp[i][j-1]);
```

### Edit Distance

```cpp
dp[i][j] = (s[i-1] == t[j-1])
         ? dp[i-1][j-1]
         : 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
```

### Matrix Chain Multiplication — see [`01_Matrix_Chain_Multiplication.md`](../Assignments/01_Matrix_Chain_Multiplication.md)

## 7. Common Pitfalls

- **Memo not reset** between test cases → stale answers.
- **Array bounds** on the DP table — always size `N+1` to be safe.
- **Overflow** — when summing many large numbers, switch to `long long`.
- **Wrong base case** in recursion — dry-run single-element inputs.
- **Double-counting** in subset/count DP — make sure the recurrence picks each element exactly once.
