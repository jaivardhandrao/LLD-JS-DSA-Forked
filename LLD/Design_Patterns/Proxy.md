# Proxy Design Pattern

**Category:** Structural
**Intent:** Provide a surrogate or placeholder for another object to control access to it -- without changing the interface the client uses.
**Use cases:** Lazy initialization (virtual proxy), access control (protection proxy), logging/caching (smart proxy), remote method invocation (remote proxy), rate limiting.

---

## The Problem: Uncontrolled Access to Expensive or Sensitive Objects

### Scenario

You have a `HeavyImage` class that loads a multi-megabyte file from disk the moment it is created. Your image gallery creates 200 thumbnails at startup -- even though the user will only ever scroll to see 10-15 of them. Startup takes 45 seconds.

Or: You have a `DatabaseService` that executes queries. Any module can call it -- there is no access control, no logging, no caching. A junior dev accidentally runs `DROP TABLE` in production.

### BAD Option 1: Load Everything Eagerly

```java
// BAD: Every image loads from disk on construction
class ImageGallery {
    private List<HeavyImage> images = new ArrayList<>();

    public ImageGallery(List<String> filenames) {
        for (String f : filenames) {
            images.add(new HeavyImage(f)); // 200 disk reads at startup!
        }
    }

    public void display(int index) {
        images.get(index).render();
    }
}
```

**Problems:**
- **Wasted resources:** 200 images loaded, only 10-15 ever viewed
- **Slow startup:** User waits 45 seconds staring at a blank screen
- **No control:** Cannot defer, gate, or instrument the loading

### BAD Option 2: Scatter Access Control Logic Everywhere

```java
// BAD: Every method that touches the database checks permissions inline
class ReportService {
    private DatabaseService db;

    public String generateReport(User user) {
        // Permission check duplicated in EVERY service that uses db
        if (!user.hasRole("ANALYST") && !user.hasRole("ADMIN")) {
            throw new SecurityException("Access denied");
        }
        // Logging duplicated everywhere
        System.out.println("[LOG] " + user.getName() + " queried reports");
        return db.query("SELECT * FROM reports");
    }
}

class AdminService {
    private DatabaseService db;

    public void deleteUser(User user, int userId) {
        // Same permission check, copy-pasted
        if (!user.hasRole("ADMIN")) {
            throw new SecurityException("Access denied");
        }
        System.out.println("[LOG] " + user.getName() + " deleted user " + userId);
        db.query("DELETE FROM users WHERE id = " + userId);
    }
}
```

**Problems:**
- **SRP violation:** Business logic mixed with security and logging
- **DRY violation:** Permission checks and logging duplicated across every service
- **OCP violation:** Changing the security policy means editing every service class
- **Error-prone:** Forget one check and you have a security hole

---

## The Solution: Proxy Pattern

### The Idea

A proxy is a **stand-in** that sits between the client and the real object. It implements the **same interface** as the real subject, so the client cannot tell the difference. The proxy **controls access** -- it decides when/whether to forward the call to the real object.

Think of a receptionist: same building entrance, but the receptionist decides who gets in, logs visitors, and may delay your entry until the person you want to see is available.

### How It Works

1. Define a **Subject interface** (e.g., `Image`, `DatabaseService`)
2. The **RealSubject** implements the interface with the actual logic
3. The **Proxy** implements the same interface, holds a reference to (or creates) the real subject, and adds control logic (lazy init, security, logging, caching)

### The Structure

```
Subject (interface)
    |
    +-- RealSubject (e.g., RealImage, RealDatabaseService)
    |
    +-- Proxy (e.g., ProxyImage, SecureDatabaseProxy)
            holds-a --> RealSubject (created lazily or injected)
```

---

## Types of Proxy

### 1. Virtual Proxy (Lazy Loading)

**Problem:** Creating the real object is expensive (disk I/O, network call, heavy computation). Don't create it until actually needed.

```java
// Subject interface
interface Image {
    void display();
}

// Real subject -- expensive to create
class RealImage implements Image {
    private final String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk(); // EXPENSIVE
    }

    private void loadFromDisk() {
        System.out.println("[RealImage] Loading " + filename + " from disk...");
        // Simulate heavy I/O
    }

    @Override
    public void display() {
        System.out.println("[RealImage] Displaying " + filename);
    }
}

// Virtual Proxy -- defers creation until first use
class ProxyImage implements Image {
    private final String filename;
    private RealImage realImage; // null until first display()

    public ProxyImage(String filename) {
        this.filename = filename;
        // NO disk load here -- that's the whole point
    }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename); // load on first use
        }
        realImage.display();
    }
}

// Client code -- unchanged
public class Gallery {
    public static void main(String[] args) {
        Image img1 = new ProxyImage("photo1.jpg");
        Image img2 = new ProxyImage("photo2.jpg");
        Image img3 = new ProxyImage("photo3.jpg");
        // Nothing loaded yet!

        System.out.println("--- User clicks image 1 ---");
        img1.display(); // NOW photo1.jpg loads
        img1.display(); // Already loaded, no reload

        System.out.println("--- User clicks image 3 ---");
        img3.display(); // NOW photo3.jpg loads
        // photo2.jpg is NEVER loaded -- user never clicked it
    }
}
```

