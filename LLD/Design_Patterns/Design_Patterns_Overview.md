# Design Patterns Overview

**What are design patterns?** Reusable solutions to commonly occurring software design problems. They are templates — not code — that describe how to solve a problem in a given context.

**Origin:** GoF (Gang of Four) — "Design Patterns: Elements of Reusable Object-Oriented Software" (1994). 23 patterns organized into 3 categories.

---

## The 11 Patterns You Need to Study

### Creational (How objects are created)

| Pattern | One-Line Intent | Coder Army Lecture |
|---------|----------------|-------------------|
| **Singleton** | Exactly one instance, global access point | Lecture 10 |
| **Factory Method** | Subclass decides which object to create | Lecture 09 |
| **Abstract Factory** | Create families of related objects | Lecture 09 |
| **Builder** | Construct complex objects step-by-step | Lecture 28 |
| **Prototype** | Clone existing objects instead of constructing | Lecture 36 |

### Structural (How objects are composed)

| Pattern | One-Line Intent | Coder Army Lecture |
|---------|----------------|-------------------|
| **Adapter** | Bridge incompatible interfaces | Lecture 16 |
| **Decorator** | Add behavior by wrapping, not subclassing | Lecture 13 |
| **Flyweight** | Share common state to reduce memory | Lecture 30 |
| **Proxy** | Control access via a surrogate | Lecture 21 |

### Behavioral (How objects communicate)

| Pattern | One-Line Intent | Coder Army Lecture |
|---------|----------------|-------------------|
| **Observer** | Notify dependents when state changes | Lecture 12 |
| **Strategy** | Swap algorithms at runtime | Lecture 08 |

---

## Pattern vs Principle vs Technique

| Term | What it is | Example |
|------|-----------|---------|
| **OOP Pillar** | Fundamental concept | Encapsulation, Polymorphism |
| **Design Principle** | Rule to follow | SOLID principles |
| **Design Pattern** | Reusable solution template | Singleton, Strategy |
| **Technique** | Useful idiom (not GoF) | Simple Factory |

**Exam Trap:** Simple Factory is NOT a GoF pattern. It's a technique.

---

## The 3 Questions to Identify Any Pattern

1. **What problem does it solve?** (Memory, coupling, creation, access control...)
2. **What are its roles?** (Subject/Observer, Creator/Product, Context/Strategy...)
3. **What OOP mechanism does it use?** (Composition, inheritance, delegation...)

---

## Quick Recall Table

| Pattern | Category | Mechanism | Key Benefit |
|---------|----------|-----------|-------------|
| Singleton | Creational | Static instance | One instance, thread safety |
| Factory Method | Creational | Inheritance + override | Subclass controls creation |
| Abstract Factory | Creational | Composition | Product family consistency |
| Builder | Creational | Method chaining | Readable complex construction |
| Prototype | Creational | clone() | Avoid expensive re-construction |
| Adapter | Structural | Composition (wrapping) | Bridge incompatible interfaces |
| Decorator | Structural | Composition + same interface | Stackable behavior at runtime |
| Flyweight | Structural | Shared objects | Massive memory reduction |
| Proxy | Structural | Same interface + delegation | Access control / lazy loading |
| Observer | Behavioral | Event notification | Loose coupling for updates |
| Strategy | Behavioral | Composition (has-a) | Swappable algorithms |

---

## Common Exam Confusions

**Adapter vs Decorator:**
- Both wrap another object
- Adapter: **converts interface** (different input/output types)
- Decorator: **same interface**, adds behavior

**Proxy vs Decorator:**
- Both wrap another object with same interface
- Proxy: **controls access** (auth, lazy load, caching)
- Decorator: **adds behavior** (logging, retries, transforms)

**Strategy vs State:**
- Strategy: **client** picks the algorithm
- State: **object** changes behavior based on its own state

**Factory Method vs Simple Factory:**
- Simple Factory: static method + switch (NOT GoF)
- Factory Method: base class has algorithm, subclass overrides factory method (GoF, follows OCP)

**Builder vs Constructor:**
- Constructor: all params in one shot (telescoping)
- Builder: step-by-step, only set what you need, readable

**Prototype vs Copy Constructor:**
- Both copy objects
- Prototype: client doesn't know the concrete type (uses interface)
- Copy constructor: client knows the concrete type

---

## SOLID Connection Summary

| Pattern | SRP | OCP | LSP | DIP |
|---------|-----|-----|-----|-----|
| Singleton | partial | - | - | violates (global) |
| Factory Method | ✓ | ✓ | ✓ | ✓ |
| Abstract Factory | ✓ | ✓ | ✓ | ✓ |
| Builder | ✓ | ✓ | - | - |
| Prototype | - | ✓ | ✓ | ✓ |
| Adapter | - | ✓ | ✓ | ✓ |
| Decorator | ✓ | ✓ | ✓ | ✓ |
| Flyweight | - | ✓ | - | - |
| Proxy | - | ✓ | ✓ | ✓ |
| Observer | ✓ | ✓ | ✓ | ✓ |
| Strategy | ✓ | ✓ | ✓ | ✓ |

---

## Study Order

1. Singleton (thread safety, DCL, volatile)
2. Factory Method (+ Simple Factory, Abstract Factory)
3. Builder (method chaining, immutability)
4. Prototype (clone, registry)
5. Strategy (composition, hot-swap)
6. Observer (event notification)
7. Decorator (wrapping, stacking)
8. Adapter (interface conversion)
9. Proxy (access control, lazy load)
10. Flyweight (intrinsic/extrinsic, factory)
