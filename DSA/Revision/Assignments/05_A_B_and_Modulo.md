# Q2. A, B and Modulo

> **Source:** Maths — Modular Arithmetic · Session Assignment (Q2)
> **Topic:** Number Theory → Modular Arithmetic
> **Difficulty:** Easy
> **Pattern:** One-line number-theory observation — "same remainder ⇒ divides the difference"

---

## Problem Statement

Given two integers **A** and **B**, find the **greatest possible positive integer M** such that:

```
A % M  ==  B % M
```

### Constraints

```
1 <= A, B <= 10^9
A != B
```

### Input Format

- First argument: integer `A`.
- Second argument: integer `B`.

### Output Format

Return an integer denoting the greatest possible positive `M`.

### Examples

```
Input 1:  A = 1,  B = 2     →  Output 1:  1
Input 2:  A = 5,  B = 10    →  Output 2:  5
```

---

## Intuition — the one-liner

If `A % M == B % M`, then `A` and `B` leave the same remainder when divided by `M`. That means their **difference is a multiple of `M`**:

```
A ≡ B  (mod M)   ⇔   M  |  (A − B)
```

So every valid `M` is a **divisor of `|A − B|`**. The **greatest** divisor of any positive integer `x` is `x` itself, so:

```
answer = |A − B|
```

That's it. No loops, no sieve, no GCD — just an absolute difference.

### Why `|A − B|` itself works

Let `d = |A − B|`. Then `A = B ± d`, so `A mod d = B mod d` trivially (both sides differ by a multiple of `d`).

### Why no bigger `M` can exist

If `M > |A − B|`, then `A` and `B` both lie inside the same "block" of length `M` on the number line (since they differ by less than `M`), but they are distinct (`A ≠ B`), so they give **different** remainders. Contradiction.

---

## Solution (C++)

```cpp
int Solution::solve(int A, int B) {
    return abs(A - B);
}
```

That's the entire solution.

### Notes

- `A` and `B` can each be up to `10^9`, which fits in `int`. Their difference also fits in `int` (magnitude ≤ `10^9`), so plain `abs(A - B)` is safe.
- If the constraint were `10^18`, switch to `long long` and `llabs`.

---

## Dry Run

| A | B | \|A − B\| | Check |
| :---: | :---: | :---: | :--- |
| 1 | 2 | 1 | `1 % 1 = 0`, `2 % 1 = 0` ✓ |
| 5 | 10 | 5 | `5 % 5 = 0`, `10 % 5 = 0` ✓ |
| 7 | 19 | 12 | `7 % 12 = 7`, `19 % 12 = 7` ✓ |
| 100 | 40 | 60 | `100 % 60 = 40`, `40 % 60 = 40` ✓ |

In every case, `|A − B|` is the largest `M` for which both remainders match.

---

## Complexity

| | |
| :--- | :--- |
| **Time** | O(1) |
| **Space** | O(1) |

---

## Common Mistakes / Gotchas

1. **Iterating down from `min(A, B)` to find the answer** — works but is `O(min(A, B))` ≈ `10^9` ops → TLE. No loop is needed.
2. **Returning `A - B` without `abs`** — gives a negative answer when `A < B`. Problem asks for a **positive** integer.
3. **Returning `gcd(A, B)`** — confuses this with a different classic. `gcd(A, B)` is not generally equal to `|A − B|` and is **not** what's asked.
4. **Integer overflow on larger variants** — safe here but worth remembering when `A, B` grow to `10^18`.
5. **Forgetting the `A != B` constraint** — if `A == B`, then `|A − B| = 0`, which isn't a "positive" integer. The problem rules this case out explicitly.

---

## The Underlying Theorem (for MCQs)

> `A ≡ B (mod M)`  ⇔  `M | (A − B)`

This is one of the most reused facts in number-theory problems. Related uses:

- **Pair Sum Divisible by M** — group elements by their remainder mod `M`.
- **Subarrays with sum divisible by K** — prefix sums mod `K` + pigeonhole.
- **Cycle detection on modular paths** — two visits to the same residue class imply a cycle of length dividing their distance.

If you remember "same residue ⇔ difference is a multiple", you solve a large family of problems without thinking.

---

## Related Problems

- **Pair Sum Divisible by M** — same residue-class trick in reverse.
- **Mod Sum** — counts of pairs whose sum mod M matches.
- **Greatest Common Divisor** — natural follow-up (GCD of `A − B` with another constraint gives a common divisor answer).
- **Excel Column Title** — unrelated mechanics but same class of "tiny observation" problem.

**Tag:** Number Theory · Modular Arithmetic · O(1) observation
