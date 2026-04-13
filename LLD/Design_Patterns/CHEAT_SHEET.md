# LLD Exam Cheat Sheet
> Last-minute revision — all 11 patterns + OOP + Immutable + SOLID

---

## OOP — 4 Pillars

| Pillar | One-liner | Key keyword |
|--------|-----------|-------------|
| **Encapsulation** | Bundle data + methods; restrict direct access | `private` fields, public methods |
| **Abstraction** | Hide complexity, expose only what's needed | `abstract`, `interface` |
| **Inheritance** | Child reuses parent code; IS-A relationship | `extends`, `super` |
| **Polymorphism** | One interface, many forms | Override (runtime), Overload (compile-time) |

### Access Modifiers
| Modifier | Same Class | Same Package | Subclass (diff pkg) | Everywhere |
|----------|:---:|:---:|:---:|:---:|
| `private` | ✓ | ✗ | ✗ | ✗ |
| default | ✓ | ✓ | ✗ | ✗ |
| `protected` | ✓ | ✓ | ✓ | ✗ |
| `public` | ✓ | ✓ | ✓ | ✓ |

### Critical Rules
- **Overriding:** same name+params, can widen access, can return subtype (covariant), cannot throw new checked exceptions
- **Hiding:** static methods — reference type determines which runs (NOT runtime type)
- **`super()`** must be first line of constructor if explicit
- `abstract class` → can have state, constructors, concrete methods. `interface` → no instance fields
- Java: single class inheritance, multiple interface implementation
- Constructor chaining: `this()` calls another constructor in same class (must be first line)
- `final` class = not extendable. `final` method = not overridable. `final` field = assigned once.

---

## Immutable Classes — 6-Step Checklist

```java
public final class Ticket {                          // 1. final class
    private final String movie;                      // 2. private final fields
    private final List<String> seats;

    public Ticket(String movie, List<String> seats) {
        this.movie = movie;
        this.seats = List.copyOf(seats);             // 4. defensive copy IN
    }

    public String getMovie() { return movie; }
    public List<String> getSeats() {                 // 5. unmodifiable view OUT
        return Collections.unmodifiableList(seats);
    }
    // 3. no setters, 6. validate in constructor
}
```

**Rules:**
- No setters (rule 3)
- `List.copyOf()` = independent copy (safe). `Collections.unmodifiableList()` = view (original still mutable externally)
- Already-immutable types (`String`, `LocalDate`, `Integer`) don't need defensive copy
- `final` on class prevents subclass from adding mutable state
- Thread-safe by default

---

## SOLID — 5 Principles

| Principle | Mnemonic | Violation Sign | Fix |
|-----------|----------|----------------|-----|
| **S**RP | One class = one reason to change | Class does 5 unrelated things | Extract separate classes |
| **O**CP | Open for extension, closed for modification | `if-else` chain grows for new types | Add new subclass/impl |
| **L**SP | Subclass must be fully substitutable | `throws UnsupportedOperationException` in override | Redesign hierarchy |
| **I**SP | No class forced to depend on unused methods | "fat interface" with 10 methods | Split into small interfaces |
| **D**IP | Depend on abstractions, not concretions | `new ConcreteService()` inside class | Inject via constructor |

### Quick Test:
- **SRP:** "How many reasons would cause this class to change?" > 1 → violation
- **OCP:** "Adding feature X requires editing existing class?" → violation
- **LSP:** "Can I pass a subtype where parent is expected, without changing behavior?" No → violation
- **DIP:** "Does high-level class `new` a concrete low-level class?" Yes → violation

---

## Design Patterns Quick Reference

### Creational
```
Singleton  → private constructor + static instance
Factory    → abstract createProduct() overridden by subclasses
Abs.Factory→ interface for creating FAMILIES of products
Builder    → fluent withX().withY().build() for complex objects
Prototype  → clone() instead of new, avoid expensive setup
```

### Structural
```
Adapter    → wraps Adaptee, implements Target interface (XML→JSON)
Decorator  → wraps Component, implements same interface, adds behavior
Flyweight  → share intrinsic state; context holds extrinsic state
Proxy      → same interface, controls access (auth / lazy load)
```

### Behavioral
```
Observer   → Subject notifies Observers on state change (pub/sub)
Strategy   → context HAS-A strategy; swap algorithm at runtime
```

