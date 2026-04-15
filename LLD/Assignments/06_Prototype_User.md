# Assignment: User Prototype Registry (Prototype Pattern)

**Pattern:** Prototype | **Difficulty:** Medium

---

## Problem Statement

A testing framework needs many mock `User` objects with different attributes. Creating each from scratch is expensive and repetitive. The **Prototype pattern** lets you register template users, then clone them on demand — preserving all field values without repeating setup.

---

## Class Structure

| Class | Role |
|-------|------|
| `ClonableObject` | Interface with `cloneObject()` — provided |
| `UserType` | Enum — provided |
| `User` | Implements `ClonableObject`, the prototype — **you implement** |
| `UserPrototypeRegistry` | Interface — provided |
| `UserPrototypeRegistryImpl` | **You implement** — stores and clones prototypes |

---

## Solution

### UserPrototypeRegistryImpl.java

```java
public class UserPrototypeRegistryImpl implements UserPrototypeRegistry {

    private Map<UserType, User> users = new HashMap<>();

    @Override
    public void addPrototype(User user) {
        users.put(user.getType(), user);
    }

    @Override
    public User getPrototype(UserType type) {
        return users.get(type);     // returns the original (not a clone)
    }

    @Override
    public User clone(UserType type) {
        return users.get(type).cloneObject();   // returns a CLONE
    }
}
```

### User.java (cloneObject must do a deep copy)

```java
public class User implements ClonableObject {

    private String name;
    private String email;
    private UserType type;
    // ... other fields

    @Override
    public User cloneObject() {
        User clone = new User();
        clone.name  = this.name;
        clone.email = this.email;
        clone.type  = this.type;
        // copy all fields
        return clone;
    }

    public UserType getType() { return type; }
}
```

---

## How It Works

```java
UserPrototypeRegistry registry = new UserPrototypeRegistryImpl();

// Set up one prototype per type
User adminTemplate = new User("Admin", "admin@test.com", UserType.ADMIN);
registry.addPrototype(adminTemplate);

// Clone whenever you need a new one
User u1 = registry.clone(UserType.ADMIN);  // independent copy
User u2 = registry.clone(UserType.ADMIN);  // another independent copy
u1.setName("Alice");                        // doesn't affect u2 or the prototype
```

---

## getPrototype vs clone

| Method | Returns |
|--------|---------|
| `getPrototype(type)` | The original stored user — modifications affect the template |
| `clone(type)` | A new independent copy — safe to modify |

---

## Exam Tips

- **Viva:** "When do you use Prototype over `new`?" → When object creation is expensive (DB lookup, complex init) or when you need many similar objects with slight variations.
- **Viva:** "What's the difference between shallow and deep copy?" → Shallow: primitives copied, objects share reference. Deep: all fields recursively copied, fully independent.
- **MCQ trap:** `getPrototype()` returning the original is intentional — it lets the caller inspect the template. `clone()` is what you use to get a working copy.
- **Key:** `cloneObject()` must copy ALL fields — forgetting one means the clone shares state with the prototype.
