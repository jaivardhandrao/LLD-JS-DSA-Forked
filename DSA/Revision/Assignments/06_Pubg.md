# Q3. Pubg

> **Source:** GCD · Session Assignment (Q3 · Solved)
> **Topic:** Number Theory → GCD
> **Difficulty:** Easy (once you see the trick)
> **Pattern:** "Min non-zero residue reachable by repeated subtraction" = **GCD of all values**

---

## Problem Statement

There are **N** players, each with strength **A[i]**. When player `i` attacks player `j`, player `j`'s strength reduces to:

```
A[j] = max(0, A[j] - A[i])
```

When a player's strength reaches **zero**, it loses the game. The game continues until only **1** survivor remains.

Find the **minimum possible health** the last surviving player can have.

### Constraints

```
1 <= N     <= 100000
1 <= A[i]  <= 1000000
```

### Input Format

The only argument is the integer array `A`.

### Output Format

Return a single integer denoting the minimum health of the last survivor.

### Examples

```
Input 1:  A = [6, 4]      →  Output 1:  2
Input 2:  A = [2, 3, 4]   →  Output 2:  1
```

---

## Intuition — why the answer is `gcd(A)`

Each attack does `A[j] ← A[j] − A[i]` (clamped at 0). This is **exactly the subtractive step in Euclid's algorithm**:

```
gcd(a, b) = gcd(a − b, b)    when a >= b
```

Repeatedly attacking between two players simulates Euclid on their pair → eventually one of them becomes `gcd(a, b)` and the other becomes `0` (eliminated).

Generalising to `N` players, any sequence of attacks preserves the invariant:

> **Every reachable value on the board is a linear combination of the original `A[i]`, hence a multiple of `gcd(A)`.**

So the smallest positive value that can ever appear (and therefore the smallest possible last-survivor health) is exactly `gcd(A[0], A[1], …, A[N-1])`.

### Why we can **always** reach the GCD

Pick any two players with values `a, b`. Simulating Euclid on them reduces one of the pair to `gcd(a, b)` and kills the other. Fold this value into the array and repeat with the next player — each fold replaces two numbers `(x, y)` with `gcd(x, y)` and eliminates one player. After `N − 1` folds, exactly one player survives with value:

```
gcd(gcd(gcd(A[0], A[1]), A[2]), …, A[N-1]) = gcd(A)
```

### Why we **cannot** go below the GCD

`gcd(A)` divides every `A[i]`. Since subtraction of multiples of `gcd(A)` still yields multiples of `gcd(A)`, no reachable value can be a smaller positive number than `gcd(A)`.

---

## Solution (C++)

```cpp
int Solution::solve(vector<int> &A) {
    int g = A[0];
    for (int i : A)
        g = __gcd(g, i);
    return g;
}
```

### Notes

- `__gcd` is a GCC built-in; it uses the Euclidean algorithm in `O(log(max))`.
- `gcd(g, 0) = g`, and `gcd(g, g) = g`, so initialising with `A[0]` and then folding it back in is harmless.
- C++17 and newer also have `std::gcd` from `<numeric>`.

---

## Dry Run

### `A = [6, 4]`
```
g = 6
gcd(6, 6) = 6
gcd(6, 4) = 2
answer = 2 ✓
```
Simulation: attack `6 → 4`, strengths become `[2, 4]`. Attack `4 → 2`, `[2, 2]`. Attack → `[2, 0]`. Survivor has `2`.

### `A = [2, 3, 4]`
```
g = 2
gcd(2, 2) = 2
gcd(2, 3) = 1
gcd(1, 4) = 1
answer = 1 ✓
```
Simulation: reduce `3 → 2` → `[2, 1, 4]`. Then `1` can chip `2` and `4` down to `1` and `0`. Survivor: `1`.

---

## Complexity

| | |
| :--- | :--- |
| **Time** | `O(N · log(max(A)))` — one `__gcd` per element |
| **Space** | `O(1)` |

With `N = 10^5` and `max = 10^6` → ~`2 · 10^6` ops. Instant.

---

## Common Mistakes / Gotchas

1. **Simulating the game literally** — trying to minimise by brute-forcing attack order is exponential. The GCD observation collapses it to O(N log max).
2. **Returning `min(A)`** — tempting but wrong. Example: `[6, 4]` has `min = 4`, but the answer is `2 = gcd`.
3. **Forgetting the `A[0]` seed** — starting `g = 0` also works since `gcd(0, x) = x`, but using `A[0]` makes the intent clearer.
4. **Using `int` with `long long` inputs in a harder variant** — `__gcd` is templated; feed it matching types. For `long long` use `__gcd<long long>` or C++17 `std::gcd`.
5. **Confusing GCD with minimum** — they coincide sometimes (e.g., when `min(A)` divides every other `A[i]`) but not in general.

---

## The Underlying Theorem

> The set of values reachable by repeated `max(0, a − b)` on the multiset `{A[0], …, A[N-1]}` equals the set of **non-negative multiples of `gcd(A)`**.

This is the same fact that powers:

- **Water Jug Problem / Die Hard** — reach amount `X` with two jugs of sizes `a, b` iff `gcd(a, b) | X`.
- **Chicken McNugget / Frobenius** — smallest positive combination is `gcd`.
- **Diophantine equations** `ax + by = c` — solvable iff `gcd(a, b) | c`.

Memorise: **"repeated subtraction → GCD"** and you handle a whole class of problems.

---

## Related Problems

- **Greatest Common Divisor** — the direct `__gcd` primitive.
- **Delete One** — max GCD after removing one element (prefix/suffix GCD).
- **GCD of N numbers** — the fold in this solution, asked standalone.
- **A, B and Modulo** — sibling identity `A ≡ B (mod M) ⇔ M | (A − B)`.

**Tag:** Number Theory · GCD · Euclidean Algorithm · O(1) observation