**Output:**
```
--- User clicks image 1 ---
[RealImage] Loading photo1.jpg from disk...
[RealImage] Displaying photo1.jpg
[RealImage] Displaying photo1.jpg
--- User clicks image 3 ---
[RealImage] Loading photo3.jpg from disk...
[RealImage] Displaying photo3.jpg
```

**Key point:** `photo2.jpg` never loads. In a gallery of 200, only the viewed images consume memory.

---

### 2. Protection Proxy (Access Control)

**Problem:** Only certain users should be allowed to perform certain operations. Instead of scattering permission checks everywhere, centralize them in the proxy.

```java
// Subject interface
interface Document {
    String read(String user);
    void write(String user, String content);
    void delete(String user);
}

// Real subject
class AdminDocument implements Document {
    private String content = "Confidential Data";
    private final String name;

    public AdminDocument(String name) { this.name = name; }

    @Override
    public String read(String user) {
        return "[" + name + "] Content: " + content;
    }

    @Override
    public void write(String user, String content) {
        this.content = content;
        System.out.println("[" + name + "] Written by " + user);
    }

    @Override
    public void delete(String user) {
        this.content = null;
        System.out.println("[" + name + "] Deleted by " + user);
    }
}

// Protection Proxy -- checks roles before forwarding
class ProtectedDocumentProxy implements Document {
    private final Document realDocument;
    private final Map<String, String> userRoles; // user -> role

    public ProtectedDocumentProxy(Document realDocument, Map<String, String> userRoles) {
        this.realDocument = realDocument;
        this.userRoles = userRoles;
    }

    private String getRole(String user) {
        return userRoles.getOrDefault(user, "GUEST");
    }

    @Override
    public String read(String user) {
        String role = getRole(user);
        if (role.equals("GUEST")) {
            throw new SecurityException("Access denied: " + user + " cannot read");
        }
        return realDocument.read(user);
    }

    @Override
    public void write(String user, String content) {
        String role = getRole(user);
        if (!role.equals("ADMIN") && !role.equals("EDITOR")) {
            throw new SecurityException("Access denied: " + user + " cannot write");
        }
        realDocument.write(user, content);
    }

    @Override
    public void delete(String user) {
        String role = getRole(user);
        if (!role.equals("ADMIN")) {
            throw new SecurityException("Access denied: only ADMIN can delete");
        }
        realDocument.delete(user);
    }
}
```

**Key point:** Business logic in `AdminDocument` is clean -- no security code. The proxy handles all access control. Change the policy in one place.

---

### 3. Logging/Caching Proxy (Smart Proxy)

**Problem:** You want to log every database query and cache repeated queries, but the `DatabaseService` should remain focused on executing queries.

```java
// Subject interface
interface DatabaseService {
    String query(String sql);
}

// Real subject
class RealDatabaseService implements DatabaseService {
    @Override
    public String query(String sql) {
        System.out.println("[DB] Executing: " + sql);
        // Simulate query execution
        return "Result of [" + sql + "]";
    }
}

// Logging + Caching Proxy
class SmartDatabaseProxy implements DatabaseService {
    private final DatabaseService realService;
    private final Map<String, String> cache = new HashMap<>();

    public SmartDatabaseProxy(DatabaseService realService) {
        this.realService = realService;
    }

    @Override
    public String query(String sql) {
        // LOGGING
        System.out.println("[PROXY LOG] Query received: " + sql
            + " at " + java.time.LocalDateTime.now());

        // CACHING -- only for SELECT queries
        if (sql.trim().toUpperCase().startsWith("SELECT")) {
            if (cache.containsKey(sql)) {
                System.out.println("[PROXY CACHE] Cache hit for: " + sql);
                return cache.get(sql);
            }
            String result = realService.query(sql);
            cache.put(sql, result);
            System.out.println("[PROXY CACHE] Cached result for: " + sql);
            return result;
        }

        // Non-SELECT queries: clear cache (data may have changed) and forward
        cache.clear();
        return realService.query(sql);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        DatabaseService db = new SmartDatabaseProxy(new RealDatabaseService());

        db.query("SELECT * FROM users");       // DB hit, cached
        db.query("SELECT * FROM users");       // Cache hit, no DB call
        db.query("INSERT INTO users ...");     // DB hit, cache cleared
        db.query("SELECT * FROM users");       // DB hit again (cache was cleared)
    }
}
```

---

## Detailed Example 1: Image Viewer with Virtual Proxy (Full Runnable)

