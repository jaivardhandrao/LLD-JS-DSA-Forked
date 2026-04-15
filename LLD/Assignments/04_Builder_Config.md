# Assignment: Database Configuration Builder (Builder Pattern)

**Pattern:** Builder | **Difficulty:** Medium

---

## Problem Statement

Create a system-wide database configuration with fields like URL, credentials, max connections, cache, and read-only flag. Use the **Builder pattern** so clients can set only the fields they care about, in any order, and get an immutable configuration object back.

---

## Architecture

```
@WithBuilder
class DatabaseConfigurationBuilder   ← outer class, mirrors DatabaseConfiguration fields
    └── static class Builder          ← inner builder with fluent setters
            └── build()               ← returns DatabaseConfigurationBuilder
```

| Class | Role |
|-------|------|
| `DatabaseConfiguration` | Product — provided, do not modify |
| `DatabaseConfigurationBuilder` | Outer `@WithBuilder` class, holds the fields |
| `DatabaseConfigurationBuilder.Builder` | Static inner builder with fluent setters |

---

## Solution

```java
// DatabaseConfigurationBuilder.java
@WithBuilder
public class DatabaseConfigurationBuilder {

    private String databaseUrl;
    private String username;
    private String password;
    private int maxConnections;
    private boolean enableCache;
    private boolean isReadOnly;

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private DatabaseConfigurationBuilder cfg;

        public Builder() {
            cfg = new DatabaseConfigurationBuilder();
        }

        public Builder withDatabaseUrl(String databaseUrl) {
            cfg.databaseUrl = databaseUrl;
            return this;
        }

        public Builder withCredentials(String username, String password) {
            cfg.username = username;
            cfg.password = password;
            return this;
        }

        public Builder withMaxConnections(int maxConnections) {
            cfg.maxConnections = maxConnections;
            return this;
        }

        public Builder withEnableCache(boolean enableCache) {
            cfg.enableCache = enableCache;
            return this;
        }

        public Builder withReadOnly(boolean isReadOnly) {
            cfg.isReadOnly = isReadOnly;
            return this;
        }

        public DatabaseConfigurationBuilder build() {
            DatabaseConfigurationBuilder result = new DatabaseConfigurationBuilder();
            result.databaseUrl     = cfg.databaseUrl;
            result.username        = cfg.username;
            result.password        = cfg.password;
            result.maxConnections  = cfg.maxConnections;
            result.enableCache     = cfg.enableCache;
            result.isReadOnly      = cfg.isReadOnly;
            return result;
        }
    }
}
```

---

## Difference from Message Builder

| | Message Builder | Config Builder |
|---|---|---|
| Setter names | `sender()`, `content()` | `withDatabaseUrl()`, `withCredentials()` |
| Multi-param setter | No | Yes — `withCredentials(username, password)` |
| Product class | `Message` | `DatabaseConfiguration` |
| Outer class name | `MessageBuilder` | `DatabaseConfigurationBuilder` |

Both follow the **same structural pattern**: `@WithBuilder` outer + `static Builder` inner + `build()` returns outer.

---

## Exam Tips

- **Viva:** "What problem does Builder solve over constructors?" → Avoids telescoping constructors; optional parameters; readable; order-independent.
- **MCQ trap:** `withCredentials(username, password)` sets TWO fields in one setter — perfectly valid Builder pattern.
- **Viva:** "Is the built object immutable?" → Not in this implementation (fields are `private` but no `final`). True immutability requires `final` fields and no setters.
