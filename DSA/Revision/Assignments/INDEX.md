# DSA Assignment Revision — Index

Collected problems solved in class / assignments, with question, solution, and explanation. Searchable by topic and problem name.

## Solved

| # | Title | Topic | Pattern |
| :---: | :--- | :--- | :--- |
| 1 | [Matrix Chain Multiplication](01_Matrix_Chain_Multiplication.md) | Dynamic Programming | Interval / Partition DP |
| 2 | [Unique Binary Search Trees II](02_Unique_BSTs_II.md) | Dynamic Programming | Catalan / pick-a-root |
| 3 | [Range Minimum Query](03_Range_Minimum_Query.md) | Segment Trees | Point Update + Range Min (struct-node template) |
| 4 | [Bob and Queries](04_Bob_and_Queries.md) | Segment Trees | Multi-field node · popcount · fetch-then-update |
| 5 | [A, B and Modulo](05_A_B_and_Modulo.md) | Number Theory | `A ≡ B (mod M)` ⇔ `M \| (A − B)` — O(1) |
| 6 | [Pubg](06_Pubg.md) | Number Theory | Repeated subtraction → GCD of array |

## How to Use This Section

1. Open the problem you want to revise.
2. The file has four parts:
   - **Problem statement** — exact wording from the assignment.
   - **Intuition** — the recurrence / approach in plain language.
   - **Solution** — the accepted code, annotated.
   - **Dry run + complexity + related problems.**
3. Search the sidebar by problem name keyword (`Ctrl / Cmd + K`).

## Raw assignment screenshots

The `DSA/Batch_B_Classwise_Assignment/` folder holds class-wise screenshots of the assignments as handed out (images, not markdown). This index captures the questions that have been transcribed and solved.

## Adding New Problems

When adding a new solved assignment, create `NN_Problem_Title.md` following the same template:

```markdown
# QX. <Problem Name>
> Source, topic, pattern
## Problem Statement
## Intuition
## Solution (language)
## Complexity
## Dry Run
## Common Mistakes
## Related Problems
```

Then add a row to the table above.