```java
import java.util.ArrayList;
import java.util.List;

// ---- Subject Interface ----
interface Image {
    void display();
    String getFilename();
}

// ---- Real Subject ----
class RealImage implements Image {
    private final String filename;
    private byte[] imageData;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("  [RealImage] Loading '" + filename + "' from disk (2 seconds)...");
        try { Thread.sleep(100); } catch (InterruptedException e) { } // simulate delay
        imageData = new byte[1024]; // simulate loaded data
        System.out.println("  [RealImage] '" + filename + "' loaded. Size: " + imageData.length + " bytes");
    }

    @Override
    public void display() {
        System.out.println("  [RealImage] Rendering '" + filename + "' on screen");
    }

    @Override
    public String getFilename() { return filename; }
}

// ---- Virtual Proxy ----
class ProxyImage implements Image {
    private final String filename;
    private RealImage realImage; // created lazily

    public ProxyImage(String filename) {
        this.filename = filename;
    }

    @Override
    public void display() {
        if (realImage == null) {
            System.out.println("  [Proxy] First access -- creating RealImage for '" + filename + "'");
            realImage = new RealImage(filename);
        } else {
            System.out.println("  [Proxy] Already loaded -- reusing RealImage for '" + filename + "'");
        }
        realImage.display();
    }

    @Override
    public String getFilename() { return filename; }
}

// ---- Image Gallery (Client) ----
public class ImageGallery {
    private final List<Image> images = new ArrayList<>();

    public void addImage(Image img) {
        images.add(img);
    }

    public void showImage(int index) {
        if (index < 0 || index >= images.size()) {
            System.out.println("Invalid index: " + index);
            return;
        }
        System.out.println("--- Showing image " + index + ": " + images.get(index).getFilename() + " ---");
        images.get(index).display();
    }

    public static void main(String[] args) {
        ImageGallery gallery = new ImageGallery();

        // Add 5 images -- NONE are loaded from disk yet
        gallery.addImage(new ProxyImage("vacation/beach.jpg"));
        gallery.addImage(new ProxyImage("vacation/mountain.jpg"));
        gallery.addImage(new ProxyImage("vacation/sunset.jpg"));
        gallery.addImage(new ProxyImage("vacation/forest.jpg"));
        gallery.addImage(new ProxyImage("vacation/lake.jpg"));

        System.out.println("Gallery created with 5 images. Nothing loaded yet.\n");

        // User clicks image 0
        gallery.showImage(0); // Loads beach.jpg
        System.out.println();

        // User clicks image 0 again
        gallery.showImage(0); // Already loaded -- no disk read
        System.out.println();

        // User clicks image 3
        gallery.showImage(3); // Loads forest.jpg
        System.out.println();

        // Images 1, 2, 4 are NEVER loaded
        System.out.println("Images 1, 2, 4 were never loaded -- resources saved!");
    }
}
```

**Output:**
```
Gallery created with 5 images. Nothing loaded yet.

--- Showing image 0: vacation/beach.jpg ---
  [Proxy] First access -- creating RealImage for 'vacation/beach.jpg'
  [RealImage] Loading 'vacation/beach.jpg' from disk (2 seconds)...
  [RealImage] 'vacation/beach.jpg' loaded. Size: 1024 bytes
  [RealImage] Rendering 'vacation/beach.jpg' on screen

--- Showing image 0: vacation/beach.jpg ---
  [Proxy] Already loaded -- reusing RealImage for 'vacation/beach.jpg'
  [RealImage] Rendering 'vacation/beach.jpg' on screen

--- Showing image 3: vacation/forest.jpg ---
  [Proxy] First access -- creating RealImage for 'vacation/forest.jpg'
  [RealImage] Loading 'vacation/forest.jpg' from disk (2 seconds)...
  [RealImage] 'vacation/forest.jpg' loaded. Size: 1024 bytes
  [RealImage] Rendering 'vacation/forest.jpg' on screen

Images 1, 2, 4 were never loaded -- resources saved!
```

---

## Detailed Example 2: Access Control Proxy for a File System (Full Runnable)

```java
import java.util.*;

// ---- Subject Interface ----
interface FileSystem {
    String readFile(String path);
    void writeFile(String path, String content);
    void deleteFile(String path);
    List<String> listFiles(String directory);
}

// ---- Real Subject ----
class RealFileSystem implements FileSystem {
    private final Map<String, String> files = new HashMap<>();

    public RealFileSystem() {
        // Pre-populate some files
        files.put("/public/readme.txt", "Welcome to the system");
        files.put("/private/config.yaml", "db_password: secret123");
        files.put("/private/users.csv", "admin,editor,viewer");
        files.put("/logs/app.log", "2025-01-01 Server started");
    }

    @Override
    public String readFile(String path) {
        if (!files.containsKey(path)) throw new RuntimeException("File not found: " + path);
        System.out.println("  [RealFS] Reading " + path);
        return files.get(path);
    }

    @Override
    public void writeFile(String path, String content) {
        files.put(path, content);
        System.out.println("  [RealFS] Written to " + path);
    }

    @Override
    public void deleteFile(String path) {
        files.remove(path);
        System.out.println("  [RealFS] Deleted " + path);
    }

    @Override
    public List<String> listFiles(String directory) {
        List<String> result = new ArrayList<>();
        for (String key : files.keySet()) {
            if (key.startsWith(directory)) result.add(key);
        }
        System.out.println("  [RealFS] Listed " + directory);
        return result;
    }
}

// ---- User class ----
class User {
    private final String name;
    private final String role; // ADMIN, EDITOR, VIEWER

    public User(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public String getName() { return name; }
    public String getRole() { return role; }
}

// ---- Protection Proxy ----
class SecureFileSystemProxy implements FileSystem {
    private final FileSystem realFs;
    private final User currentUser;

    public SecureFileSystemProxy(FileSystem realFs, User currentUser) {
        this.realFs = realFs;
        this.currentUser = currentUser;
    }

    private void log(String action, String path) {
        System.out.println("  [AUDIT] " + currentUser.getName()
            + " (" + currentUser.getRole() + ") -> " + action + " " + path);
    }

    @Override
    public String readFile(String path) {
        log("READ", path);
        // VIEWER can read /public only; EDITOR and ADMIN can read anything
        if (currentUser.getRole().equals("VIEWER") && path.startsWith("/private")) {
            throw new SecurityException("VIEWER cannot access /private files");
        }
        return realFs.readFile(path);
    }

    @Override
    public void writeFile(String path, String content) {
        log("WRITE", path);
        if (currentUser.getRole().equals("VIEWER")) {
            throw new SecurityException("VIEWER cannot write files");
        }
        if (currentUser.getRole().equals("EDITOR") && path.startsWith("/private")) {
            throw new SecurityException("EDITOR cannot write to /private");
        }
        realFs.writeFile(path, content);
    }

    @Override
    public void deleteFile(String path) {
        log("DELETE", path);
        if (!currentUser.getRole().equals("ADMIN")) {
            throw new SecurityException("Only ADMIN can delete files");
        }
        realFs.deleteFile(path);
    }

    @Override
    public List<String> listFiles(String directory) {
        log("LIST", directory);
        return realFs.listFiles(directory);
    }
}

// ---- Client ----
public class FileSystemDemo {
    public static void main(String[] args) {
        FileSystem realFs = new RealFileSystem();

        // Admin can do everything
        User admin = new User("Alice", "ADMIN");
        FileSystem adminFs = new SecureFileSystemProxy(realFs, admin);

        // Viewer has restricted access
        User viewer = new User("Bob", "VIEWER");
        FileSystem viewerFs = new SecureFileSystemProxy(realFs, viewer);

        System.out.println("=== Admin reads private config ===");
        System.out.println("  Result: " + adminFs.readFile("/private/config.yaml"));

        System.out.println("\n=== Viewer reads public file ===");
        System.out.println("  Result: " + viewerFs.readFile("/public/readme.txt"));

        System.out.println("\n=== Viewer tries to read private file ===");
        try {
            viewerFs.readFile("/private/config.yaml");
        } catch (SecurityException e) {
            System.out.println("  BLOCKED: " + e.getMessage());
        }

        System.out.println("\n=== Viewer tries to delete ===");
        try {
            viewerFs.deleteFile("/logs/app.log");
        } catch (SecurityException e) {
            System.out.println("  BLOCKED: " + e.getMessage());
        }

        System.out.println("\n=== Admin deletes a file ===");
        adminFs.deleteFile("/logs/app.log");
    }
}
```

