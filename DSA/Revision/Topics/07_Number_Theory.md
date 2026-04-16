# Number Theory — Modular Arithmetic, Primes, GCD

## Modular Arithmetic — Rules

Let `M = 1e9 + 7` (common prime modulus).

```
(a + b) % M = ((a % M) + (b % M)) % M
(a - b) % M = ((a % M) - (b % M) + M) % M    ← add M to avoid negatives
(a * b) % M = ((a % M) * (b % M)) % M
(a / b) % M = a * modInverse(b) % M          ← NOT (a % M) / (b % M)
```

Division modulo a prime uses **modular inverse** (Fermat's little theorem):

```
b⁻¹ ≡ b^(M-2)   (mod M)    when M is prime and gcd(b, M) = 1
```

## Fast Exponentiation (Binary Exponentiation)

```cpp
long long power(long long a, long long b, long long m) {
    long long res = 1 % m;
    a %= m;
    while (b > 0) {
        if (b & 1) res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
// Modular inverse under prime m:
long long inv(long long a, long long m) { return power(a, m - 2, m); }
```

**O(log b)** time.

## GCD — Euclidean Algorithm

```cpp
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
int lcm(int a, int b) { return a / gcd(a, b) * b; }       // divide first to avoid overflow
```

## Extended Euclidean — finds `x, y` with `a·x + b·y = gcd(a, b)`

```cpp
int extgcd(int a, int b, int &x, int &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    int x1, y1;
    int g = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
```

Used for modular inverse when the modulus isn't prime: `a·x ≡ 1 (mod m)`.

## Prime Checking — Sieve of Eratosthenes

```cpp
vector<bool> isPrime(N + 1, true);
isPrime[0] = isPrime[1] = false;
for (int i = 2; (long long)i * i <= N; i++)
    if (isPrime[i])
        for (int j = i * i; j <= N; j += i) isPrime[j] = false;
```

**O(N log log N)**.

## Linear Sieve — also produces smallest prime factor (SPF)

```cpp
vector<int> spf(N + 1, 0);
vector<int> primes;
for (int i = 2; i <= N; i++) {
    if (!spf[i]) { spf[i] = i; primes.push_back(i); }
    for (int p : primes) {
        if ((long long)p * i > N || p > spf[i]) break;
        spf[p * i] = p;
    }
}
```

Then factorise any `x ≤ N` in `O(log x)` by repeatedly dividing by `spf[x]`.

## Single-number Primality Test — O(√n)

```cpp
bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
```

## Counting Divisors / Sum of Divisors

For `n = p1^a1 · p2^a2 · … · pk^ak`:
- Number of divisors: `(a1 + 1)(a2 + 1)…(ak + 1)`.
- Sum of divisors: `∏ (p^(a+1) − 1) / (p − 1)`.

## Common Identities

- `gcd(a, b) · lcm(a, b) = a · b`.
- `gcd(a, 0) = a`, `gcd(0, 0) = 0` (by convention).
- `(a + b) mod m` wraps: be careful with subtraction and signed types.
- Fermat's little: `a^(p-1) ≡ 1 (mod p)` when `gcd(a, p) = 1` and `p` is prime.

## Common MCQ Traps

- **Modular division is NOT plain division** — requires inverse.
- `(-5) % 3` in C++ is `-2`, not `1` → always add `M` before taking mod on subtraction.
- Overflow on `a * b` even when both < M ≈ 1e9 — cast to `long long` first.
- Sieve inner loop starts at `i*i`, not `2*i`, for efficiency.
