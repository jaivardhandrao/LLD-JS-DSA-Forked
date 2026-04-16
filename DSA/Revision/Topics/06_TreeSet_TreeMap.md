# TreeSet & TreeMap (and their C++ equivalents)

> Ordered associative containers backed by a self-balancing BST (Red-Black tree).
> All ops: **O(log n)**.

## Java

```java
TreeSet<Integer> ts = new TreeSet<>();
ts.add(10); ts.add(5); ts.add(20);

ts.first();           // 5     smallest
ts.last();            // 20    largest
ts.floor(15);         // 10    largest ≤ 15
ts.ceiling(15);       // 20    smallest ≥ 15
ts.lower(10);         // 5     strictly less
ts.higher(10);        // 20    strictly greater

TreeMap<Integer, String> tm = new TreeMap<>();
tm.put(1, "a"); tm.put(3, "c");
tm.firstKey();        // 1
tm.floorKey(2);       // 1
tm.headMap(3);        // {1=a}        keys < 3
tm.tailMap(3);        // {3=c}        keys >= 3
tm.subMap(1, 3);      // [1, 3)
```

## C++ equivalents

| Java | C++ |
| :--- | :--- |
| `TreeSet` | `std::set` (or `multiset`) |
| `TreeMap` | `std::map` |
| `floor(x)` | `prev(s.upper_bound(x))` if not begin |
| `ceiling(x)` | `s.lower_bound(x)` |
| `lower(x)` | `prev(s.lower_bound(x))` if not begin |
| `higher(x)` | `s.upper_bound(x)` |
| `first()` | `*s.begin()` |
| `last()` | `*s.rbegin()` |

```cpp
set<int> s = {5, 10, 20};

auto it = s.lower_bound(15);   // iterator to 20 (>= 15)
auto it = s.upper_bound(10);   // iterator to 20 (> 10)

// floor(15) in C++:
auto it = s.upper_bound(15);
if (it != s.begin()) { --it; /* *it == 10 */ }
```

## When to Use

- **Sliding window with max/min** under modifications (insert + delete) → `multiset`.
- **Count of elements `< x`** → `multiset` + order statistics (or policy tree).
- **Range queries by key** (headMap, tailMap) without segment tree.
- **Event scheduling** — pop smallest / largest, add new in log time.

## Complexity

| Op | set / TreeSet |
| :--- | :---: |
| insert / erase | O(log n) |
| find / contains | O(log n) |
| lower/upper bound | O(log n) |
| begin / rbegin | O(1) |
| size | O(1) |

## Gotchas

- `set` rejects duplicates → use `multiset` when dupes matter.
- Erasing **by value** from `multiset` removes *all* occurrences — use `s.erase(s.find(x))` to remove one.
- `map::operator[]` **inserts** on miss — use `find` if you only want to check.
- Iterating `set` is ordered; iterating `unordered_set` is not.
