# Flyweight Design Pattern

**Category:** Structural
**Intent:** Minimize memory usage by sharing as much data as possible between similar objects. Extract the shared (intrinsic) state into a small number of flyweight objects and pass the unique (extrinsic) state from outside.
**Use cases:** Text editors (shared character styles/fonts), game engines (shared tree/bullet/particle textures), map renderers (shared tile types), caching systems, Java's String pool, Integer cache (-128 to 127), Boolean.valueOf().

---

## Coder Army Reference Example

From [Lecture 30 — WithFlyWeight.java](https://github.com/adityatandon15/Low-Level-Design-Course/tree/main/Lecture%2030/Java%20Code)

**Theme:** Space game spawning 1,000,000 asteroids while sharing their intrinsic properties.

```java
import java.util.*;

// Flyweight — stores INTRINSIC (shared) state only
class AsteroidFlyweight {
    private int length, width, weight;
    private String color, texture, material;

    public AsteroidFlyweight(int l, int w, int wt, String col, String tex, String mat) {
        this.length = l; this.width = w; this.weight = wt;
        this.color = col; this.texture = tex; this.material = mat;
    }

    public void render(int posX, int posY, int velX, int velY) {
        System.out.println("Rendering " + color + " " + material + " asteroid at ("
            + posX + "," + posY + ") Size:" + length + "x" + width
            + " Vel:(" + velX + "," + velY + ")");
    }
}

// Flyweight Factory — returns shared instances
class AsteroidFactory {
    private static Map<String, AsteroidFlyweight> flyweights = new HashMap<>();

    public static AsteroidFlyweight getAsteroid(
            int length, int width, int weight, String color, String texture, String material) {
        String key = length + "_" + width + "_" + weight + "_" + color + "_" + texture + "_" + material;
        if (!flyweights.containsKey(key)) {
            flyweights.put(key, new AsteroidFlyweight(length, width, weight, color, texture, material));
        }
        return flyweights.get(key);
    }

    public static int getFlyweightCount() { return flyweights.size(); }
}

// Context — stores EXTRINSIC (unique) state only
class AsteroidContext {
    private AsteroidFlyweight flyweight; // shared reference
    private int posX, posY, velocityX, velocityY; // unique per asteroid

    public AsteroidContext(AsteroidFlyweight fw, int posX, int posY, int velX, int velY) {
        this.flyweight = fw;
        this.posX = posX; this.posY = posY;
        this.velocityX = velX; this.velocityY = velY;
    }

    public void render() {
        flyweight.render(posX, posY, velocityX, velocityY);
    }
}

public class WithFlyWeight {
    public static void main(String[] args) {
        List<AsteroidContext> asteroids = new ArrayList<>();
        int COUNT = 1_000_000;

        String[] colors    = {"Red", "Blue", "Gray"};
        String[] textures  = {"Rocky", "Metallic", "Icy"};
        String[] materials = {"Iron", "Stone", "Ice"};
        int[]    sizes     = {25, 35, 45};

        for (int i = 0; i < COUNT; i++) {
            int type = i % 3;
            AsteroidFlyweight fw = AsteroidFactory.getAsteroid(
                sizes[type], sizes[type], sizes[type] * 10,
                colors[type], textures[type], materials[type]
            );
            asteroids.add(new AsteroidContext(fw, 100 + i * 50, 200 + i * 30, 1, 2));
        }

        System.out.println("Total asteroids: " + COUNT);
        System.out.println("Unique flyweight objects: " + AsteroidFactory.getFlyweightCount()); // 3 !!
    }
}
```

**The magic:** 1,000,000 `AsteroidContext` objects but only **3 `AsteroidFlyweight` objects** (one per asteroid type). Memory: instead of 1M × full object, you get 1M × (pointer + 4 ints) + 3 × full object.

---

## The Problem: Memory Waste from Duplicated State

### Scenario 1: Text Editor

You're building a text editor. Each character on screen needs font, size, color, and position. A document has 100,000 characters. If each character object stores its own copy of the font/style data:

### BAD: Every Character Object Stores Its Own Style

```java
// BAD: Each character duplicates the shared style information
class Character {
    private final char ch;
    private final String fontFamily;  // "Arial" -- duplicated 100,000 times
    private final int fontSize;       // 12 -- duplicated 100,000 times
    private final String color;       // "#000000" -- duplicated 100,000 times
    private final boolean bold;       // false -- duplicated 100,000 times
    private final boolean italic;     // false -- duplicated 100,000 times
    private final int row;            // unique per character
    private final int col;            // unique per character

    Character(char ch, String fontFamily, int fontSize, String color,
              boolean bold, boolean italic, int row, int col) {
        this.ch = ch;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
        this.bold = bold;
        this.italic = italic;
        this.row = row;
        this.col = col;
    }

    void render() {
        System.out.println("Render '" + ch + "' at (" + row + "," + col
            + ") in " + fontFamily + " " + fontSize + "pt " + color);
    }
}
```

**Problems:**
- **Memory explosion:** 100,000 characters x (font string + size + color + booleans) = massive duplication
- In a typical document, most characters share the SAME font/style. Maybe 5-10 unique styles exist, but each character stores its own copy
- A `String` like `"Arial"` is ~40 bytes in Java. Multiply by 100,000 = ~4 MB just for font names
- **OCP violation:** If you add a new style property (underline, strikethrough), every character object grows

### BAD: Scenario 2 -- Game Forest

```java
// BAD: Each tree object stores its own copy of texture, color, mesh
class Tree {
    private final double x, y;         // unique per tree
    private final String name;          // "Oak" -- shared among thousands of oaks
    private final String color;         // "#228B22" -- shared
    private final byte[] texture;       // 5 MB texture data -- shared!
    private final byte[] meshData;      // 2 MB mesh data -- shared!

    Tree(double x, double y, String name, String color,
         byte[] texture, byte[] meshData) {
        this.x = x; this.y = y;
        this.name = name; this.color = color;
        this.texture = texture; this.meshData = meshData;
    }
}
```

**Problems:**
- A forest has 10,000 trees but only 5 types (Oak, Pine, Birch, Maple, Willow)
- Each tree stores a 5 MB texture and 2 MB mesh = 7 MB per tree
- 10,000 trees x 7 MB = **70 GB of RAM** for data that only needs to exist 5 times (35 MB)
- The game will crash with `OutOfMemoryError`

---

## The Solution: Flyweight Pattern

### The Insight

Most of the data stored in each object is **shared** across many objects. Split every object's state into two parts:

- **Intrinsic state:** Shared, immutable, context-independent. Stored INSIDE the flyweight. Created once, reused by many.
- **Extrinsic state:** Unique, context-dependent. Stored OUTSIDE the flyweight. Passed in by the client when needed.

A **FlyweightFactory** creates and caches flyweight objects. When a client requests a flyweight with certain intrinsic state, the factory either returns an existing one or creates a new one.

### The Structure

```
FlyweightFactory
    |-- cache: Map<key, Flyweight>
    |-- getFlyweight(intrinsicState): Flyweight
    
Flyweight (interface or class)
    |-- intrinsic state (immutable, shared)
    |-- operation(extrinsicState)

Client
    |-- stores extrinsic state
    |-- gets flyweight from factory
    |-- calls flyweight.operation(extrinsicState)
```

---

## Example 1: Text Editor -- Character Style Flyweight

### Step 1: Flyweight -- the shared CharacterStyle

```java
import java.util.Objects;

// Flyweight: stores INTRINSIC state (shared, immutable)
public final class CharacterStyle {
    private final String fontFamily;
    private final int fontSize;
    private final String color;
    private final boolean bold;
    private final boolean italic;

    public CharacterStyle(String fontFamily, int fontSize, String color,
                          boolean bold, boolean italic) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
        this.bold = bold;
        this.italic = italic;
    }

    // Flyweight operation: uses intrinsic state + extrinsic state (char, row, col)
    public void render(char ch, int row, int col) {
        System.out.println("Render '" + ch + "' at (" + row + "," + col
            + ") in " + fontFamily + " " + fontSize + "pt "
            + color + (bold ? " BOLD" : "") + (italic ? " ITALIC" : ""));
    }

    // Used as map key -- must implement equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CharacterStyle)) return false;
        CharacterStyle that = (CharacterStyle) o;
        return fontSize == that.fontSize && bold == that.bold
            && italic == that.italic
            && Objects.equals(fontFamily, that.fontFamily)
            && Objects.equals(color, that.color);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fontFamily, fontSize, color, bold, italic);
    }

    @Override
    public String toString() {
        return fontFamily + "-" + fontSize + "-" + color
            + (bold ? "-B" : "") + (italic ? "-I" : "");
    }
}
```

**Key points:**
- The flyweight is **immutable** (all fields are `final`, no setters)
- It stores only **intrinsic** (shared) state: font, size, color, bold, italic
- The `render()` method receives **extrinsic** state (char, row, col) as parameters
- `equals()` and `hashCode()` are required for the factory's cache map

### Step 2: FlyweightFactory -- caches and reuses styles

```java
import java.util.HashMap;
import java.util.Map;

public class CharacterStyleFactory {
    private final Map<CharacterStyle, CharacterStyle> cache = new HashMap<>();

    public CharacterStyle getStyle(String fontFamily, int fontSize,
                                   String color, boolean bold, boolean italic) {
        CharacterStyle requested = new CharacterStyle(
            fontFamily, fontSize, color, bold, italic);

        // If an identical style already exists, return the cached one
        CharacterStyle existing = cache.get(requested);
        if (existing != null) {
            return existing;
        }

        // Otherwise, cache and return the new one
        cache.put(requested, requested);
        return requested;
    }

    public int getCacheSize() {
        return cache.size();
    }
}
```

**Key points:**
- The factory **deduplicates** flyweight objects
- If a style with the same intrinsic state already exists, it returns the cached instance
- With 100,000 characters but only 5 unique styles, the cache holds just 5 objects

### Step 3: Context -- the Character that uses the flyweight

```java
// Context: stores EXTRINSIC state + a reference to the shared flyweight
public class Character {
    private final char ch;          // extrinsic
    private final int row;          // extrinsic
    private final int col;          // extrinsic
    private final CharacterStyle style;  // flyweight reference (shared)

    public Character(char ch, int row, int col, CharacterStyle style) {
        this.ch = ch;
        this.row = row;
        this.col = col;
        this.style = style;
    }

    public void render() {
        // Pass extrinsic state to the flyweight's operation
        style.render(ch, row, col);
    }
}
```

### Step 4: Client -- putting it all together

```java
import java.util.ArrayList;
import java.util.List;

public class TextEditorDemo {
    public static void main(String[] args) {
        CharacterStyleFactory factory = new CharacterStyleFactory();
        List<Character> document = new ArrayList<>();

        // Simulate a document: most characters share a few styles
        String text = "Hello, World! This is a Flyweight demo with shared styles.";
        CharacterStyle normal = factory.getStyle("Arial", 12, "#000000", false, false);
        CharacterStyle bold   = factory.getStyle("Arial", 12, "#000000", true, false);
        CharacterStyle header = factory.getStyle("Arial", 24, "#333333", true, false);

        // "Hello" in header style
        for (int i = 0; i < 5; i++) {
            document.add(new Character(text.charAt(i), 0, i, header));
        }
        // Rest in normal, with "World" in bold
        for (int i = 5; i < text.length(); i++) {
            CharacterStyle s = (i >= 7 && i <= 11) ? bold : normal;
            document.add(new Character(text.charAt(i), 0, i, s));
        }

        // Render
        for (Character c : document) {
            c.render();
        }

        System.out.println("\n--- Memory Analysis ---");
        System.out.println("Total characters: " + document.size());
        System.out.println("Unique styles (flyweights): " + factory.getCacheSize());

        // Request the same style again -- should return cached instance
        CharacterStyle sameNormal = factory.getStyle("Arial", 12, "#000000", false, false);
        System.out.println("Same instance reused? " + (normal == sameNormal));  // true

        // MEMORY SAVINGS:
        // BAD way: 58 characters x (fontFamily + fontSize + color + booleans) per char
        // GOOD way: 3 flyweight objects shared by all 58 characters
        // At scale (100K chars, 5 styles): ~4 MB saved just on font strings
    }
}
```

**Output:**
```
Render 'H' at (0,0) in Arial 24pt #333333 BOLD
Render 'e' at (0,1) in Arial 24pt #333333 BOLD
...
Render 'W' at (0,7) in Arial 12pt #000000 BOLD
Render 'o' at (0,8) in Arial 12pt #000000 BOLD
...

--- Memory Analysis ---
Total characters: 58
Unique styles (flyweights): 3
Same instance reused? true
```

---

## Example 2: Game -- Tree Rendering in a Forest

### Step 1: Flyweight -- the shared TreeType

```java
import java.util.Arrays;
import java.util.Objects;

// Flyweight: stores INTRINSIC state (shared, immutable)
// In a real game, texture and meshData would be large (megabytes)
public final class TreeType {
    private final String name;
    private final String color;
    private final String texture;  // simplified; in reality, a large byte[]

    public TreeType(String name, String color, String texture) {
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    // Flyweight operation: receives extrinsic state (x, y) as parameters
    public void draw(double x, double y) {
        System.out.printf("Drawing %s tree at (%.1f, %.1f) "
            + "[color=%s, texture=%s]%n", name, x, y, color, texture);
    }

    public String getName() { return name; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TreeType)) return false;
        TreeType t = (TreeType) o;
        return Objects.equals(name, t.name)
            && Objects.equals(color, t.color)
            && Objects.equals(texture, t.texture);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, color, texture);
    }
}
```

### Step 2: FlyweightFactory -- caches TreeTypes

```java
import java.util.HashMap;
import java.util.Map;

public class TreeTypeFactory {
    private static final Map<String, TreeType> cache = new HashMap<>();

    public static TreeType getTreeType(String name, String color, String texture) {
        String key = name + "::" + color + "::" + texture;
        TreeType existing = cache.get(key);
        if (existing != null) {
            return existing;
        }
        TreeType newType = new TreeType(name, color, texture);
        cache.put(key, newType);
        System.out.println("[Factory] Created new TreeType: " + name);
        return newType;
    }

    public static int getCacheSize() {
        return cache.size();
    }
}
```

### Step 3: Context -- the Tree with unique position

```java
// Context: stores EXTRINSIC state + reference to shared flyweight
public class Tree {
    private final double x;       // extrinsic -- unique per tree
    private final double y;       // extrinsic -- unique per tree
    private final TreeType type;  // flyweight reference (shared)

    public Tree(double x, double y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void draw() {
        type.draw(x, y);  // pass extrinsic state to flyweight
    }
}
```

### Step 4: Client -- the Forest

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class ForestDemo {
    public static void main(String[] args) {
        List<Tree> forest = new ArrayList<>();
        Random rnd = new Random(42);

        // Tree type definitions (intrinsic state)
        String[][] types = {
            {"Oak",    "#228B22", "oak_bark.png"},
            {"Pine",   "#006400", "pine_bark.png"},
            {"Birch",  "#8B4513", "birch_bark.png"},
            {"Maple",  "#FF4500", "maple_bark.png"},
            {"Willow", "#2E8B57", "willow_bark.png"},
        };

        // Plant 10,000 trees (but only 5 TreeType flyweights)
        int totalTrees = 10_000;
        for (int i = 0; i < totalTrees; i++) {
            String[] t = types[rnd.nextInt(types.length)];
            TreeType type = TreeTypeFactory.getTreeType(t[0], t[1], t[2]);
            double x = rnd.nextDouble() * 1000;
            double y = rnd.nextDouble() * 1000;
            forest.add(new Tree(x, y, type));
        }

        // Draw first 5 trees as a sample
        System.out.println("\n--- Sample trees ---");
        for (int i = 0; i < 5; i++) {
            forest.get(i).draw();
        }

        System.out.println("\n--- Memory Analysis ---");
        System.out.println("Total trees planted: " + forest.size());
        System.out.println("Unique TreeType flyweights: " + TreeTypeFactory.getCacheSize());

        // MEMORY SAVINGS CALCULATION:
        // BAD: 10,000 trees x 7 MB (texture + mesh) = 70 GB
        // GOOD: 5 TreeType flyweights x 7 MB = 35 MB
        //       + 10,000 Tree contexts x 24 bytes (x, y, reference) = ~240 KB
        //       Total: ~35.24 MB
        // Savings: ~99.95%
        System.out.println("\nWithout Flyweight: 10,000 x 7 MB = ~70 GB");
        System.out.println("With Flyweight:    5 x 7 MB + 10,000 x 24 B = ~35 MB");
        System.out.println("Memory saved:      ~99.95%");
    }
}
```

**Output:**
```
[Factory] Created new TreeType: Pine
[Factory] Created new TreeType: Willow
[Factory] Created new TreeType: Birch
[Factory] Created new TreeType: Oak
[Factory] Created new TreeType: Maple

--- Sample trees ---
Drawing Pine tree at (196.1, 438.7) [color=#006400, texture=pine_bark.png]
Drawing Willow tree at (68.7, 953.5) [color=#2E8B57, texture=willow_bark.png]
...

--- Memory Analysis ---
Total trees planted: 10000
Unique TreeType flyweights: 5

Without Flyweight: 10,000 x 7 MB = ~70 GB
With Flyweight:    5 x 7 MB + 10,000 x 24 B = ~35 MB
Memory saved:      ~99.95%
```

---

## Intrinsic vs Extrinsic State

This is the **core concept** of Flyweight. If you get this wrong, you get the pattern wrong.

| Aspect | Intrinsic State | Extrinsic State |
|--------|----------------|-----------------|
| **Where stored** | Inside the flyweight object | Outside, in the client/context |
| **Shared?** | Yes, shared by many objects | No, unique per object |
| **Mutability** | Immutable (must be) | Can change |
| **Examples (Text Editor)** | fontFamily, fontSize, color, bold, italic | char value, row, col |
| **Examples (Game)** | tree name, color, texture, mesh | x position, y position |
| **Who provides it?** | FlyweightFactory at creation | Client passes it to flyweight methods |
| **Thread safety** | Safe (immutable, shared) | Managed by client |

**Memory formula:**

```
WITHOUT Flyweight: N objects x (intrinsic + extrinsic) per object
WITH Flyweight:    K flyweights x intrinsic  +  N contexts x (extrinsic + reference)

where K << N (K unique types, N total objects)
```

**Exam Tip:** The examiner will ask you to identify intrinsic vs extrinsic state in a scenario. Ask: "Is this data shared across many objects and never changes?" If yes, it is intrinsic. "Is this data unique per object or changes per context?" If yes, it is extrinsic.

---

## Java's Built-in Flyweight Examples

Java uses the Flyweight pattern in several core APIs:

**1. String Pool (String Interning)**
```java
String a = "hello";        // from string pool
String b = "hello";        // same reference from pool
System.out.println(a == b);  // true -- same flyweight object

String c = new String("hello");  // bypasses pool, new object
System.out.println(a == c);      // false -- different objects
System.out.println(a.equals(c)); // true -- same content

String d = c.intern();           // puts c into pool, returns pooled instance
System.out.println(a == d);      // true -- same flyweight
```

**2. Integer Cache (-128 to 127)**
```java
Integer x = Integer.valueOf(100);  // cached flyweight
Integer y = Integer.valueOf(100);  // same cached instance
System.out.println(x == y);        // true -- same flyweight (within -128 to 127)

Integer p = Integer.valueOf(200);  // outside cache range
Integer q = Integer.valueOf(200);  // new object
System.out.println(p == q);        // false -- not cached
```

**3. Boolean.valueOf()**
```java
Boolean t1 = Boolean.valueOf(true);
Boolean t2 = Boolean.valueOf(true);
System.out.println(t1 == t2);  // true -- only two flyweight instances: TRUE and FALSE
```

---

## SOLID Connection

| Principle | How Flyweight Relates |
|-----------|----------------------|
| **SRP** | The flyweight stores only shared state; the context stores only unique state. Separation of concerns. |
| **OCP** | New flyweight types can be added without modifying the factory (add new entries to cache). |
| **LSP** | All flyweight instances are interchangeable through the same interface. |
| **ISP** | Flyweight interface is minimal -- only operations that need intrinsic + extrinsic state. |
| **DIP** | Clients depend on the flyweight interface, not on specific cached instances. |

---

## Flyweight vs Related Patterns

| Pattern | Intent | Key Difference from Flyweight |
|---------|--------|-------------------------------|
| **Flyweight** | Share objects to save memory by extracting common state | Caches shared immutable objects; client passes extrinsic state |
| **Singleton** | Ensure ONE instance of a class | One instance total. Flyweight has MANY shared instances (one per unique intrinsic state) |
| **Prototype** | Clone objects to avoid expensive construction | Creates NEW objects by copying. Flyweight REUSES existing objects |
| **Object Pool** | Reuse expensive objects (DB connections, threads) | Pool objects are MUTABLE and checked out/returned. Flyweight objects are IMMUTABLE and shared simultaneously |
| **Factory** | Encapsulate object creation | FlyweightFactory IS a specialized factory that adds caching |

**Common exam confusion:**
- **Flyweight vs Singleton:** Singleton = exactly 1 instance. Flyweight = 1 instance per unique intrinsic state (could be many). A Flyweight factory might be a Singleton, but the flyweights themselves are not.
- **Flyweight vs Object Pool:** Pool objects are mutable and used by one client at a time (check-out/check-in). Flyweights are immutable and shared by many clients simultaneously.

---

## When to Use / When NOT to Use

**Use Flyweight when:**
- Your application creates a **huge number** of similar objects
- Objects contain **significant duplicated state** that can be extracted and shared
- The shared state is **immutable** (or can be made immutable)
- Memory is a real constraint (mobile apps, games, embedded systems, large-scale text processing)
- The number of **unique states (K) is much smaller** than the number of objects (N)

**Do NOT use when:**
- Objects are mostly unique (little shared state to extract)
- The number of objects is small (overhead of factory/cache not justified)
- Object state is **mutable** and changes frequently (flyweights must be immutable)
- The added complexity of splitting intrinsic/extrinsic state hurts readability without meaningful memory savings
- You need to compare objects by identity (`==`) for non-flyweight reasons

---

## Big Picture

- Flyweight is a **Structural** pattern focused on **memory optimization through sharing**
- The key split: **intrinsic** (shared, immutable, inside flyweight) vs **extrinsic** (unique, outside, passed by client)
- A **FlyweightFactory** acts as a cache -- ensures each unique intrinsic state is stored only once
- Thread safety comes for free because flyweights are **immutable** (no synchronization needed on the flyweight itself; the factory may need synchronization)
- Java uses Flyweight internally: **String pool**, **Integer cache (-128 to 127)**, **Boolean.valueOf()**
- Connected to: **Singleton** (single instance, but different intent), **Factory** (FlyweightFactory is a specialized factory), **Composite** (often uses Flyweight for leaf nodes in tree structures)

---

## Exam Tips (Quick Recall)

1. Flyweight = **share objects** to save memory by separating **intrinsic** (shared) from **extrinsic** (unique) state
2. Intrinsic state is **immutable** and stored inside the flyweight; extrinsic state is passed by the client at operation time
3. The **FlyweightFactory** caches flyweights in a Map and returns existing instances for duplicate requests
4. Memory savings = `(N - K) x intrinsic_size` where N = total objects, K = unique flyweights, K << N
5. Flyweights are **thread-safe** because they are immutable; the factory's cache may need `ConcurrentHashMap` for thread safety
6. **NOT the same as Singleton** (Singleton = 1 total instance; Flyweight = 1 instance per unique intrinsic state)
7. Java built-in examples: `String` pool, `Integer.valueOf()` cache for -128 to 127, `Boolean.valueOf()`

---

## Viva Questions

**Q1: What is the Flyweight pattern?**
A structural pattern that minimizes memory usage by sharing as much data as possible between similar objects. It splits object state into intrinsic (shared, immutable, stored in the flyweight) and extrinsic (unique, stored outside, passed by the client). A FlyweightFactory caches flyweight objects and returns existing ones when the same intrinsic state is requested.

**Q2: What is the difference between intrinsic and extrinsic state?**
Intrinsic state is shared across many objects, immutable, and context-independent. It is stored inside the flyweight. Example: font name, tree texture. Extrinsic state is unique per object, context-dependent, and potentially mutable. It is stored outside and passed to the flyweight when needed. Example: character position, tree coordinates.

**Q3: Why must flyweight objects be immutable?**
Because flyweights are shared by many clients simultaneously. If one client could modify the flyweight's state, all other clients sharing that flyweight would see the change, leading to unpredictable behavior. Immutability guarantees thread safety without synchronization and ensures that sharing is safe.

**Q4: How is Flyweight different from Singleton?**
Singleton ensures exactly ONE instance of a class globally. Flyweight ensures ONE instance per unique intrinsic state -- there can be many flyweight instances (one for each unique combination of shared properties). A Flyweight factory might be a Singleton, but the flyweights themselves are not Singletons.

**Q5: How is Flyweight different from Object Pool?**
Object Pool manages mutable objects that are checked out by one client at a time and returned after use (e.g., database connections). Flyweight manages immutable objects that are shared by many clients simultaneously. Pool objects change state between uses; flyweights never change.

**Q6: How does Java's String pool use Flyweight?**
String literals in Java are automatically interned into a pool. When two string literals have the same content, they reference the same object in the pool (same memory). The `String.intern()` method explicitly adds a string to the pool. This is Flyweight: the string content is intrinsic state, shared across all references. This is why `"hello" == "hello"` is true -- they are the same flyweight object.

**Q7: Why does `Integer.valueOf(127) == Integer.valueOf(127)` return true but `Integer.valueOf(200) == Integer.valueOf(200)` return false?**
Java caches `Integer` objects for values -128 to 127 (Flyweight pattern). `valueOf(127)` returns a cached flyweight instance, so both references point to the same object (`==` is true). For 200, which is outside the cache range, `valueOf` creates new objects each time, so `==` is false. This is a classic Flyweight with a bounded cache.

**Q8: How do you decide what is intrinsic vs extrinsic state?**
Ask two questions: (1) Is this data the same across many objects? If yes, it is a candidate for intrinsic state. (2) Is this data unique per object or dependent on context? If yes, it is extrinsic. The goal is to maximize sharing. Intrinsic state goes into the flyweight; extrinsic state stays with the client and is passed as method parameters.

**Q9: What role does the FlyweightFactory play?**
The FlyweightFactory is the central creation and caching mechanism. It maintains a map from intrinsic state keys to flyweight instances. When a client requests a flyweight, the factory checks the cache. If a matching flyweight exists, it returns the cached instance. Otherwise, it creates a new flyweight, caches it, and returns it. This ensures each unique intrinsic state is stored only once.

**Q10: Can you use Flyweight with mutable extrinsic state?**
Yes. The extrinsic state can be mutable because it is stored outside the flyweight, managed by the client/context. For example, a tree's position (extrinsic) could change if the tree moves, while the tree type flyweight (intrinsic: name, texture, color) remains immutable and shared. The key rule is: the flyweight itself (intrinsic state) must be immutable. The extrinsic state is the client's responsibility.

---

## MCQ Quiz

**1. Flyweight pattern is classified as:**
a) Creational
b) Structural
c) Behavioral
d) Concurrency

<details><summary>Answer</summary>b) Structural</details>

**2. The primary intent of Flyweight is:**
a) Ensure a class has only one instance
b) Minimize memory usage by sharing common state across many objects
c) Convert one interface to another
d) Add responsibilities to an object dynamically

<details><summary>Answer</summary>b) Minimize memory usage by sharing common state across many objects</details>

**3. Intrinsic state in the Flyweight pattern is:**
a) Unique per object and mutable
b) Shared across objects, immutable, stored inside the flyweight
c) Stored in the client
d) Calculated at runtime

<details><summary>Answer</summary>b) Shared across objects, immutable, stored inside the flyweight</details>

**4. Extrinsic state in the Flyweight pattern is:**
a) Shared and immutable
b) Stored inside the flyweight
c) Unique per object, stored outside, passed to the flyweight by the client
d) Never changes

<details><summary>Answer</summary>c) Unique per object, stored outside, passed to the flyweight by the client</details>

**5. In a text editor using Flyweight, which of these is INTRINSIC state?**
a) Character's row position
b) Character's column position
c) Font family, size, and color
d) The character value ('A', 'B', etc.)

<details><summary>Answer</summary>c) Font family, size, and color -- shared by many characters, immutable</details>

**6. In a game forest using Flyweight, which is EXTRINSIC state?**
a) Tree texture data
b) Tree color
c) Tree mesh data
d) Tree x,y position on the map

<details><summary>Answer</summary>d) Tree x,y position -- unique per tree, not shared</details>

**7. The FlyweightFactory's primary responsibility is to:**
a) Create new objects every time
b) Cache flyweight objects and return existing instances for duplicate requests
c) Destroy unused objects
d) Convert interfaces

<details><summary>Answer</summary>b) Cache flyweight objects and return existing instances for duplicate requests</details>

**8. Why must flyweight objects be immutable?**
a) Java requires it
b) To save memory
c) Because they are shared by many clients -- mutation would affect all clients
d) To improve performance

<details><summary>Answer</summary>c) Because they are shared by many clients simultaneously -- mutation would cause unpredictable behavior for all</details>

**9. How is Flyweight different from Singleton?**
a) They are the same pattern
b) Singleton has ONE instance total; Flyweight has ONE instance per unique intrinsic state
c) Flyweight has ONE instance total; Singleton has many
d) Singleton is structural; Flyweight is creational

<details><summary>Answer</summary>b) Singleton = exactly 1 instance. Flyweight = 1 instance per unique intrinsic state (many possible instances)</details>

**10. How is Flyweight different from Object Pool?**
a) They are the same pattern
b) Object Pool objects are mutable and used by one client at a time; Flyweight objects are immutable and shared simultaneously
c) Flyweight objects are mutable; Object Pool objects are immutable
d) Object Pool saves memory; Flyweight does not

<details><summary>Answer</summary>b) Pool = mutable, one client at a time (check-out/return). Flyweight = immutable, many clients share simultaneously</details>

**11. What does `String a = "hello"; String b = "hello"; a == b` return?**
a) false
b) true, because String literals are interned (Flyweight/String pool)
c) Compilation error
d) NullPointerException

<details><summary>Answer</summary>b) true -- String literals are interned into the String pool (Flyweight pattern). Both variables point to the same object.</details>

**12. `Integer.valueOf(100) == Integer.valueOf(100)` is true because:**
a) Java always caches Integers
b) Java caches Integer objects for values -128 to 127 (Flyweight)
c) Autoboxing always creates the same object
d) Integer overrides ==

<details><summary>Answer</summary>b) Java caches Integer objects for -128 to 127. 100 is in this range, so the same cached flyweight is returned.</details>

**13. `Integer.valueOf(200) == Integer.valueOf(200)` returns:**
a) true
b) false, because 200 is outside the Integer cache range (-128 to 127)
c) Compilation error
d) It depends on the JVM

<details><summary>Answer</summary>b) false -- 200 is outside the cache range, so valueOf creates new objects each time</details>

**14. In a Flyweight-based text editor with 100,000 characters and 5 unique styles, how many CharacterStyle objects are created?**
a) 100,000
b) 5
c) 500
d) 50,000

<details><summary>Answer</summary>b) 5 -- one flyweight per unique style, shared by all 100,000 characters</details>

**15. The FlyweightFactory typically uses which data structure internally?**
a) Array
b) LinkedList
c) HashMap or ConcurrentHashMap (key = intrinsic state, value = flyweight)
d) Stack

<details><summary>Answer</summary>c) HashMap or ConcurrentHashMap -- maps intrinsic state keys to cached flyweight instances</details>

**16. For thread-safe Flyweight usage, which part needs synchronization?**
a) The flyweight objects (they are mutable)
b) The factory's cache (if accessed by multiple threads)
c) The extrinsic state
d) Nothing -- Flyweight is always thread-safe

<details><summary>Answer</summary>b) The factory's cache needs synchronization (e.g., ConcurrentHashMap). Flyweight objects themselves are immutable and thread-safe.</details>

**17. Which of these is NOT a valid Flyweight use case?**
a) Sharing font styles in a text editor
b) Sharing tree textures in a game
c) Java's String pool
d) A database connection pool (connections are mutable and checked out)

<details><summary>Answer</summary>d) Database connection pool is Object Pool, not Flyweight -- connections are mutable and used exclusively by one client at a time</details>

**18. If a flyweight's `equals()` and `hashCode()` are not implemented, what happens?**
a) Nothing changes
b) The factory cannot correctly detect duplicate intrinsic states, so it creates new objects instead of reusing -- defeating the purpose
c) The program crashes
d) Memory usage increases by exactly 2x

<details><summary>Answer</summary>b) Without proper equals/hashCode, the factory's HashMap cannot match keys, so it fails to return cached instances and creates duplicates</details>

**19. Flyweight is most useful when:**
a) Each object is completely unique
b) N is large and K is much smaller than N (many objects, few unique states)
c) Objects need to be mutable
d) Memory is unlimited

<details><summary>Answer</summary>b) When N (total objects) is large and K (unique flyweights) is much smaller -- maximizes sharing and memory savings</details>

**20. Which combination of patterns is common in practice?**
a) Flyweight + Adapter
b) Flyweight + Factory (the FlyweightFactory is a specialized factory with caching)
c) Flyweight + Strategy
d) Flyweight + Observer

<details><summary>Answer</summary>b) Flyweight + Factory -- the FlyweightFactory IS a factory that adds caching logic to deduplicate objects</details>

### Self-Scoring Table

| Score | Level |
|-------|-------|
| **18-20** | Flyweight mastered. |
| **14-17** | Good. Review intrinsic vs extrinsic and Java built-in examples. |
| **10-13** | Revisit the text editor and game examples carefully. |
| **Below 10** | Re-read from the beginning. |

---

## Coding Exam Questions

### Problem 1: Implement a Bullet Flyweight for a Shooting Game

A shooting game renders thousands of bullets on screen. Each bullet has a type (Pistol, Rifle, Shotgun) with shared properties (sprite image path, damage, speed) and unique properties (current x,y position, direction angle).

**Task:**
1. Create a `BulletType` flyweight class with intrinsic state
2. Create a `BulletTypeFactory` with caching
3. Create a `Bullet` context class with extrinsic state
4. Demonstrate that 1,000 bullets share only 3 BulletType flyweights

<details><summary>Solution</summary>

```java
import java.util.*;

// Flyweight: intrinsic state (shared, immutable)
final class BulletType {
    private final String name;
    private final String spritePath;
    private final int damage;
    private final double speed;

    BulletType(String name, String spritePath, int damage, double speed) {
        this.name = name;
        this.spritePath = spritePath;
        this.damage = damage;
        this.speed = speed;
    }

    void render(double x, double y, double angle) {
        System.out.printf("[%s] at (%.1f,%.1f) angle=%.0f "
            + "[sprite=%s, dmg=%d, spd=%.1f]%n",
            name, x, y, angle, spritePath, damage, speed);
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BulletType)) return false;
        BulletType b = (BulletType) o;
        return damage == b.damage
            && Double.compare(speed, b.speed) == 0
            && Objects.equals(name, b.name)
            && Objects.equals(spritePath, b.spritePath);
    }

    @Override public int hashCode() {
        return Objects.hash(name, spritePath, damage, speed);
    }
}

// FlyweightFactory
class BulletTypeFactory {
    private final Map<String, BulletType> cache = new HashMap<>();

    BulletType getBulletType(String name, String sprite, int dmg, double spd) {
        String key = name;
        BulletType existing = cache.get(key);
        if (existing != null) return existing;
        BulletType bt = new BulletType(name, sprite, dmg, spd);
        cache.put(key, bt);
        return bt;
    }

    int getCacheSize() { return cache.size(); }
}

// Context: extrinsic state + flyweight reference
class Bullet {
    private double x, y;       // extrinsic, mutable (bullet moves)
    private double angle;       // extrinsic
    private final BulletType type;  // shared flyweight

    Bullet(double x, double y, double angle, BulletType type) {
        this.x = x; this.y = y; this.angle = angle; this.type = type;
    }

    void render() { type.render(x, y, angle); }

    void move(double dt) {
        // simplified movement
        x += Math.cos(Math.toRadians(angle)) * dt;
        y += Math.sin(Math.toRadians(angle)) * dt;
    }
}

// Demo
public class BulletFlyweightDemo {
    public static void main(String[] args) {
        BulletTypeFactory factory = new BulletTypeFactory();
        List<Bullet> bullets = new ArrayList<>();
        Random rnd = new Random(42);

        String[][] defs = {
            {"Pistol",  "pistol_bullet.png",  "25", "300"},
            {"Rifle",   "rifle_bullet.png",   "75", "800"},
            {"Shotgun", "shotgun_pellet.png",  "15", "200"},
        };

        // Create 1,000 bullets
        for (int i = 0; i < 1000; i++) {
            String[] d = defs[rnd.nextInt(defs.length)];
            BulletType type = factory.getBulletType(
                d[0], d[1], Integer.parseInt(d[2]), Double.parseDouble(d[3]));
            double x = rnd.nextDouble() * 800;
            double y = rnd.nextDouble() * 600;
            double angle = rnd.nextDouble() * 360;
            bullets.add(new Bullet(x, y, angle, type));
        }

        // Render first 3
        for (int i = 0; i < 3; i++) bullets.get(i).render();

        System.out.println("\nTotal bullets: " + bullets.size());
        System.out.println("Unique BulletType flyweights: " + factory.getCacheSize());
        // Output: 1000 bullets, only 3 BulletType objects
    }
}
```
</details>

---

### Problem 2: Identify Intrinsic vs Extrinsic State

For each scenario, identify which fields are intrinsic (shared, go into the flyweight) and which are extrinsic (unique, stay outside).

**A: Chess game** -- Each piece has: pieceType (King, Queen, etc.), color (Black/White), image, currentRow, currentCol

**B: Map renderer** -- Each tile has: terrainType (grass, water, mountain), tileTexture, elevation, gridRow, gridCol

**C: Word processor** -- Each word has: content (the string), fontName, fontSize, lineNumber, wordPosition, isUnderlined

<details><summary>Solution</summary>

**A: Chess game**
| Field | Intrinsic or Extrinsic | Reasoning |
|-------|----------------------|-----------|
| pieceType | Intrinsic | Shared: there are many pawns but only one "Pawn" type |
| color | Intrinsic | Part of the piece identity: "White Pawn" is a flyweight |
| image | Intrinsic | Same image for all "White Pawns" |
| currentRow | **Extrinsic** | Unique per piece -- changes when piece moves |
| currentCol | **Extrinsic** | Unique per piece -- changes when piece moves |

Flyweight: `PieceType(type, color, image)` -- at most 12 flyweights (6 piece types x 2 colors)
Context: `Piece(row, col, PieceType)` -- up to 32 pieces sharing 12 flyweights

**B: Map renderer**
| Field | Intrinsic or Extrinsic | Reasoning |
|-------|----------------------|-----------|
| terrainType | Intrinsic | Shared: thousands of grass tiles, few terrain types |
| tileTexture | Intrinsic | Same texture for all tiles of same terrain type |
| elevation | **Extrinsic** | Unique per tile (could vary even within same terrain) |
| gridRow | **Extrinsic** | Unique per tile |
| gridCol | **Extrinsic** | Unique per tile |

Flyweight: `TerrainType(name, texture)` -- maybe 5-10 flyweights
Context: `Tile(row, col, elevation, TerrainType)` -- thousands of tiles sharing few flyweights

**C: Word processor**
| Field | Intrinsic or Extrinsic | Reasoning |
|-------|----------------------|-----------|
| fontName | Intrinsic | Shared: most text uses the same few fonts |
| fontSize | Intrinsic | Shared: typically 2-5 sizes in a document |
| isUnderlined | Intrinsic | Part of the style (shared with same-styled text) |
| content | **Extrinsic** | Unique per word |
| lineNumber | **Extrinsic** | Unique per word position |
| wordPosition | **Extrinsic** | Unique per word position |

Flyweight: `WordStyle(fontName, fontSize, isUnderlined)` -- maybe 5-10 flyweights
Context: `Word(content, line, position, WordStyle)` -- thousands of words sharing few styles
</details>

---

### Problem 3: Refactor to Flyweight

The following code creates a `MapIcon` for every point of interest on a map. Each icon stores the icon image and label style, even though most icons share the same type. Refactor to use Flyweight.

```java
// BAD: Every MapIcon stores its own copy of shared data
class MapIcon {
    private final String category;      // "Restaurant", "Gas Station", etc.
    private final String iconImagePath; // "restaurant.png" -- same for all restaurants
    private final String labelColor;    // "#FF0000" -- same for all restaurants
    private final int iconSize;         // 32 -- same for all restaurants
    private final double latitude;      // unique per icon
    private final double longitude;     // unique per icon
    private final String name;          // unique per icon ("McDonald's", "Burger King")

    MapIcon(String category, String iconImagePath, String labelColor,
            int iconSize, double lat, double lon, String name) {
        this.category = category;
        this.iconImagePath = iconImagePath;
        this.labelColor = labelColor;
        this.iconSize = iconSize;
        this.latitude = lat;
        this.longitude = lon;
        this.name = name;
    }

    void render() {
        System.out.println(name + " [" + category + "] at ("
            + latitude + "," + longitude + ") icon=" + iconImagePath);
    }
}

// Usage: 10,000 icons, most share the same category properties
List<MapIcon> icons = new ArrayList<>();
for (...) {
    icons.add(new MapIcon("Restaurant", "restaurant.png", "#FF0000",
        32, lat, lon, name));  // duplicated shared data every time
}
```

**Task:** Refactor using Flyweight to share category properties across all icons of the same type.

<details><summary>Solution</summary>

```java
import java.util.*;

// Flyweight: intrinsic state (shared per category)
final class IconType {
    private final String category;
    private final String iconImagePath;
    private final String labelColor;
    private final int iconSize;

    IconType(String category, String iconImagePath,
             String labelColor, int iconSize) {
        this.category = category;
        this.iconImagePath = iconImagePath;
        this.labelColor = labelColor;
        this.iconSize = iconSize;
    }

    void render(double lat, double lon, String name) {
        System.out.printf("%s [%s] at (%.4f,%.4f) icon=%s color=%s size=%d%n",
            name, category, lat, lon, iconImagePath, labelColor, iconSize);
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof IconType)) return false;
        IconType t = (IconType) o;
        return iconSize == t.iconSize
            && Objects.equals(category, t.category)
            && Objects.equals(iconImagePath, t.iconImagePath)
            && Objects.equals(labelColor, t.labelColor);
    }

    @Override public int hashCode() {
        return Objects.hash(category, iconImagePath, labelColor, iconSize);
    }
}