**Output:**
```
=== Admin reads private config ===
  [AUDIT] Alice (ADMIN) -> READ /private/config.yaml
  [RealFS] Reading /private/config.yaml
  Result: db_password: secret123

=== Viewer reads public file ===
  [AUDIT] Bob (VIEWER) -> READ /public/readme.txt
  [RealFS] Reading /public/readme.txt
  Result: Welcome to the system

=== Viewer tries to read private file ===
  [AUDIT] Bob (VIEWER) -> READ /private/config.yaml
  BLOCKED: VIEWER cannot access /private files

=== Viewer tries to delete ===
  [AUDIT] Bob (VIEWER) -> DELETE /logs/app.log
  BLOCKED: Only ADMIN can delete files

=== Admin deletes a file ===
  [AUDIT] Alice (ADMIN) -> DELETE /logs/app.log
  [RealFS] Deleted /logs/app.log
```

---

## Proxy vs Decorator -- The #1 Exam Trap

This comparison is asked in virtually every LLD exam. Both patterns wrap an object with the same interface, but their **intent** is fundamentally different.

| Aspect | **Proxy** | **Decorator** |
|--------|-----------|---------------|
| **Intent** | **Control access** to the real object | **Add behavior** to the real object |
| **Who creates the real object?** | Proxy often creates it (lazy init) or manages its lifecycle | Decorator always **receives** the wrapped object from outside |
| **Relationship to real object** | Proxy **controls** whether/when the real object is used | Decorator **enhances** what the real object does |
| **Number of wrappers** | Usually **one** proxy per real subject | Often **stacked** (multiple decorators chained) |
| **Examples** | Lazy loading, security gate, remote stub | Retry, caching, compression, logging layers |
| **Lifecycle control** | Proxy may delay creation, cache, or replace the real object | Decorator has no lifecycle control over the wrapped object |
| **Client awareness** | Client does NOT know it is talking to a proxy | Client does NOT know how many decorators are stacked |
| **Real-world analogy** | **Receptionist** (controls who enters) | **Gift wrapping** (adds layers, same box inside) |

**The key distinction in one sentence:** Proxy says "should I let you through?" while Decorator says "let me add something extra to what you're doing."

**Exam-ready mnemonic:**
- **P**roxy = **P**ermission / **P**ostpone / **P**rotect
- **D**ecorator = **D**ynamic behavior / **D**ecorate / **D**ouble-up

### Code Comparison

```java
// PROXY: controls access -- may create the real object
class ProxyImage implements Image {
    private RealImage real; // created lazily by the proxy itself
    private String filename;

    public ProxyImage(String filename) {
        this.filename = filename;
        // real is NOT created here
    }

    public void display() {
        if (real == null) real = new RealImage(filename); // proxy creates it
        real.display();
    }
}

// DECORATOR: adds behavior -- always receives the wrapped object
class LoggingImage implements Image {
    private final Image inner; // always passed in from outside

    public LoggingImage(Image inner) {
        this.inner = inner; // decorator does NOT create the real object
    }

    public void display() {
        System.out.println("[LOG] About to display");
        inner.display(); // adds logging, then delegates
        System.out.println("[LOG] Display complete");
    }
}
```

---

## SOLID Connection