---

## Pattern Code Snapshots

### Singleton (Holder idiom — BEST)
```java
public class Logger {
    private Logger() {}
    private static class Holder { static final Logger I = new Logger(); }
    public static Logger getInstance() { return Holder.I; }
}
```
> DCL needs `volatile`. Enum is reflection+serialization safe. Holder = lazy+thread-safe.

### Factory Method
```java
interface BurgerFactory { Burger createBurger(String type); }
class SinghBurger implements BurgerFactory { ... }  // regular buns
class KingBurger  implements BurgerFactory { ... }  // wheat buns
// Client picks factory; algorithm unchanged
```
> Simple Factory = static method + switch (NOT GoF). Factory Method = base+override.

### Abstract Factory
```java
interface MealFactory {
    Burger createBurger(String type);
    GarlicBread createGarlicBread(String type);
}
// SinghFactory and KingFactory each produce a consistent FAMILY
```

### Builder
```java
HttpRequest req = new HttpRequest.HttpRequestBuilder()
    .withUrl("https://api.example.com")
    .withMethod("POST")
    .withTimeout(30)
    .build();
```
> Builder inner class is `static`. Each `with*()` returns `this`. `build()` validates.

### Prototype
```java
NPC template = new NPC("Alien", 30, 5, 2);  // expensive once
NPC clone = (NPC) template.clone();           // cheap many times
clone.setName("Powered Alien");
```
> Copy constructor + `clone()` interface. Registry maps keys to templates.

### Adapter
```java
class XmlToJsonAdapter implements IReports {   // Target
    private XmlDataProvider xml;               // Adaptee
    public String getJsonData(String data) {   // converts XML→JSON
        return convertXmlToJson(xml.getXmlData(data));
    }
}
```
> Object Adapter = composition (preferred). Class Adapter = inheritance (limited by single inheritance).

### Decorator
```java
Character mario = new StarPowerUp(new GunPowerUp(new Mario()));
// "Mario with Gun with Star Power"
// inner-out: Mario → +Gun → +Star
```
> IS-A + HAS-A same interface. Order matters. No subclass explosion. Java I/O = classic example.

### Flyweight
```java
// Intrinsic (shared): color, texture, material → AsteroidFlyweight
// Extrinsic (unique): posX, posY, velX, velY  → AsteroidContext
AsteroidFlyweight fw = AsteroidFactory.getAsteroid("Red","Rocky","Iron",...);
new AsteroidContext(fw, posX, posY, velX, velY);
// 1M asteroids → only 3 flyweight objects
```

### Proxy
```java
// Protection:
class DocProxy implements IDocReader {
    public void unlock(String f, String p) {
        if (!user.isPremium) { deny(); return; }
        real.unlock(f, p);
    }
}
// Virtual:
class ImageProxy implements IImage {
    public void display() {
        if (real == null) real = new RealImage(file); // lazy
        real.display();
    }
}
```

### Observer
```java
channel.subscribe(varun);
channel.subscribe(tarun);
channel.uploadVideo("Tutorial");  // notifies both
channel.unsubscribe(varun);
channel.uploadVideo("Part 2");    // only tarun notified
```
> Push = subject sends data. Pull = observer fetches from subject. Unsubscribe to avoid memory leaks.

### Strategy
```java
Robot r = new CompanionRobot(new NormalWalk(), new NormalTalk(), new NoFly());
// walkBehavior.walk() — delegates to injected strategy
// hot-swap: r.setWalkBehavior(new SwimWalk());
```
> Context HAS-A Strategy. vs Template Method (inheritance, fixed skeleton). vs State (object-driven transitions).

---

## Critical Confusions — Exam Traps