// FlyweightFactory
class IconTypeFactory {
    private final Map<String, IconType> cache = new HashMap<>();

    IconType getIconType(String category, String imagePath,
                         String labelColor, int size) {
        String key = category;  // one type per category
        IconType existing = cache.get(key);
        if (existing != null) return existing;
        IconType newType = new IconType(category, imagePath, labelColor, size);
        cache.put(key, newType);
        return newType;
    }

    int getCacheSize() { return cache.size(); }
}

// Context: extrinsic state + flyweight reference
class MapIcon {
    private final double latitude;    // extrinsic
    private final double longitude;   // extrinsic
    private final String name;        // extrinsic
    private final IconType type;      // shared flyweight

    MapIcon(double lat, double lon, String name, IconType type) {
        this.latitude = lat;
        this.longitude = lon;
        this.name = name;
        this.type = type;
    }

    void render() {
        type.render(latitude, longitude, name);
    }
}

// Demo
public class MapFlyweightDemo {
    public static void main(String[] args) {
        IconTypeFactory factory = new IconTypeFactory();
        List<MapIcon> icons = new ArrayList<>();

        // Define category types
        String[][] categories = {
            {"Restaurant",  "restaurant.png",  "#FF0000", "32"},
            {"Gas Station", "gas_station.png",  "#0000FF", "28"},
            {"Hospital",    "hospital.png",     "#00FF00", "36"},
        };

        // Create 10,000 icons
        Random rnd = new Random(42);
        String[] names = {"Place A", "Place B", "Place C", "Place D", "Place E"};
        for (int i = 0; i < 10_000; i++) {
            String[] cat = categories[rnd.nextInt(categories.length)];
            IconType type = factory.getIconType(
                cat[0], cat[1], cat[2], Integer.parseInt(cat[3]));
            double lat = 40.0 + rnd.nextDouble();
            double lon = -74.0 + rnd.nextDouble();
            String name = names[rnd.nextInt(names.length)] + " #" + i;
            icons.add(new MapIcon(lat, lon, name, type));
        }

        // Render sample
        for (int i = 0; i < 3; i++) icons.get(i).render();

        System.out.println("\nTotal icons: " + icons.size());
        System.out.println("Unique IconType flyweights: " + factory.getCacheSize());
        // 10,000 icons sharing only 3 IconType flyweights
    }
}
```

**Key changes from BAD to GOOD:**
- **Before:** Each `MapIcon` stored category, iconImagePath, labelColor, iconSize (duplicated 10,000 times)
- **After:** Shared data extracted into `IconType` flyweight (3 instances). Each `MapIcon` holds only a reference to the flyweight plus its unique lat/lon/name
- **Memory saved:** ~10,000 x (category string + path string + color string + int) reduced to 3 flyweight objects
</details>