| Principle | How Proxy Follows It |
|-----------|---------------------|
| **SRP** | Real subject handles business logic; proxy handles access control/caching/lazy loading separately |
| **OCP** | Add new proxy types (logging proxy, caching proxy) without modifying the real subject |
| **LSP** | Proxy implements the same interface -- clients can substitute proxy for real subject |
| **ISP** | Subject interface is kept lean; proxy implements only what is needed |
| **DIP** | Clients depend on the `Subject` abstraction, not the concrete `RealSubject` or `Proxy` |

---

## When to Use / When NOT to Use

**Use Proxy when:**
- **Lazy initialization:** Real object is expensive to create and may never be needed (Virtual Proxy)
- **Access control:** Only certain users/roles should be allowed to call certain methods (Protection Proxy)
- **Logging/Auditing:** You need to track every access to an object without polluting its code (Logging Proxy)
- **Caching:** Repeated calls with the same input should return cached results (Caching Proxy)
- **Remote access:** The real object lives on a different server; the proxy handles serialization/networking (Remote Proxy -- e.g., Java RMI stubs)
- **Rate limiting:** You want to throttle calls to an expensive resource

**Do NOT use Proxy when:**
- You need to **add stackable behaviors** (use **Decorator**)
- You need to **convert interfaces** (use **Adapter**)
- You need to **swap algorithms** (use **Strategy**)
- The real object is lightweight and always needed (proxy adds unnecessary indirection)
- You need multiple layers of wrapping (proxy is typically one layer; decorator is for stacking)

---

## Big Picture

- Proxy is a **Structural** pattern that places an intermediary between the client and the real object
- The proxy and the real object share the **same interface** -- the client is oblivious
- The proxy **controls access**: it can delay, deny, log, cache, or redirect the call
- Java has built-in support: `java.lang.reflect.Proxy` creates dynamic proxies at runtime
- Spring AOP uses proxies extensively: `@Transactional`, `@Cacheable`, `@Secured` all work through proxy objects
- Hibernate lazy loading uses proxy objects for entities not yet loaded from the database
- Connected to: **Decorator** (adds behavior vs. controls access), **Adapter** (changes interface), **Facade** (simplifies interface to a subsystem)

---

## Exam Tips (Quick Recall)

1. Proxy = **same interface**, controls **access** (not behavior) to the real object
2. Virtual Proxy = **lazy loading** -- real object created on first use, not at construction time
3. Protection Proxy = **access control** -- checks permissions before forwarding the call
4. Smart Proxy = **logging, caching, rate limiting** -- cross-cutting concerns without modifying the real object
5. **Proxy vs Decorator** is the #1 exam question: Proxy controls access (creates/manages the real object), Decorator adds behavior (receives the real object)
6. Java examples: `java.lang.reflect.Proxy`, Spring AOP (`@Transactional`, `@Cacheable`), Hibernate lazy-loaded entities
7. Proxy follows **SRP** (separates access control from business logic) and **OCP** (new proxy types without modifying the real subject)

---

## Viva Questions

**Q1: What is the Proxy pattern?**
A structural pattern that provides a surrogate or placeholder for another object to control access to it. The proxy implements the same interface as the real subject, so the client uses it transparently. The proxy decides when, whether, and how the call is forwarded to the real object.

**Q2: What are the main types of proxy?**
Four main types: (1) **Virtual Proxy** -- delays creation of an expensive object until first use (lazy loading). (2) **Protection Proxy** -- checks permissions/roles before forwarding the call. (3) **Remote Proxy** -- represents an object in a different address space (e.g., Java RMI stubs). (4) **Smart Proxy** -- adds logging, caching, reference counting, or other cross-cutting concerns.

**Q3: How does a Virtual Proxy work?**
The proxy holds the information needed to create the real object (e.g., a filename) but does not create it in the constructor. On the first method call that requires the real object, the proxy instantiates it and stores the reference. Subsequent calls reuse the already-created instance. This is lazy initialization.

**Q4: How is Proxy different from Decorator?**
Both implement the same interface and wrap another object, but their intent differs. **Proxy controls access** -- it decides whether to create the real object, whether to allow the call, whether to cache the result. **Decorator adds behavior** -- it always forwards the call but adds something before or after (logging, retries, compression). A key structural difference: the proxy often creates the real object itself, while the decorator always receives it via constructor injection.

**Q5: How is Proxy different from Adapter?**
Adapter changes the interface -- it makes an incompatible class conform to the expected interface. Proxy keeps the same interface -- client code does not change. Adapter translates; Proxy gates.

**Q6: Give a real-world Java example of the Proxy pattern.**
Spring's `@Transactional` annotation: Spring creates a proxy around your service bean. When a method is called, the proxy starts a transaction before forwarding to the real method and commits/rolls back after. The caller has no idea it is talking to a proxy. Similarly, `@Cacheable` wraps the bean in a caching proxy that checks the cache before calling the real method.

**Q7: What is `java.lang.reflect.Proxy`?**
It is Java's built-in mechanism for creating dynamic proxies at runtime. You provide an `InvocationHandler` that intercepts all method calls. The JDK generates a proxy class at runtime that implements the specified interfaces and delegates every call to your handler. This is how many frameworks (Spring, Hibernate, Mockito) implement proxy behavior without writing proxy classes by hand.

**Q8: Can a proxy and a decorator be combined?**
Yes. For example, you might have a Protection Proxy that controls who can access a service, and then a Logging Decorator that adds logging around it. The proxy controls access; the decorator adds behavior. They serve different purposes and can be layered. However, a single proxy can also include logging as part of its access control logic (e.g., audit logging on access denial).