| Confusion | Pattern A | Pattern B | Key Difference |
|-----------|-----------|-----------|----------------|
| Adapter vs Decorator | Adapter | Decorator | Adapter **changes interface**; Decorator **same interface + adds behavior** |
| Proxy vs Decorator | Proxy | Decorator | Proxy **controls access**; Decorator **adds behavior** |
| Strategy vs State | Strategy | State | Strategy: **client picks**; State: **object changes itself** |
| Strategy vs Template Method | Strategy | Template Method | Strategy: **whole algo swapped (composition)**; TM: **steps overridden (inheritance)** |
| Factory vs Singleton | Factory | Singleton | Factory: **creates new objects**; Singleton: **one instance** |
| Simple Factory vs Factory Method | Technique | GoF Pattern | SF: static switch; FM: base+override, OCP compliant |
| Flyweight vs Singleton | Flyweight | Singleton | Flyweight: **N shared instances (one per type)**; Singleton: **exactly 1** |
| Builder vs Prototype | Builder | Prototype | Builder: **step-by-step construction**; Prototype: **clone existing** |

---

## Thread Safety Quick Reference (Singleton)

| Approach | Lazy? | Thread-Safe? | Reflection-Safe? |
|----------|:-----:|:------------:|:----------------:|
| Eager init | ✗ | ✓ | ✗ |
| Lazy (no sync) | ✓ | **✗** | ✗ |
| Synchronized method | ✓ | ✓ | ✗ |
| DCL **no** volatile | ✓ | **✗** | ✗ |
| DCL **with** volatile | ✓ | ✓ | ✗ |
| **Holder idiom** | ✓ | ✓ | ✗ |
| **Enum** | ✗ | ✓ | **✓** |

> `volatile` does 2 things: **visibility** (no CPU cache) + **ordering** (no reorder).
> DCL works since **Java 5**.

---

## Pattern → SOLID Connection

| Pattern | Primary SOLID |
|---------|--------------|
| Factory Method | OCP + DIP |
| Strategy | OCP + SRP + DIP |
| Observer | OCP (add observers without changing subject) |
| Decorator | OCP + SRP |
| Adapter | OCP (new adapters without changing client) |
| Singleton | Violates DIP (global state, concrete dependency) |
| Builder | SRP (separate construction from representation) |
| Prototype | OCP (new types via registration, not modification) |

---

## Pattern Identification Triggers

| If you see... | Think... |
|---------------|----------|
| Only ONE instance needed | Singleton |
| `new ConcreteType()` scattered everywhere | Simple Factory / Factory Method |
| Create platform-specific families (Win/Mac buttons) | Abstract Factory |
| 8-arg constructor, optional fields | Builder |
| Expensive init, many similar variants | Prototype |
| Old API, new interface needed | Adapter |
| Stack behaviors at runtime, avoid subclass explosion | Decorator |
| 1M objects with shared properties | Flyweight |
| Same interface + control access / lazy load | Proxy |
| "Notify all subscribers when state changes" | Observer |
| Multiple algorithms for same task, swap at runtime | Strategy |
| Fixed algorithm skeleton, vary specific steps | Template Method |

---

## Coder Army Lecture Map

| Pattern | Lecture | Theme |
|---------|---------|-------|
| Strategy | 08 | Robots (walk/talk/fly) |
| Factory Method | 09 | Burgers (SinghBurger/KingBurger) |
| Abstract Factory | 09 | Burgers + GarlicBread families |
| Singleton | 10 | SimpleSingleton, DCL |
| Observer | 12 | YouTube channel subscriptions |
| Decorator | 13 | Mario power-ups |
| Adapter | 16 | XML→JSON converter |
| Proxy | 21 | PDF unlock (protection) + Image (virtual) |
| Builder | 28 | HttpRequest builder |
| Flyweight | 30 | Space game asteroids |
| Prototype | 36 | NPC cloning |

---

## Last 10 Minutes Revision

1. `private` constructor = Singleton
2. Simple Factory = NOT GoF. Factory Method = IS GoF (base class + override)
3. DCL needs `volatile` for 2 reasons: visibility + ordering
4. Holder idiom = lazy + thread-safe, no `volatile`/`synchronized`
5. Adapter changes interface. Decorator keeps interface.
6. Proxy controls access. Decorator adds behavior. Both same interface.
7. Strategy = composition (HAS-A). Template Method = inheritance (IS-A).
8. Flyweight: intrinsic (shared, immutable) vs extrinsic (unique, passed as param)
9. Observer: unsubscribe to avoid memory leaks; `CopyOnWriteArrayList` for concurrent modification
10. Builder: nested static class, returns `this` for chaining, `build()` validates
11. Prototype: clone is cheap; original construction is expensive
12. Abstract Factory = Factory of Factories creating consistent product families
