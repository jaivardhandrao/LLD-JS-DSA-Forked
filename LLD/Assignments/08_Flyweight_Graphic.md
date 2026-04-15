# Assignment: Graphic Flyweight Registry (Flyweight Pattern)

**Pattern:** Flyweight | **Difficulty:** Medium

---

## Problem Statement

A graphical editor renders many text and image elements. Most of them share the same visual state (same font, color, dimensions). Storing all that state per object wastes memory. The **Flyweight pattern** separates shared (**intrinsic**) state from per-instance (**extrinsic**) state, and reuses the shared objects.

---

## Core Concept: Intrinsic vs Extrinsic

| State | What it means | Example in this problem |
|-------|--------------|------------------------|
| **Intrinsic** | Shared, context-independent | `image`, `width`, `height`, `color`, `type` |
| **Extrinsic** | Unique per object, context-dependent | `x`, `y` coordinates |

The original `Graphic` class stores everything together. After refactoring:
- `GraphicIntrinsicState` → shared, stored in the flyweight registry once
- `GraphicExtrinsicState` → per-placement, stored by the client

---

## Solution

### GraphicIntrinsicState.java

```java
@IntrinsicState
public class GraphicIntrinsicState {
    private Image image;
    private int width;
    private int height;
    private String color;
    private GraphicType type;

    public GraphicType getType() { return type; }
    // getters for other fields...
}
```

### GraphicExtrinsicState.java

```java
@ExtrinsicState
public class GraphicExtrinsicState {
    private int x;
    private int y;
    private GraphicIntrinsicState intrinsicState;  // reference to shared flyweight
}
```

### FlyweightRegistryImpl.java

```java
public class FlyweightRegistryImpl implements FlyweightRegistry {

    private Map<GraphicType, GraphicIntrinsicState> registry = new HashMap<>();

    @Override
    public void addFlyweight(GraphicIntrinsicState flyweight) {
        registry.put(flyweight.getType(), flyweight);
    }

    @Override
    public GraphicIntrinsicState getFlyweight(GraphicType graphicType) {
        return registry.get(graphicType);
    }
}
```

---

## Memory Savings Illustrated

Without Flyweight — 1000 text elements, each storing image + dimensions + color + x + y:
```
1000 × (full Graphic object) = 1000 copies of image data
```

With Flyweight — 1000 text elements sharing ONE intrinsic state:
```
1 GraphicIntrinsicState (image + dimensions + color)
1000 GraphicExtrinsicState (just x, y + reference to the shared state)
```

---

## Annotations

| Annotation | Applied to | Purpose |
|---|---|---|
| `@IntrinsicState` | `GraphicIntrinsicState` | Marks the shared flyweight class |
| `@ExtrinsicState` | `GraphicExtrinsicState` | Marks the per-instance context class |

The test uses reflection to check for these annotations — they're required.

---

## Exam Tips

- **Viva:** "What is intrinsic state?" → State that does NOT change between usages of the flyweight — safe to share.
- **Viva:** "What is extrinsic state?" → State that changes per usage (like position) — passed in by the client, never stored in the flyweight.
- **MCQ trap:** The flyweight object itself should be **immutable** (intrinsic state never changes). If the flyweight is mutable, sharing it is unsafe.
- **Key implementation detail:** The registry key is `GraphicType` (enum) — makes lookup O(1) via HashMap.
- **Real-world uses:** Java's `String` pool, `Integer.valueOf()` cache (-128 to 127), font rendering in editors.