**Q9: What happens if the proxy interface changes?**
Both the proxy and the real subject must be updated, since they implement the same interface. This is why keeping the subject interface minimal (ISP) is important -- fewer methods means fewer places to update when the contract changes.

**Q10: How does Proxy follow the Open/Closed Principle?**
You can introduce new proxy types (caching proxy, rate-limiting proxy, logging proxy) without modifying the real subject class. The real subject remains closed for modification. The system is open for extension via new proxy implementations.

---

## MCQ Quiz

**1. Proxy pattern is classified as:**
a) Creational
b) Structural
c) Behavioral
d) Concurrency

<details><summary>Answer</summary>b) Structural</details>

**2. The primary intent of Proxy is:**
a) Add stackable behaviors dynamically
b) Convert one interface to another
c) Control access to another object via a surrogate with the same interface
d) Swap algorithms at runtime

<details><summary>Answer</summary>c) Control access to another object via a surrogate with the same interface</details>

**3. A Virtual Proxy is used for:**
a) Access control based on user roles
b) Lazy initialization -- deferring object creation until first use
c) Converting XML to JSON
d) Swapping sorting algorithms

<details><summary>Answer</summary>b) Lazy initialization -- deferring object creation until first use</details>

**4. A Protection Proxy is used for:**
a) Lazy loading heavy resources
b) Caching query results
c) Checking permissions/roles before forwarding calls
d) Compressing data

<details><summary>Answer</summary>c) Checking permissions/roles before forwarding calls</details>

**5. Which statement about Proxy is TRUE?**
a) The proxy uses a different interface than the real subject
b) The proxy always creates the real object immediately
c) The proxy and real subject implement the same interface
d) The proxy is always transparent to the client

<details><summary>Answer</summary>c) The proxy and real subject implement the same interface. Note: (d) is also true in spirit, but (c) is the structural guarantee.</details>

**6. In a Virtual Proxy for Image, when does the RealImage get created?**
a) When the ProxyImage constructor is called
b) When display() is called for the first time
c) When the garbage collector runs
d) Never

<details><summary>Answer</summary>b) When display() is called for the first time -- that is the whole point of lazy initialization</details>

**7. What is the KEY difference between Proxy and Decorator?**
a) Proxy changes the interface; Decorator does not
b) Proxy controls access; Decorator adds behavior
c) Decorator controls access; Proxy adds behavior
d) They are identical patterns

<details><summary>Answer</summary>b) Proxy controls access (lazy load, security, caching); Decorator adds behavior (retry, compression, logging layers)</details>

**8. In a Protection Proxy, if a VIEWER tries to delete a file, the proxy should:**
a) Delete the file and log a warning
b) Throw a SecurityException before the call reaches the real object
c) Ask the user for confirmation
d) Forward the call and let the real object decide

<details><summary>Answer</summary>b) Throw a SecurityException -- the proxy prevents the call from ever reaching the real file system</details>

**9. Which Java mechanism supports creating dynamic proxies at runtime?**
a) java.util.Optional
b) java.lang.reflect.Proxy with InvocationHandler
c) java.io.Serializable
d) java.util.stream.Stream

<details><summary>Answer</summary>b) java.lang.reflect.Proxy with InvocationHandler -- it generates proxy classes at runtime</details>

**10. Spring's @Transactional annotation works by:**
a) Modifying the bytecode of the annotated method
b) Creating a proxy that starts a transaction before and commits/rolls back after the real method
c) Using the Strategy pattern
d) Requiring the developer to manually start transactions

<details><summary>Answer</summary>b) Spring creates a proxy around the bean. The proxy manages the transaction lifecycle transparently.</details>

**11. Which SOLID principle does Proxy most directly follow by separating access control from business logic?**
a) Open/Closed Principle
b) Single Responsibility Principle
c) Interface Segregation Principle
d) Liskov Substitution Principle

<details><summary>Answer</summary>b) Single Responsibility Principle -- the real subject handles business logic, the proxy handles access control</details>

**12. A caching proxy should clear its cache when:**
a) A read operation is performed
b) A write/update/delete operation is performed (data may have changed)
c) The JVM restarts
d) Never -- caches should be permanent

<details><summary>Answer</summary>b) Write/update/delete operations may change the underlying data, making cached reads stale</details>

**13. Hibernate's lazy loading of entities is an example of:**
a) Decorator pattern
b) Strategy pattern
c) Virtual Proxy pattern
d) Adapter pattern

<details><summary>Answer</summary>c) Virtual Proxy -- Hibernate creates a proxy for the entity that loads from the database only when a getter is first called</details>

**14. In the Proxy pattern, who typically creates the RealSubject?**
a) The client always creates it
b) The proxy often creates it (especially in Virtual Proxy)
c) A factory always creates it
d) The real subject creates itself

<details><summary>Answer</summary>b) The proxy often creates the real subject, especially in Virtual Proxy (lazy init). In Protection Proxy, it may be injected.</details>

**15. In the Decorator pattern, who creates the wrapped object?**
a) The decorator creates it internally
b) The client creates it and passes it to the decorator's constructor
c) A proxy creates it
d) It is created by reflection

<details><summary>Answer</summary>b) The client creates the real object and passes it to the decorator -- the decorator does not manage its lifecycle</details>

