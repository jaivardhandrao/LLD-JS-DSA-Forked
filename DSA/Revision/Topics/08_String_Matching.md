# String Matching — Rabin-Karp & Z-Algorithm

Given a text `T` (length `n`) and a pattern `P` (length `m`), find all occurrences of `P` in `T`.

## Rabin-Karp — rolling hash

**Idea:** compare hash of every length-`m` window in `T` against hash of `P`. When hashes match, verify character-by-character (to avoid false positives from collisions).

```cpp
const long long MOD = 1e9 + 7;
const long long BASE = 31;

vector<int> rabinKarp(const string &t, const string &p) {
    int n = t.size(), m = p.size();
    vector<int> matches;
    if (m > n) return matches;

    long long hp = 0, ht = 0, power = 1;
    for (int i = 0; i < m - 1; i++) power = power * BASE % MOD;

    for (int i = 0; i < m; i++) {
        hp = (hp * BASE + (p[i] - 'a' + 1)) % MOD;
        ht = (ht * BASE + (t[i] - 'a' + 1)) % MOD;
    }

    for (int i = 0; i <= n - m; i++) {
        if (hp == ht && t.compare(i, m, p) == 0) matches.push_back(i);

        if (i < n - m) {
            ht = (ht - (t[i] - 'a' + 1) * power % MOD + MOD * MOD) % MOD;
            ht = (ht * BASE + (t[i + m] - 'a' + 1)) % MOD;
        }
    }
    return matches;
}
```

**Complexity**
- Average / expected: **O(n + m)**.
- Worst case (many collisions): O(n · m).

**Tips**
- Use a **large prime mod** and a base coprime with it.
- Use **double hashing** (two independent `(base, mod)` pairs) for robustness in competitive settings — the probability of a collision drops to ~`1/(M1·M2)`.
- Always verify on hash match unless you're absolutely confident collisions are impossible.

## Z-Algorithm

**`Z[i]`** = length of the longest substring starting at position `i` which is also a **prefix** of the string.

By convention `Z[0] = 0` (or equivalently, the length of the string — depends on convention; be consistent).

```cpp
vector<int> zFunction(const string &s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}
```

**Complexity:** O(n) — each character participates in the inner while-loop at most a constant number of times amortised.

### Pattern Matching with Z

Build the string `S = P + '#' + T` where `#` is a separator not appearing in either.

Compute `Z` of `S`. Every index `i > m` with `Z[i] == m` corresponds to a match of `P` in `T` starting at position `i − m − 1`.

```cpp
vector<int> search(const string &t, const string &p) {
    string s = p + "#" + t;
    vector<int> z = zFunction(s);
    vector<int> res;
    int m = p.size();
    for (int i = m + 1; i < (int)s.size(); i++)
        if (z[i] == m) res.push_back(i - m - 1);
    return res;
}
```

**Complexity:** O(n + m).

## Z vs Rabin-Karp

| | Rabin-Karp | Z-Algorithm |
| :--- | :--- | :--- |
| Worst-case time | O(nm) | **O(n + m)** |
| Expected time | O(n + m) | O(n + m) |
| Needs verification | Yes (hash collisions) | No |
| Extra concepts | Hashing, modular arithmetic | Prefix function |
| Handles multiple patterns | Yes (hash set of pattern hashes) | One pattern at a time |

## Classic Z-applications

- Substring search (above).
- Longest prefix-suffix (also solvable with KMP's failure function).
- Count distinct substrings.
- Period of a string.

## Common MCQ Traps

- `Z[0]` convention — know which one your source uses.
- Separator `#` must **not** appear in either string.
- Rabin-Karp without verification is technically wrong — collisions are rare but possible.
- Z-algorithm's inner `while` looks quadratic but is O(n) amortised.
