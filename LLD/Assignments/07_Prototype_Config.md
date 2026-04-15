# Assignment: Configuration Prototype Registry (Prototype Pattern)

**Pattern:** Prototype | **Difficulty:** Medium

---

## Problem Statement

A configuration management system lets users define different named configurations (e.g., `DEV`, `PROD`, `TEST`). Creating configurations manually for every test run is tedious. The **Prototype pattern** stores template configurations in a registry and clones them on demand.

---

## Class Structure

| Class | Role |
|-------|------|
| `ClonableObject` | Interface with `cloneObject()` — provided |
| `ConfigurationType` | Enum: `DEV`, `PROD`, `TEST`, etc. — provided |
| `Configuration` | Implements `ClonableObject` — **you implement** |
| `ConfigurationPrototypeRegistry` | Interface — provided |
| `ConfigurationPrototypeRegistryImpl` | **You implement** — the registry |

---

## Solution

### ConfigurationPrototypeRegistryImpl.java

```java
public class ConfigurationPrototypeRegistryImpl implements ConfigurationPrototypeRegistry {

    private Map<ConfigurationType, Configuration> configurations = new HashMap<>();

    @Override
    public void addPrototype(Configuration configuration) {
        configurations.put(configuration.getType(), configuration);
    }

    @Override
    public Configuration getPrototype(ConfigurationType type) {
        return configurations.get(type);          // original, not cloned
    }

    @Override
    public Configuration clone(ConfigurationType type) {
        return configurations.get(type).cloneObject();   // new independent copy
    }
}
```

### Configuration.java (your clone logic)

```java
public class Configuration implements ClonableObject {

    private String dbUrl;
    private String apiKey;
    private ConfigurationType type;
    // ... other fields

    @Override
    public Configuration cloneObject() {
        Configuration clone = new Configuration();
        clone.dbUrl  = this.dbUrl;
        clone.apiKey = this.apiKey;
        clone.type   = this.type;
        return clone;
    }

    public ConfigurationType getType() { return type; }
}
```

---

## Identical Structure to User Prototype

This assignment is structurally identical to **Prototype_User** — same pattern, different domain:

| | User Prototype | Config Prototype |
|---|---|---|
| Registry key | `UserType` | `ConfigurationType` |
| Stored object | `User` | `Configuration` |
| Registry impl | `UserPrototypeRegistryImpl` | `ConfigurationPrototypeRegistryImpl` |
| Clone interface | `ClonableObject` | `ClonableObject` (same) |

The implementation pattern is **exactly the same**. Master one, you know both.

---

## Exam Tips

- **Viva:** "Why use a registry?" → Centralizes prototype management — you don't scatter template creation across your codebase.
- **Viva:** "Can you clone a type that hasn't been registered?" → `configurations.get(type)` returns null → `NullPointerException` on `cloneObject()`. In production, add a null check and throw a meaningful exception.
- **MCQ trap:** The Prototype pattern uses `clone()` — NOT a constructor. The whole point is to copy an existing object, not create from scratch.