**16. A Remote Proxy is used when:**
a) The real object is expensive to create
b) The real object is in a different address space (e.g., different server)
c) The real object needs access control
d) The real object needs extra behavior

<details><summary>Answer</summary>b) A Remote Proxy represents an object on a different server and handles network communication transparently</details>

**17. Which pattern should you use if you need to stack multiple optional behaviors (retry, caching, auth) around an HTTP client?**
a) Proxy
b) Decorator
c) Adapter
d) Singleton

<details><summary>Answer</summary>b) Decorator -- it is designed for stacking multiple optional, combinable behaviors. Proxy is for single-layer access control.</details>

**18. What happens when display() is called a SECOND time on a Virtual Proxy that has already loaded its RealImage?**
a) The image is loaded from disk again
b) The proxy delegates directly to the already-created RealImage (no reload)
c) A SecurityException is thrown
d) The proxy creates a new RealImage

<details><summary>Answer</summary>b) The proxy checks that realImage is not null, finds it already created, and delegates directly -- no second load</details>

**19. A Smart Proxy that adds logging to a DatabaseService should:**
a) Modify the DatabaseService class to add logging
b) Implement the same DatabaseService interface and log before/after delegating
c) Create a new interface with logging methods
d) Use inheritance from DatabaseService

<details><summary>Answer</summary>b) Implement the same interface, add logging, then delegate to the real DatabaseService -- same interface, transparent to clients</details>

**20. Which of these is NOT a valid use case for the Proxy pattern?**
a) Lazy loading an expensive object
b) Adding stackable compression, retry, and auth layers
c) Controlling access based on user roles
d) Caching results of expensive operations

<details><summary>Answer</summary>b) Stackable layers of behavior is the Decorator pattern, not Proxy. Proxy is for single-layer access control.</details>

### Self-Scoring Table

| Score | Assessment |
|-------|-----------|
| **18-20** | Proxy pattern mastered. You can distinguish it from Decorator under exam pressure. |
| **14-17** | Good foundation. Review the Proxy vs Decorator comparison table carefully. |
| **10-13** | Revisit the three proxy types and re-read the code examples. |
| **Below 10** | Start from the beginning. Focus on the Virtual Proxy example first. |

---

## Coding Exam Questions

### Problem 1: Implement a Virtual Proxy for a Video Player

**Scenario:** You have a `Video` interface with `play()` and `getTitle()` methods. The `RealVideo` class downloads the video file in its constructor (expensive). Implement a `ProxyVideo` that:
- Does NOT download the video on construction
- Downloads on the first call to `play()`
- Reuses the downloaded video on subsequent `play()` calls
- `getTitle()` should work WITHOUT triggering a download

```java
interface Video {
    void play();
    String getTitle();
}

class RealVideo implements Video {
    private final String title;
    private byte[] data;

    public RealVideo(String title) {
        this.title = title;
        download();
    }

    private void download() {
        System.out.println("Downloading video: " + title + " (takes 5 seconds)...");
        data = new byte[5000]; // simulate downloaded data
        System.out.println("Download complete: " + title);
    }

    @Override
    public void play() {
        System.out.println("Playing video: " + title + " (" + data.length + " bytes)");
    }

    @Override
    public String getTitle() { return title; }
}
```

**Task:** Write `ProxyVideo` and a `main` method that demonstrates lazy loading.

<details><summary>Solution</summary>

```java
class ProxyVideo implements Video {
    private final String title;
    private RealVideo realVideo; // null until first play()

    public ProxyVideo(String title) {
        this.title = title;
    }

    @Override
    public void play() {
        if (realVideo == null) {
            realVideo = new RealVideo(title);
        }
        realVideo.play();
    }

    @Override
    public String getTitle() {
        // Does NOT trigger download -- returns stored title
        return title;
    }
}

public class VideoPlayerDemo {
    public static void main(String[] args) {
        Video v1 = new ProxyVideo("Lecture 1: Proxy Pattern");
        Video v2 = new ProxyVideo("Lecture 2: Decorator Pattern");

        // getTitle() works without downloading
        System.out.println("Available: " + v1.getTitle());
        System.out.println("Available: " + v2.getTitle());
        System.out.println("No downloads have occurred yet.\n");

        // First play triggers download
        v1.play();
        System.out.println();

        // Second play reuses the download
        v1.play();
        System.out.println();

        // v2 is never played -- never downloaded
        System.out.println("v2 was never downloaded.");
    }
}
```

**Key points:**
- `ProxyVideo` stores only the title in the constructor -- no download
- `getTitle()` returns the title directly, never triggers a download
- `play()` checks if `realVideo` is null; if so, creates it (triggering download)
- Subsequent `play()` calls reuse the existing `RealVideo` instance

</details>

---

### Problem 2: Implement a Rate-Limiting Proxy

**Scenario:** You have an `ApiService` interface with `call(String endpoint)`. The `RealApiService` makes HTTP calls. Implement a `RateLimitingProxy` that:
- Allows a maximum of N calls per minute
- Throws a `RuntimeException("Rate limit exceeded")` if the limit is breached
- Resets the counter every 60 seconds

```java
interface ApiService {
    String call(String endpoint);
}

class RealApiService implements ApiService {
    @Override
    public String call(String endpoint) {
        return "Response from " + endpoint;
    }
}
```

**Task:** Write `RateLimitingProxy` and a `main` method demonstrating the rate limit.

