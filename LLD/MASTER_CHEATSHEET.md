# LLD Master Cheatsheet

> One-page quick-revision. All concepts, tiny examples, exam-ready.

**Sections:** [OOP](#oop) · [Immutable](#immutable-classes) · [SOLID](#solid-principles) · [Design Patterns](#design-patterns) · [UML](#uml-diagrams)

---

## OOP

### The 4 Pillars

| Pillar | One-liner | Tiny example |
|--------|-----------|--------------|
| **Encapsulation** | Bundle data + methods, hide internals | `private` field + `public` getter |
| **Abstraction** | Expose WHAT, hide HOW | `interface Shape { double area(); }` |
| **Inheritance** | Child gets parent's stuff (is-a) | `class Dog extends Animal` |
| **Polymorphism** | One interface, many forms | `Animal a = new Dog(); a.sound();` |

### Encapsulation
```java
class Account {
    private double balance;               // hidden
    public void deposit(double x) {        // controlled access
        if (x > 0) balance += x;
    }
    public double getBalance() { return balance; }
}
```
**Why:** No one can set `balance = -5000` directly. Validation lives in one place.

### Abstraction
- **Abstract class** — can have state + concrete methods. Single inheritance.
- **Interface** — pure contract (default methods allowed since Java 8). Multiple inheritance.

```java
abstract class Shape { abstract double area(); }   // can't instantiate
interface Drawable { void draw(); }                // pure contract
```

### Inheritance
```java
class Animal { void eat() { ... } }
class Dog extends Animal {
    Dog() { super(); }         // call parent ctor
    void bark() { ... }
}
```
**Rules:**
- Subclass can't **narrow** access (`public` → `private` = compile error)
- Constructor is NOT inherited; you call it via `super(...)`
- Java = single inheritance (classes); multiple inheritance only via interfaces

### Polymorphism

| Type | When resolved | Example |
|------|---------------|---------|
| **Compile-time (Overloading)** | At compile | `add(int, int)` vs `add(double, double)` |
| **Runtime (Overriding)** | At runtime | `Animal a = new Dog(); a.sound();` |

```java
class Animal { void sound() { System.out.println("..."); } }
class Dog extends Animal { void sound() { System.out.println("Woof"); } }

Animal a = new Dog();
a.sound();   // "Woof" ← Dog's version wins (runtime dispatch)
```

### Access Modifiers

| Modifier | Class | Package | Subclass (other pkg) | World |
|----------|:-:|:-:|:-:|:-:|
| `private` | ✓ | ✗ | ✗ | ✗ |
| *default* | ✓ | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ | ✓ |

### `this` vs `super`
- `this.x` = current object's `x`
- `this(...)` = call another constructor of same class
- `super.x` = parent's `x`
- `super(...)` = call parent's constructor

### Upcasting vs Downcasting
```java
Dog d = new Dog();
Animal a = d;              // UPCAST — always safe
Dog d2 = (Dog) a;          // DOWNCAST — may throw ClassCastException
if (a instanceof Dog d3) { ... }   // safe check
```

### Abstract vs Interface

| | Abstract class | Interface |
|---|----------------|-----------|
| State (fields) | ✓ | only `public static final` |
| Constructor | ✓ | ✗ |
| Multiple inheritance | ✗ | ✓ |
| Use when | Shared state + behavior | Pure contract |

---

## Immutable Classes

### 6-Step Checklist

1. Mark class `final` → can't be subclassed
2. All fields `private final`
3. No setters
4. **Defensive copy** mutable params in constructor
5. **Defensive copy OR unmodifiable** in getters
6. Validate in constructor, throw on invalid state

### Example
```java
public final class MovieTicket {
    private final String movie;
    private final LocalDate date;            // LocalDate = already immutable ✓
    private final List<String> seats;        // List = MUTABLE ⚠

    public MovieTicket(String movie, LocalDate date, List<String> seats) {
        if (movie == null || seats == null) throw new IllegalArgumentException();
        this.movie = movie;
        this.date = date;
        this.seats = List.copyOf(seats);     // defensive COPY in
    }

    public String getMovie() { return movie; }
    public LocalDate getDate() { return date; }
    public List<String> getSeats() { return seats; }   // already unmodifiable
}
```

### Defensive Copy Cheat

| Situation | Solution |
|-----------|----------|
| Input mutable collection | `List.copyOf(input)` (Java 10+) or `new ArrayList<>(input)` |
| Output collection | `Collections.unmodifiableList(list)` or `List.copyOf` |
| Mutable reference type (e.g., `Date`) | `new Date(d.getTime())` |

### Why `final` on class?
So nobody can create `class MaliciousTicket extends MovieTicket` that OVERRIDES `getSeats()` to return the raw mutable list.

### Benefits of Immutability
- **Thread-safe** for free
- Safe as **Map/Set keys**
- No defensive copying needed by callers
- Easier to reason about (no surprise state changes)

---

## SOLID Principles

### S — Single Responsibility
> A class should have ONE reason to change.

**Smell:** Util class, Monster method, Class doing 3 things at once.

```java
// BAD: Employee does data + tax + persistence
class Employee { String name; void save(); void calculateTax(); }

// GOOD:
class Employee { String name; }                // data
class TaxCalculator { double tax(Employee e); }// tax
class EmployeeRepo { void save(Employee e); } // persistence
```

### O — Open/Closed
> Open for extension, closed for modification.

**Smell:** `if (type == "X") ... else if ("Y") ...` that grows when adding a type.

```java
// BAD
class AreaCalc { double area(String shape) { if (shape.equals("circle")) ... } }

// GOOD — add new shape without touching AreaCalc
interface Shape { double area(); }
class Circle implements Shape { ... }
class Square implements Shape { ... }
class AreaCalc { double area(Shape s) { return s.area(); } }
```

### L — Liskov Substitution
> Subclass should be substitutable for parent without breaking behavior.

**Smell:** Subclass throws `UnsupportedOperationException`, Rectangle-Square problem.

```java
// BAD: Kiwi extends Bird { void fly() { throw new UOE(); } }
// Code like makeFly(Bird b) crashes for Kiwi

// GOOD: separate fly ability
interface Bird {}
interface FlyingBird extends Bird { void fly(); }
class Sparrow implements FlyingBird { ... }
class Kiwi implements Bird { }                 // doesn't promise to fly
```

### I — Interface Segregation
> Don't force clients to depend on methods they don't use.

**Smell:** A "fat" interface where implementations throw on unused methods.

```java
// BAD
interface Machine { void print(); void scan(); void fax(); }
class OldPrinter implements Machine { /* forced to implement scan() and fax() */ }

// GOOD — thin, role-specific interfaces
interface Printer { void print(); }
interface Scanner { void scan(); }
class OldPrinter implements Printer { ... }
class MFP implements Printer, Scanner { ... }
```

### D — Dependency Inversion
> Depend on **abstractions**, not concretions. High-level modules don't depend on low-level modules.

**Smell:** `new ConcreteThing()` in a high-level class.

```java
// BAD
class OrderService {
    void place() {
        SqlDatabase db = new SqlDatabase();   // tightly coupled
        db.save(...);
    }
}

// GOOD — inject the abstraction
class OrderService {
    private final Database db;
    OrderService(Database db) { this.db = db; }   // inject
}
interface Database { void save(Object o); }
```

**DIP vs DI:** DIP = principle (depend on abstraction). Dependency Injection = technique (constructor/setter/interface injection).

---

## Design Patterns

### Categories

| Category | Patterns | Purpose |
|----------|----------|---------|
| **Creational** | Singleton, Factory Method, Abstract Factory, Builder, Prototype | How objects are created |
| **Structural** | Adapter, Decorator, Flyweight, Proxy | How objects are composed |
| **Behavioral** | Observer, Strategy | How objects communicate |

---

### Singleton
> Exactly one instance + global access point.

```java
public class Logger {
    private static volatile Logger instance;
    private Logger() {}

    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) instance = new Logger();
            }
        }
        return instance;
    }
}
```

**Key points:**
- `private` constructor → prevent `new`
- `volatile` → prevents instruction reordering in DCL
- **Holder idiom** (best): static inner class holds instance, JVM guarantees thread-safe init
- **Enum singleton** = safest (reflection + serialization proof)

**Use cases:** Logger, Config, Connection Pool, Cache.

---

### Factory Method
> Subclass decides which concrete object to create.

```java
abstract class BurgerFactory {
    abstract Burger create();                    // factory method
    public Burger deliver() {                    // fixed algorithm
        Burger b = create();
        b.wrap();
        return b;
    }
}
class VegFactory extends BurgerFactory { Burger create() { return new VegBurger(); } }
class NonVegFactory extends BurgerFactory { Burger create() { return new ChickenBurger(); } }
```

**Simple Factory** (NOT a GoF pattern) — just a static method with switch:
```java
class BurgerFactory {
    static Burger create(String type) {
        return switch (type) { case "veg" -> new VegBurger(); ... };
    }
}
```

---

### Abstract Factory
> Create families of related products without specifying concrete classes.

```java
interface UIFactory {
    Button createButton();
    Checkbox createCheckbox();
}
class WindowsFactory implements UIFactory { ... creates WindowsButton, WindowsCheckbox }
class MacFactory implements UIFactory { ... creates MacButton, MacCheckbox }

// Swap the factory → get a themed product family
UIFactory f = isMac ? new MacFactory() : new WindowsFactory();
Button b = f.createButton();
```

**Factory Method vs Abstract Factory:** Factory Method = 1 product. Abstract Factory = **family** of related products.

---

### Builder
> Build complex immutable object step-by-step.

```java
HttpRequest req = new HttpRequest.Builder()
    .url("https://api.com")
    .method("POST")
    .header("Auth", "Bearer xyz")
    .timeout(30)
    .build();
```
**Structure:**
- `private` constructor on main class
- Nested `static Builder` class with chainable `withXxx()` methods (return `this`)
- `build()` validates + returns final object

**Use when:** 4+ params, some optional. Replaces telescoping constructors.

---

### Prototype
> Clone an existing object instead of constructing from scratch.

```java
class NPC implements Cloneable {
    String name; int hp; int atk;

    public NPC(NPC other) {           // copy constructor
        this.name = other.name; this.hp = other.hp; this.atk = other.atk;
    }
    public NPC clone() { return new NPC(this); }
}

NPC template = new NPC("Alien", 100, 10);   // expensive creation — done ONCE
NPC copy1 = template.clone();                // cheap
copy1.hp = 50;                               // customize
```

**Shallow vs Deep clone:**
- Shallow: references shared (nested objects still point to original)
- Deep: recursively clone nested objects too

---

### Adapter
> Convert one interface to another the client expects.

```java
// Client expects IReports (wants JSON)
interface IReports { String getJsonData(String d); }

// Adaptee — existing class with incompatible interface
class XmlProvider { String getXml(String d) { return "<user>..</user>"; } }

// Adapter — wraps adaptee, implements Target
class XmlToJsonAdapter implements IReports {
    private XmlProvider xml;
    XmlToJsonAdapter(XmlProvider x) { this.xml = x; }
    public String getJsonData(String d) {
        return convertXmlToJson(xml.getXml(d));
    }
}
```

**Think:** Power plug adapter. Your laptop (client) expects round pins (Target), the wall has flat pins (Adaptee), the adapter in between translates.

---

### Decorator
> Wrap object to add behavior — same interface, stackable.

```java
interface Character { String getAbilities(); }
class Mario implements Character { public String getAbilities() { return "Mario"; } }

abstract class PowerUp implements Character {
    protected Character inner;
    PowerUp(Character c) { this.inner = c; }
}

class GunPowerUp extends PowerUp {
    GunPowerUp(Character c) { super(c); }
    public String getAbilities() { return inner.getAbilities() + " + Gun"; }
}

Character mario = new GunPowerUp(new Mario());   // stack!
mario = new StarPowerUp(mario);                   // stack more!
```

**Key insight:** Each decorator HAS-A reference to the thing it wraps, then delegates + adds. Calls propagate recursively inward, strings unwind outward.

**Decorator vs Adapter:** Decorator keeps same interface (adds behavior). Adapter changes interface (bridges mismatch).

---

### Flyweight
> Share common state to reduce memory.

```java
// Split into intrinsic (shared) vs extrinsic (unique)
class CharStyle {                         // intrinsic — shared
    final String font; final int size; final String color;
}

class Character {                          // extrinsic — unique per instance
    CharStyle style;                       // reference to shared flyweight
    int row, col;                          // unique position
}

class StyleFactory {                       // flyweight factory
    static Map<String, CharStyle> cache = new HashMap<>();
    static CharStyle get(String font, int size, String color) {
        String key = font + size + color;
        return cache.computeIfAbsent(key, k -> new CharStyle(font, size, color));
    }
}
```

**Massive memory saving:** 1M chars → just 3-4 CharStyle objects shared.

---

### Proxy
> A surrogate that controls access to the real object.

```java
interface Image { void display(); }

class RealImage implements Image {
    RealImage(String f) { /* expensive load */ }
    public void display() { ... }
}

// Virtual Proxy — lazy load
class ImageProxy implements Image {
    private RealImage real; private String file;
    ImageProxy(String f) { this.file = f; }
    public void display() {
        if (real == null) real = new RealImage(file);   // load on first use
        real.display();
    }
}
```

**Types:**
- **Virtual proxy** — lazy init
- **Protection proxy** — auth check
- **Remote proxy** — RMI / network
- **Smart proxy** — logging / caching

**Proxy vs Decorator:** Same interface. Proxy CONTROLS access. Decorator ADDS behavior.

---

### Observer
> When subject changes, all observers are auto-notified.

```java
interface Observer { void update(String msg); }

class Channel {                            // Subject / Observable
    List<Observer> subs = new ArrayList<>();
    void subscribe(Observer o) { subs.add(o); }
    void unsubscribe(Observer o) { subs.remove(o); }
    void upload(String video) {
        for (Observer o : subs) o.update(video);   // notify all
    }
}

class User implements Observer {
    String name;
    public void update(String msg) { System.out.println(name + " got: " + msg); }
}
```

**Use cases:** Event buses, UI bindings, pub-sub, YouTube notifications.

---

### Strategy
> Swap algorithm at runtime.

```java
interface SortStrategy { void sort(int[] arr); }

class QuickSort implements SortStrategy { public void sort(int[] a) { ... } }
class MergeSort implements SortStrategy { public void sort(int[] a) { ... } }

class Sorter {                             // Context
    private SortStrategy strategy;
    Sorter(SortStrategy s) { this.strategy = s; }
    void setStrategy(SortStrategy s) { this.strategy = s; }   // hot-swap!
    void doSort(int[] a) { strategy.sort(a); }
}

Sorter s = new Sorter(new QuickSort());
s.doSort(data);
s.setStrategy(new MergeSort());            // change algorithm at runtime
```

**Strategy vs State:** Strategy = client picks algorithm. State = object's internal state drives behavior.

---

### Pattern Cheat Table

| Pattern | Category | Mechanism | Use when |
|---------|----------|-----------|----------|
| Singleton | Creational | Static instance | Exactly one instance needed |
| Factory Method | Creational | Inheritance | Subclass picks concrete product |
| Abstract Factory | Creational | Composition | Product families (themes) |
| Builder | Creational | Method chain | Complex construction |
| Prototype | Creational | Clone | Avoid expensive re-creation |
| Adapter | Structural | Wrapping | Bridge incompatible interfaces |
| Decorator | Structural | Wrapping (same iface) | Stackable runtime behavior |
| Flyweight | Structural | Shared objects | Memory optimization |
| Proxy | Structural | Wrapping (same iface) | Control access / lazy load |
| Observer | Behavioral | Notification | 1-to-many event notification |
| Strategy | Behavioral | Composition | Swappable algorithms |

### Common Confusions

| This vs That | The difference |
|--------------|----------------|
| **Factory Method vs Abstract Factory** | FM = 1 product. AF = family of related products |
| **Simple Factory vs Factory Method** | SF = static switch (not GoF). FM = polymorphic subclasses |
| **Adapter vs Decorator** | Adapter changes interface. Decorator keeps interface, adds behavior |
| **Proxy vs Decorator** | Proxy controls access. Decorator adds behavior |
| **Strategy vs State** | Strategy = client picks. State = object's internal state decides |
| **Builder vs Factory** | Factory = one-shot creation. Builder = step-by-step construction |

---

## UML Diagrams

### Class Diagram Symbols

| Relation | Arrow | Meaning | Example |
|----------|-------|---------|---------|
| **Inheritance** (extends) | `─▷` (hollow triangle) | is-a | `Dog ─▷ Animal` |
| **Implementation** (implements) | `-- ▷` (dashed + hollow triangle) | realizes | `ArrayList -- ▷ List` |
| **Association** | `───` (solid line) | knows about | `Student ─── Course` |
| **Aggregation** | `─◇` (hollow diamond) | has-a (weak, shared) | `Team ◇─ Player` (player exists without team) |
| **Composition** | `─◆` (filled diamond) | has-a (strong, owns) | `House ◆─ Room` (room dies with house) |
| **Dependency** | `-- ▶` (dashed arrow) | uses temporarily | Method parameter |

### Quick Memory Aid
- **◇ Hollow diamond = Aggregation** → weak "has", parts can exist alone
- **◆ Filled diamond = Composition** → strong "has", parts die with whole
- **▷ Hollow triangle = Inheritance / Implementation**

### Visibility Prefix

| Symbol | Meaning |
|--------|---------|
| `+` | public |
| `-` | private |
| `#` | protected |
| `~` | package/default |

### Example UML → Code

```
+-------------------+
|      Animal       |   ← abstract class (italic name)
+-------------------+
| - name: String    |
+-------------------+
| + eat(): void     |
| + sound(): void   |   ← abstract (italic)
+-------------------+
         △
         │  (inheritance)
+-------------------+
|        Dog        |
+-------------------+
| + sound(): void   |
+-------------------+
```

```java
abstract class Animal {
    private String name;
    public void eat() { ... }
    public abstract void sound();
}
class Dog extends Animal {
    public void sound() { ... }
}
```

### Multiplicity

| Notation | Meaning |
|----------|---------|
| `1` | exactly one |
| `0..1` | zero or one (optional) |
| `*` or `0..*` | zero or more |
| `1..*` | one or more |
| `n..m` | range |

```
Student ────1───*──── Course      (one student → many courses)
```

---

## Final Exam Tips

1. **OOP questions** — know the difference between compile-time (overloading) and runtime (overriding) polymorphism cold.
2. **SOLID** — be able to IDENTIFY the violated principle from a code snippet.
3. **Design Patterns** — know the INTENT (one-line purpose) + ROLES + when to use.
4. **UML** — hollow diamond = aggregation, filled = composition. Don't swap.
5. **Immutability** — all 6 steps; don't forget `final` on class + defensive copy.
6. **Code reading** — trace execution on paper for decorator/observer questions.
7. **Tricky phrasings** — "Simple Factory" is NOT a GoF pattern. "Dependency Injection" is a technique, DIP is the principle.

Good luck. 🚀
