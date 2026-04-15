# Assignment: Connection Pool (Singleton)

**Pattern:** Singleton | **Difficulty:** Medium

---

## Problem Statement

Design a connection pool for a database module. The pool manages a fixed set of reusable `DatabaseConnection` objects. Only **one instance** of the pool should exist. Connections are handed out and returned — if none are available, the caller blocks.

---

## What You Need to Implement

| Class | Role |
|-------|------|
| `ConnectionPool` | Interface — provided |
| `ConnectionPoolImpl` | **You implement** — Singleton + pool management |

### Methods in `ConnectionPoolImpl`

```java
public static ConnectionPool getInstance(int maxConnections)  // Singleton getter
public static void resetInstance()                             // set instance to null
public void initializePool()                                   // fill pool with DummyConnections
public DatabaseConnection getConnection()                      // take one out (blocks if empty)
public void releaseConnection(DatabaseConnection connection)   // put it back
public int getAvailableConnectionsCount()                      // how many are free
public int getTotalConnectionsCount()                          // total in pool
```

---

## Solution

```java
public class ConnectionPoolImpl implements ConnectionPool {

    private static ConnectionPool instance = null;
    private final int maxConnections;
    private final BlockingQueue<DatabaseConnection> connectionQueue;

    private ConnectionPoolImpl(int maxConnections) {
        this.maxConnections = maxConnections;
        connectionQueue = new ArrayBlockingQueue<>(maxConnections);
        initializePool();
    }

    public static ConnectionPool getInstance(int maxConnections) {
        if (instance == null) {
            instance = new ConnectionPoolImpl(maxConnections);
        }
        return instance;
    }

    public static void resetInstance() {
        instance = null;
    }

    @Override
    public void initializePool() {
        for (int i = 0; i < maxConnections; i++) {
            connectionQueue.offer(new DatabaseConnection());
        }
    }

    @Override
    public DatabaseConnection getConnection() {
        try {
            return connectionQueue.take();   // blocks if queue is empty
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Error getting connection", e);
        }
    }

    @Override
    public void releaseConnection(DatabaseConnection connection) {
        if (connection != null) {
            connectionQueue.offer(connection);  // put back into pool
        }
    }

    @Override
    public int getAvailableConnectionsCount() {
        return connectionQueue.size();
    }

    @Override
    public int getTotalConnectionsCount() {
        return maxConnections;
    }
}
```

---

## Key Concepts

**`BlockingQueue` as the pool:**
`ArrayBlockingQueue` is a thread-safe bounded queue. `take()` blocks the thread until a connection is available — no busy-waiting needed.

**Why `offer()` in `releaseConnection`?**
`offer()` returns false instead of throwing if the queue is full — safe. `put()` would block. Using `offer()` is the right call here because the queue was sized to `maxConnections` and we only add back what was taken.

**Singleton without `volatile` here:**
This version uses simple lazy init (no double-checked locking). Acceptable for single-threaded tests. For production, add `volatile` + double-checked locking like the FileConfig assignment.

---

## Exam Tips

- **Viva:** "What happens when all connections are checked out?" → `getConnection()` blocks the calling thread via `BlockingQueue.take()`.
- **Viva:** "Why BlockingQueue over ArrayList?" → Thread safety, blocking `take()` built-in, no manual `synchronized` needed.
- **MCQ trap:** `getAvailableConnectionsCount()` returns `connectionQueue.size()` (currently free), NOT `maxConnections`.
- **Key difference from FileConfig Singleton:** `getInstance()` here takes a parameter (`maxConnections`) — only used on first call; subsequent calls return the existing instance ignoring the parameter.