<details><summary>Solution</summary>

```java
class RateLimitingProxy implements ApiService {
    private final ApiService realService;
    private final int maxCallsPerMinute;
    private int callCount;
    private long windowStart;

    public RateLimitingProxy(ApiService realService, int maxCallsPerMinute) {
        this.realService = realService;
        this.maxCallsPerMinute = maxCallsPerMinute;
        this.callCount = 0;
        this.windowStart = System.currentTimeMillis();
    }

    @Override
    public String call(String endpoint) {
        long now = System.currentTimeMillis();

        // Reset window if 60 seconds have passed
        if (now - windowStart >= 60_000) {
            callCount = 0;
            windowStart = now;
        }

        // Check rate limit
        if (callCount >= maxCallsPerMinute) {
            throw new RuntimeException("Rate limit exceeded: max "
                + maxCallsPerMinute + " calls per minute");
        }

        callCount++;
        System.out.println("[RateLimitProxy] Call " + callCount
            + "/" + maxCallsPerMinute + " to " + endpoint);
        return realService.call(endpoint);
    }
}

public class RateLimitDemo {
    public static void main(String[] args) {
        ApiService api = new RateLimitingProxy(new RealApiService(), 3);

        // These 3 calls succeed
        System.out.println(api.call("/users"));
        System.out.println(api.call("/orders"));
        System.out.println(api.call("/products"));

        // This 4th call exceeds the limit
        try {
            api.call("/inventory");
        } catch (RuntimeException e) {
            System.out.println("BLOCKED: " + e.getMessage());
        }
    }
}
```

**Output:**
```
[RateLimitProxy] Call 1/3 to /users
Response from /users
[RateLimitProxy] Call 2/3 to /orders
Response from /orders
[RateLimitProxy] Call 3/3 to /products
Response from /products
BLOCKED: Rate limit exceeded: max 3 calls per minute
```

**Key points:**
- Proxy implements the same `ApiService` interface -- client code is unchanged
- Rate limiting logic is in the proxy, not scattered across the codebase (SRP)
- The real service is unmodified (OCP)
- Window-based rate limiting: counter resets every 60 seconds

</details>

---

### Problem 3: Identify and Fix the Pattern Misuse

**Given code:** Someone tried to use a "proxy" but actually implemented it wrong. Identify what is wrong and fix it.

```java
interface PaymentGateway {
    boolean processPayment(double amount);
}

class RealPaymentGateway implements PaymentGateway {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing payment of $" + amount);
        return true;
    }
}

// "Proxy" -- but is it really?
class PaymentProxy implements PaymentGateway {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("[LOG] Payment attempt: $" + amount);
        if (amount > 10000) {
            System.out.println("[SECURITY] Large payment flagged!");
            return false;
        }
        // BUG: Creates a NEW RealPaymentGateway on EVERY call
        RealPaymentGateway gateway = new RealPaymentGateway();
        boolean result = gateway.processPayment(amount);
        System.out.println("[LOG] Payment result: " + result);
        return result;
    }
}
```

**Tasks:**
1. Identify the structural problem in this "proxy"
2. Fix it so it properly follows the Proxy pattern
3. Explain whether this is a Virtual Proxy, Protection Proxy, or both

<details><summary>Solution</summary>

**Problems identified:**
1. **Creates a new RealPaymentGateway on every call** -- wasteful and loses any state the real gateway might hold (connection pools, session tokens, etc.)
2. **No option for dependency injection** -- the proxy is tightly coupled to `RealPaymentGateway`. If you want to test the proxy, you cannot inject a mock.
3. **Mixes concerns without clear intent** -- it does logging AND security AND object creation in one method with no structure.

**Fixed version:**

```java
class PaymentProxy implements PaymentGateway {
    private final PaymentGateway realGateway; // hold ONE reference

    // Option 1: Inject the real gateway (Protection Proxy style)
    public PaymentProxy(PaymentGateway realGateway) {
        this.realGateway = realGateway;
    }

    @Override
    public boolean processPayment(double amount) {
        // ACCESS CONTROL: check before forwarding
        System.out.println("[LOG] Payment attempt: $" + amount);

        if (amount > 10000) {
            System.out.println("[SECURITY] Large payment blocked!");
            return false; // Proxy DENIES access
        }

        // FORWARD to real gateway
        boolean result = realGateway.processPayment(amount);
        System.out.println("[LOG] Payment result: " + result);
        return result;
    }
}

// Usage:
PaymentGateway gateway = new PaymentProxy(new RealPaymentGateway());
gateway.processPayment(500);   // allowed
gateway.processPayment(15000); // blocked by proxy
```

**If you wanted a Virtual Proxy variant** (lazy creation):

```java
class LazyPaymentProxy implements PaymentGateway {
    private PaymentGateway realGateway; // created lazily

    @Override
    public boolean processPayment(double amount) {
        if (amount > 10000) {
            System.out.println("[SECURITY] Blocked -- real gateway never created");
            return false;
        }

        if (realGateway == null) {
            realGateway = new RealPaymentGateway(); // create only when needed
        }
        return realGateway.processPayment(amount);
    }
}
```

**What type of proxy is this?**
The fixed version is primarily a **Protection Proxy** (blocks payments over $10,000) with **logging** (Smart Proxy). The lazy variant adds **Virtual Proxy** behavior by deferring creation. The original was a broken attempt that combined elements of all three without proper structure.

</details>
