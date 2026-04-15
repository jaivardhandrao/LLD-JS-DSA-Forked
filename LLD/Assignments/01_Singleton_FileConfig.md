# Assignment: File-Based Configuration Manager (Singleton)

**Pattern:** Singleton | **Difficulty:** Medium

---

## Problem Statement

Design a system-wide configuration manager that reads settings from a file. Only **one instance** should ever exist — multiple instances would lead to inconsistency and resource conflicts. Implement Singleton with **double-checked locking** for thread safety.

---

## What You Need to Implement

| Class | Role |
|-------|------|
| `FileBasedConfigurationManager` | Abstract base — provided |
| `FileBasedConfigurationManagerImpl` | **You implement** — the Singleton |

### Methods to implement in `FileBasedConfigurationManagerImpl`

```java
public static FileBasedConfigurationManager getInstance()  // double-checked locking
public static void resetInstance()                         // set instance to null
public String getConfiguration(String key)
public <T> T getConfiguration(String key, Class<T> type)
public void setConfiguration(String key, String value)
public <T> void setConfiguration(String key, T value)
public void removeConfiguration(String key)
public void clear()
```

---

## Solution

```java
public class FileBasedConfigurationManagerImpl extends FileBasedConfigurationManager {

    // volatile prevents CPU instruction reordering
    private static volatile FileBasedConfigurationManagerImpl instance = null;

    private FileBasedConfigurationManagerImpl() {
        super();
    }

    public static FileBasedConfigurationManager getInstance() {
        if (instance == null) {                                      // 1st check (no lock)
            synchronized (FileBasedConfigurationManagerImpl.class) {
                if (instance == null) {                              // 2nd check (with lock)
                    instance = new FileBasedConfigurationManagerImpl();
                }
            }
        }
        return instance;
    }

    public static void resetInstance() {
        instance = null;
    }

    @Override
    public String getConfiguration(String key) {
        return getProperties().getProperty(key);
    }

    @Override
    public <T> T getConfiguration(String key, Class<T> type) {
        String value = getConfiguration(key);
        return Optional.ofNullable(value).map(v -> convert(value, type)).orElse(null);
    }

    @Override
    public void setConfiguration(String key, String value) {
        getProperties().setProperty(key, value);
    }

    @Override
    public <T> void setConfiguration(String key, T value) {
        setConfiguration(key, value.toString());
    }

    @Override
    public void removeConfiguration(String key) {
        getProperties().remove(key);
    }

    @Override
    public void clear() {
        getProperties().clear();
    }
}
```

---

## Key Concepts

**Why `volatile`?**
Without `volatile`, one thread could see a partially-constructed object due to CPU instruction reordering. `volatile` guarantees the write to `instance` is fully visible before any other thread reads it.

**Why two null checks?**
- First check (no lock): avoids acquiring the lock every call once instance exists — performance.
- Second check (inside lock): handles the race where two threads both pass the first check simultaneously.

**Why private constructor?**
Prevents `new FileBasedConfigurationManagerImpl()` from outside — enforces single instance.

---

## Exam Tips

- **Viva:** "Why is `volatile` needed?" → prevents instruction reordering across threads; without it, a thread could see a non-null but incompletely initialized instance.
- **MCQ trap:** Lazy initialization without `synchronized` is NOT thread-safe. Only double-checked locking with `volatile` is correct.
- **Pattern:** `getInstance()` is `static` and returns the abstract base type `FileBasedConfigurationManager`, not the impl — this hides the concrete class.
