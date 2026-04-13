# Master MCQ — LLD Exam Prep
### 300 Questions | 60 Easy · 150 Medium · 90 Hard
### Topics: OOP · Immutable · SOLID · Singleton · Factory · Abstract Factory · Builder · Prototype · Adapter · Decorator · Flyweight · Proxy · Observer · Strategy

---

## How to Use This File

- Try answering each question WITHOUT looking at the answer first
- Click **Answer** to reveal the correct choice + reasoning
- Difficulty: Easy = definitions · Medium = code reading + application · Hard = edge cases + multi-pattern
- Self-scoring: 270–300 = exam ready · 240–269 = strong · 200–239 = revise hard sections

---

## SECTION 1 — OOP (Q1–Q30)

### Easy (Q1–Q8)

### Q1: Which OOP pillar bundles data and methods into one unit and restricts direct access?
- A) Abstraction
- B) Inheritance
- C) Encapsulation
- D) Polymorphism

<details><summary>Answer</summary>C) Encapsulation — Encapsulation bundles data and behavior together while hiding internal details through access modifiers.</details>

---

### Q2: `private` fields with `public` getters/setters is an example of:
- A) Abstraction
- B) Encapsulation
- C) Polymorphism
- D) Inheritance

<details><summary>Answer</summary>B) Encapsulation — Using private fields with public getters/setters restricts direct field access, which is the core of encapsulation.</details>

---

### Q3: Which keyword allows a subclass to call its parent class constructor?
- A) `this`
- B) `extends`
- C) `override`
- D) `super`

<details><summary>Answer</summary>D) `super` — The `super` keyword is used to invoke the parent class constructor from a subclass.</details>

---

### Q4: What access modifier makes a member accessible only within the same class?
- A) `protected`
- B) `default`
- C) `public`
- D) `private`

<details><summary>Answer</summary>D) `private` — The `private` modifier restricts access to the declaring class only.</details>

---

### Q5: Method overloading is an example of:
- A) Runtime polymorphism
- B) Compile-time polymorphism
- C) Inheritance
- D) Abstraction

<details><summary>Answer</summary>B) Compile-time polymorphism — Method overloading (same name, different parameters) is resolved at compile time, making it compile-time polymorphism.</details>

---

### Q6: A class declared `abstract` can:
- A) Be instantiated directly
- B) Not have constructors
- C) Not be instantiated directly
- D) Not have concrete methods

<details><summary>Answer</summary>C) Not be instantiated directly — Abstract classes cannot be instantiated with `new`; they must be subclassed with concrete implementations.</details>

---

### Q7: Which keyword is used to prevent a class from being subclassed?
- A) `abstract`
- B) `static`
- C) `sealed`
- D) `final`

<details><summary>Answer</summary>D) `final` — The `final` keyword on a class prevents any other class from extending it.</details>

---

### Q8: `protected` access allows access from:
- A) Same class only
- B) Same package only
- C) Same package + subclasses in other packages
- D) Everywhere

<details><summary>Answer</summary>C) Same package + subclasses in other packages — `protected` grants access within the same package and to subclasses even in different packages.</details>

---

### Medium (Q9–Q22)

### Q9: What is the output?
```java
class Animal { void sound() { System.out.println("Animal"); } }
class Dog extends Animal { void sound() { System.out.println("Dog"); } }
Animal a = new Dog();
a.sound();
```
- A) `Animal`
- B) `Dog`
- C) Compile error
- D) Runtime error

<details><summary>Answer</summary>B) `Dog` — Runtime polymorphism: the actual object type (`Dog`) determines which overridden method runs, not the reference type (`Animal`).</details>

---

### Q10: Which is TRUE about method overriding?
- A) Return type can be any type
- B) Access modifier can be narrowed
- C) Access modifier can only be widened or stay the same
- D) The method must be static

<details><summary>Answer</summary>C) Access modifier can only be widened or stay the same — Java allows widening (e.g., `protected` to `public`) but not narrowing the access modifier when overriding.</details>

---

### Q11: An interface in Java 8+ can have:
- A) Only abstract methods
- B) Abstract, default, and static methods
- C) Constructors
- D) Instance fields

<details><summary>Answer</summary>B) Abstract, default, and static methods — Java 8 introduced `default` and `static` methods in interfaces alongside abstract methods.</details>

---

### Q12: `abstract class` vs `interface` — which is correct?
- A) Abstract class can have state; interface can never have state
- B) A class can implement multiple abstract classes
- C) Abstract class can have a constructor; interface cannot
- D) Both can be instantiated

<details><summary>Answer</summary>C) Abstract class can have a constructor; interface cannot — Abstract classes can have constructors (called via `super()` in subclasses); interfaces cannot.</details>

---

### Q13: What is upcasting?
- A) Casting a parent reference to a child type
- B) Assigning a child object to a parent reference
- C) Using `instanceof`
- D) Calling super methods

<details><summary>Answer</summary>B) Assigning a child object to a parent reference — Upcasting assigns a subclass object to a superclass reference, which is always safe and implicit.</details>

---

### Q14: When does `ClassCastException` occur?
- A) Any downcast
- B) Downcasting an object to a type it doesn't actually belong to
- C) Upcasting
- D) Using `instanceof`

<details><summary>Answer</summary>B) Downcasting an object to a type it doesn't actually belong to — A `ClassCastException` is thrown at runtime when you downcast to an incompatible type.</details>

---

### Q15: Which call always works at compile time without an explicit cast?
- A) Downcasting
- B) Upcasting
- C) Both require cast
- D) Neither

<details><summary>Answer</summary>B) Upcasting — Upcasting is always safe and requires no explicit cast because every subclass IS-A superclass.</details>

---

### Q16: What is printed?
```java
class Parent {
    static void staticMethod() { System.out.println("Parent"); }
}
class Child extends Parent {
    static void staticMethod() { System.out.println("Child"); }
}
Parent p = new Child();
p.staticMethod();
```
- A) `Child`
- B) `Parent`
- C) Compile error
- D) Runtime error

<details><summary>Answer</summary>B) `Parent` — static methods are hidden, not overridden.</details>

---

### Q17: Which access modifier is missing from this table entry: "accessible in subclass even in another package"?
- A) `private`
- B) `default`
- C) `protected`
- D) `public`

<details><summary>Answer</summary>C) `protected` — `protected` is the only modifier that grants access to subclasses in other packages.</details>

---

### Q18: What is the purpose of `this()` in a constructor?
- A) Call the parent constructor
- B) Call another constructor in the same class
- C) Create a copy of the object
- D) Access static fields

<details><summary>Answer</summary>B) Call another constructor in the same class — constructor chaining.</details>

---

### Q19: Which OOP concept allows treating a `Dog` and `Cat` both as `Animal`?
- A) Encapsulation
- B) Abstraction
- C) Polymorphism
- D) Inheritance

<details><summary>Answer</summary>C) Polymorphism — Polymorphism allows treating different subtypes through a common supertype reference.</details>

---

### Q20: A class can extend \_\_\_ class(es) and implement \_\_\_ interface(s) in Java:
- A) Multiple, one
- B) One, multiple
- C) Multiple, multiple
- D) One, one

<details><summary>Answer</summary>B) One, multiple — Java supports single class inheritance but allows implementing multiple interfaces.</details>

---

### Q21: The `@Override` annotation:
- A) Is mandatory for overriding
- B) Creates a new method
- C) Helps the compiler verify you're overriding, not overloading
- D) Changes the method's access

<details><summary>Answer</summary>C) Helps the compiler verify you're overriding, not overloading — `@Override` is not mandatory but helps the compiler catch mistakes like signature mismatches.</details>

---

### Q22: Abstract class `Shape` has `abstract double area()`. You extend it without implementing `area()`. Result?
- A) Works fine
- B) Runtime error
- C) Compile error unless your class is also abstract
- D) Returns 0.0

<details><summary>Answer</summary>C) Compile error unless your class is also abstract — A non-abstract class must implement all inherited abstract methods or it will not compile.</details>

---

### Hard (Q23–Q30)

### Q23: What is the output?
```java
class A {
    A() { System.out.print("A "); }
}
class B extends A {
    B() { System.out.print("B "); }
}
class C extends B {
    C() { System.out.print("C "); }
}
new C();
```
- A) `C`
- B) `C B A`
- C) `A B C`
- D) Compile error

<details><summary>Answer</summary>C) `A B C` — Constructor chaining calls parent constructors first via implicit `super()`: A() then B() then C().</details>

---

### Q24: Can you override a `private` method?
- A) Yes, with `@Override`
- B) No
- C) Yes, but only in the same package
- D) Only if the subclass is `final`

<details><summary>Answer</summary>B) No — private methods are not inherited, so you're defining a new method.</details>

---

### Q25: `covariant return type` means:
- A) The overriding method must return the exact same type
- B) The overriding method can return a supertype
- C) The overriding method can return a subtype of the original return type
- D) Return types don't matter

<details><summary>Answer</summary>C) The overriding method can return a subtype of the original return type — Covariant return types allow an overriding method to return a more specific subtype.</details>

---

### Q26: What is printed?
```java
interface I1 { default void greet() { System.out.println("I1"); } }
interface I2 { default void greet() { System.out.println("I2"); } }
class C implements I1, I2 {
    public void greet() { I1.super.greet(); }
}
new C().greet();
```
- A) Compile error
- B) `I2`
- C) `I1`
- D) Both `I1` and `I2`

<details><summary>Answer</summary>C) `I1` — When two interfaces have the same default method, the implementing class must explicitly resolve the conflict.</details>

---

### Q27: Which is NOT a valid reason to prefer composition over inheritance?
- A) Avoids tight coupling
- B) Supports runtime behavior changes
- C) Avoids fragile base class problem
- D) Always gives better performance than inheritance

<details><summary>Answer</summary>D) Always gives better performance than inheritance — Composition vs inheritance is about coupling and flexibility, not performance.</details>

---

### Q28: A class has no-arg constructor omitted. You call `new MyClass()`. When does this compile?
- A) Always
- B) Never
- C) Only if no other constructor is declared
- D) Only if the class is abstract

<details><summary>Answer</summary>C) Only if no other constructor is declared — Java auto-generates one.</details>

---

### Q29: Method hiding (static) vs method overriding (instance): The key runtime difference is:
- A) Hiding uses polymorphism; overriding does not
- B) Overriding uses the actual runtime type; hiding uses the declared reference type
- C) Both use the runtime type
- D) Both use the reference type

<details><summary>Answer</summary>B) Overriding uses the actual runtime type; hiding uses the declared reference type — Overridden instance methods dispatch on the actual runtime type; hidden static methods dispatch on the declared reference type.</details>

---

### Q30: `final` method in a parent class means:
- A) The method is static
- B) The method is abstract
- C) The method cannot be overridden in any subclass
- D) The method is private

<details><summary>Answer</summary>C) The method cannot be overridden in any subclass — A `final` method cannot be overridden in subclasses, preserving the parent's implementation.</details>

---

## SECTION 2 — Immutable Classes (Q31–Q45)

### Easy (Q31–Q36)

### Q31: Which modifier makes a field's reference unchangeable after initialization?
- A) `static`
- B) `volatile`
- C) `final`
- D) `private`

<details><summary>Answer</summary>C) `final` — The `final` modifier on a field prevents reassignment of the reference after initialization.</details>

---

### Q32: Why must an immutable class be declared `final`?
- A) For performance
- B) To prevent subclasses from breaking immutability by adding mutable state
- C) Java requires it
- D) To allow serialization

<details><summary>Answer</summary>B) To prevent subclasses from breaking immutability by adding mutable state — A subclass could add mutable state and be used polymorphically, breaking the immutability guarantee of the parent type.</details>

---

### Q33: Immutable objects are inherently:
- A) Slow
- B) Thread-safe
- C) Hard to test
- D) Serializable

<details><summary>Answer</summary>B) Thread-safe — Since immutable objects cannot change state, they can be safely shared across threads without synchronization.</details>

---

### Q34: Which is an example of an immutable class in Java?
- A) `StringBuilder`
- B) `ArrayList`
- C) `String`
- D) `HashMap`

<details><summary>Answer</summary>C) `String` — `String` in Java is immutable; operations like `concat()` or `toUpperCase()` return new objects.</details>

---

### Q35: What is a defensive copy?
- A) A copy of the entire heap
- B) A copy made when accepting or returning mutable objects to prevent external mutation
- C) A backup of the database
- D) Cloning the JVM

<details><summary>Answer</summary>B) A copy made when accepting or returning mutable objects to prevent external mutation — Defensive copies prevent external code from modifying internal mutable state of an immutable object.</details>

---

### Q36: If an immutable class has a `List` field, its getter should return:
- A) The original `List`
- B) A `new ArrayList()`
- C) `Collections.unmodifiableList(list)` or `List.copyOf(list)`
- D) `null`

<details><summary>Answer</summary>C) `Collections.unmodifiableList(list)` or `List.copyOf(list)` — Returning an unmodifiable view or copy prevents callers from mutating the internal list.</details>

---

### Medium (Q37–Q42)

### Q37: Which checklist item is missing from a proper immutable class?
```java
public class Person {
    private final String name;
    private final List<String> hobbies;
    public Person(String name, List<String> hobbies) {
        this.name = name;
        this.hobbies = hobbies; // ← ???
    }
    public List<String> getHobbies() { return hobbies; }
}
```
- A) Class should be `final`
- B) Fields should be `private`
- C) Defensive copy in constructor AND unmodifiable return in getter
- D) No setters needed

<details><summary>Answer</summary>C) Defensive copy in constructor AND unmodifiable return in getter — Both the constructor must defensively copy the list AND the getter must return an unmodifiable view to be truly immutable.</details>

---

### Q38: `List.copyOf(list)` vs `Collections.unmodifiableList(list)`:
- A) They are identical
- B) `copyOf` is mutable; `unmodifiable` is not
- C) `copyOf` makes an independent copy; `unmodifiableList` is a view
- D) Neither is thread-safe

<details><summary>Answer</summary>C) `copyOf` makes an independent copy; `unmodifiableList` is a view — still reflects changes to the original.</details>

---

### Q39: What happens if you call a method on a `Collections.unmodifiableList` that tries to `add()`?
- A) Compile error
- B) Returns `false`
- C) Throws `UnsupportedOperationException`
- D) Does nothing

<details><summary>Answer</summary>C) Throws `UnsupportedOperationException` — Unmodifiable collections throw `UnsupportedOperationException` on any mutating operation.</details>

---

### Q40: An immutable class can have:
- A) Setters
- B) Non-final fields
- C) Mutable subclasses
- D) Constructors with validation logic

<details><summary>Answer</summary>D) Constructors with validation logic — Immutable classes can and should validate constructor arguments to ensure valid state.</details>

---

### Q41: `String` is immutable. What does `str.toUpperCase()` return?
- A) Modifies the original string
- B) Returns `null`
- C) Returns a new `String` object
- D) Throws an exception

<details><summary>Answer</summary>C) Returns a new `String` object — All `String` methods return new objects; the original `String` is never modified.</details>

---

### Q42: Why is `final` needed on the CLASS (not just fields)?
- A) Prevents field access
- B) Makes it serializable
- C) A subclass could add mutable state and be assigned to the immutable type reference, breaking the contract
- D) Prevents cloning

<details><summary>Answer</summary>C) A subclass could add mutable state and be assigned to the immutable type reference, breaking the contract — A subclass could add mutable fields and be assigned to the immutable parent reference, breaking the immutability contract.</details>

---

### Hard (Q43–Q45)

### Q43: What is wrong with this immutable class attempt?
```java
public final class ImmutablePoint {
    private final int[] coords;
    public ImmutablePoint(int[] coords) { this.coords = coords; }
    public int[] getCoords() { return coords; }
}
```
- A) Nothing — it is correctly immutable
- B) `coords` should be `public`
- C) `int[]` is mutable
- D) Class should not be `final`

<details><summary>Answer</summary>C) `int[]` is mutable — caller can modify the array; needs defensive copy in constructor and getter.</details>

---

### Q44: `new String("hello") == new String("hello")` evaluates to:
- A) `true` always
- B) `false`
- C) Compile error
- D) `true` because String is immutable

<details><summary>Answer</summary>B) `false` — two separate objects on the heap.</details>

---

### Q45: An immutable class with `LocalDate` field (which is already immutable):
- A) Still needs defensive copy because all objects are mutable
- B) Does NOT need defensive copy
- C) Must use `clone()`
- D) Must use `Optional`

<details><summary>Answer</summary>B) Does NOT need defensive copy — `LocalDate` is itself immutable, so sharing the reference is safe.</details>

---

## SECTION 3 — SOLID Principles (Q46–Q70)

### Easy (Q46–Q53)

### Q46: SRP stands for:
- A) System Resource Protocol
- B) Single Responsibility Principle
- C) Safe Runtime Pattern
- D) Static Resource Policy

<details><summary>Answer</summary>B) Single Responsibility Principle — SRP stands for Single Responsibility Principle: a class should have only one reason to change.</details>

---

### Q47: OCP means a class should be:
- A) Open for modification, closed for extension
- B) Open for extension, closed for modification
- C) Open source and closed-platform
- D) Optional for compilation

<details><summary>Answer</summary>B) Open for extension, closed for modification — OCP states that software entities should be open for extension but closed for modification.</details>

---

### Q48: Which SOLID principle says "subclasses should be substitutable for their base classes"?
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>C) LSP — Liskov Substitution Principle.</details>

---

### Q49: "Depend on abstractions, not concretions" is:
- A) LSP
- B) ISP
- C) OCP
- D) DIP

<details><summary>Answer</summary>D) DIP — Dependency Inversion Principle.</details>

---

### Q50: A `Report` class that prints, saves to DB, and sends email violates:
- A) OCP
- B) LSP
- C) SRP
- D) DIP

<details><summary>Answer</summary>C) SRP — A class with printing, DB persistence, and emailing has multiple reasons to change, violating SRP.</details>

---

### Q51: ISP stands for:
- A) Instance Safety Protocol
- B) Interface Segregation Principle
- C) Inherited Static Property
- D) Internal Service Pattern

<details><summary>Answer</summary>B) Interface Segregation Principle — ISP stands for Interface Segregation Principle: clients should not depend on methods they don't use.</details>

---

### Q52: Which principle is violated when you have a "fat interface" with 10 methods that clients partially implement?
- A) SRP
- B) OCP
- C) LSP
- D) ISP

<details><summary>Answer</summary>D) ISP — When clients are forced to implement methods they don't need, the interface is too fat, violating ISP.</details>

---

### Q53: Constructor injection is preferred over `Logger.getInstance()` because:
- A) It's faster
- B) It follows DIP
- C) It avoids null pointers
- D) It requires less code

<details><summary>Answer</summary>B) It follows DIP — depends on abstraction and makes dependencies explicit.</details>

---

### Medium (Q54–Q63)

### Q54: Which principle does adding a new payment method (PayPal) without modifying `CheckoutService` demonstrate?
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>B) OCP — Adding new payment methods without changing existing code demonstrates OCP.</details>

---

### Q55: What is wrong?
```java
class Rectangle { int width, height; }
class Square extends Rectangle { 
    void setWidth(int w) { width = height = w; }
    void setHeight(int h) { height = width = h; }
}
void resize(Rectangle r) { r.setWidth(5); r.setHeight(10); }
```
- A) Nothing
- B) SRP violation
- C) LSP violation — Square changes Rectangle's invariants
- D) OCP violation

<details><summary>Answer</summary>C) LSP violation — Square changes Rectangle's invariants — width ≠ height.</details>

---

### Q56: A class `Bird` has method `fly()`. Class `Penguin extends Bird` throws `UnsupportedOperationException` in `fly()`. This violates:
- A) SRP
- B) OCP
- C) LSP
- D) ISP

<details><summary>Answer</summary>C) LSP — If `Penguin` cannot fulfill the `fly()` contract of `Bird`, substituting a `Penguin` for a `Bird` breaks LSP.</details>

---

### Q57: DIP says high-level modules should depend on abstractions. This is achieved via:
- A) Static utility classes
- B) Global variables
- C) Interfaces + constructor/setter injection
- D) Reflection

<details><summary>Answer</summary>C) Interfaces + constructor/setter injection — DIP is achieved by depending on interfaces and injecting concrete implementations via constructors or setters.</details>

---

### Q58: Which pattern most directly enforces DIP?
- A) Singleton (global access)
- B) Simple Factory
- C) Factory Method / Abstract Factory
- D) Flyweight

<details><summary>Answer</summary>C) Factory Method / Abstract Factory — depends on abstract factory interface.</details>

---

### Q59: `NotificationService` calls `EmailSender` directly via `new`. Which principle is violated?
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>D) DIP — depends on concrete, not abstraction.</details>

---

### Q60: "Open for extension" in OCP means:
- A) Modifying existing code
- B) Adding new subclasses / implementations without changing existing code
- C) Using reflection
- D) Making everything public

<details><summary>Answer</summary>B) Adding new subclasses / implementations without changing existing code — OCP's 'open for extension' means adding new behavior through subclasses or implementations, not modifying existing code.</details>

---

### Q61: Adding a new strategy class without changing the context follows:
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>B) OCP — open for extension via new class, closed for modification.</details>

---

### Q62: Which refactoring restores SRP to a 500-line God class?
- A) Add more methods
- B) Use inheritance
- C) Extract separate classes for each responsibility
- D) Add a Singleton

<details><summary>Answer</summary>C) Extract separate classes for each responsibility — Extracting each responsibility into its own class restores SRP to a God class.</details>

---

### Q63: Interface with 20 methods; most classes implement only 3. Fix:
- A) Add default implementations for all 20
- B) Split into smaller, role-specific interfaces
- C) Use abstract class instead
- D) Remove the interface

<details><summary>Answer</summary>B) Split into smaller, role-specific interfaces — ISP.</details>

---

### Hard (Q64–Q70)

### Q64: The "fragile base class" problem occurs when:
- A) Subclasses are poorly written
- B) Changes to a base class unexpectedly break subclasses that depend on its internal behavior
- C) The base class is abstract
- D) Inheritance is used correctly

<details><summary>Answer</summary>B) Changes to a base class unexpectedly break subclasses that depend on its internal behavior — The fragile base class problem is a key reason to prefer composition over inheritance.</details>

---

### Q65: Pre-condition strengthening in a subclass violates:
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>C) LSP — subtype cannot require more than the base type.</details>

---

### Q66: Decorator pattern inherently follows which two SOLID principles most directly?
- A) SRP only
- B) OCP only
- C) OCP (add behavior without modifying) + SRP
- D) DIP + LSP

<details><summary>Answer</summary>C) OCP (add behavior without modifying) + SRP — each decorator has one job.</details>

---

### Q67: Why can Singleton violate DIP?
- A) It creates multiple instances
- B) Code that calls `Singleton.getInstance()` directly depends on the concrete class, not an abstraction
- C) It doesn't use interfaces
- D) It prevents inheritance

<details><summary>Answer</summary>B) Code that calls `Singleton.getInstance()` directly depends on the concrete class, not an abstraction — Code calling `Singleton.getInstance()` directly depends on the concrete class, coupling to a specific implementation rather than an abstraction.</details>

---

### Q68: A `DataProcessor` interface has `process()`, `validate()`, `serialize()`, `compress()`. A `BasicProcessor` only needs `process()`. Which principle to apply?
- A) Move all methods to abstract class
- B) ISP
- C) Use default methods
- D) Delete the unused methods

<details><summary>Answer</summary>B) ISP — split into `Processor`, `Validator`, `Serializer`, `Compressor`.</details>

---

### Q69: Covariant return types in overriding methods are consistent with:
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>C) LSP — the return type is a subtype, so callers are not broken.</details>

---

### Q70: Strategy pattern with a registry (`Map<String, Strategy>`) most directly supports:
- A) SRP
- B) OCP
- C) LSP
- D) ISP

<details><summary>Answer</summary>B) OCP — new strategies registered at runtime without modifying existing code.</details>

---

## SECTION 4 — Singleton (Q71–Q92)

### Easy (Q71–Q75)

### Q71: What makes a constructor Singleton?
- A) `static` keyword
- B) `final` keyword
- C) `private` access modifier
- D) `synchronized` keyword

<details><summary>Answer</summary>C) `private` access modifier — A private constructor prevents external code from calling `new`, ensuring only the class itself controls instance creation.</details>

---

### Q72: Eager initialization creates the instance:
- A) On first call to `getInstance()`
- B) Only in multithreaded code
- C) When the class is loaded by the JVM
- D) After garbage collection

<details><summary>Answer</summary>C) When the class is loaded by the JVM — Eager initialization creates the instance as a static field assignment, which runs when the JVM loads the class.</details>

---

### Q73: Lazy initialization creates the instance:
- A) At class load time
- B) On the first call to `getInstance()`
- C) Every time `getInstance()` is called
- D) Via serialization

<details><summary>Answer</summary>B) On the first call to `getInstance()` — Lazy initialization defers instance creation until `getInstance()` is first called, saving resources if never used.</details>

---

### Q74: Which Singleton approach is immune to reflection attacks?
- A) DCL with `volatile`
- B) Holder idiom
- C) Eager init
- D) Enum Singleton

<details><summary>Answer</summary>D) Enum Singleton — Enum Singleton is immune to reflection because the JVM prevents reflective instantiation of enum types.</details>

---

### Q75: The Holder idiom uses:
- A) `synchronized` block
- B) `volatile` field
- C) Static inner class
- D) Double-checked locking

<details><summary>Answer</summary>C) Static inner class — loaded lazily by JVM on first access.</details>

---

### Medium (Q76–Q86)

### Q76: What is the bug?
```java
public class Config {
    private static Config instance;
    public Config() { }
    public static Config getInstance() {
        if (instance == null) instance = new Config();
        return instance;
    }
}
```
- A) No bug
- B) `instance` needs `volatile`
- C) Constructor is `public`
- D) `getInstance()` needs to be `private`

<details><summary>Answer</summary>C) Constructor is `public` — anyone can call `new Config()` breaking the singleton.</details>

---

### Q77: Why does DCL require `volatile`?
- A) To prevent garbage collection
- B) To enable lazy init
- C) To prevent instruction reordering (the JVM may assign the reference before the constructor finishes) and ensure cache visibility across threads
- D) To make the class serializable

<details><summary>Answer</summary>C) To prevent instruction reordering (the JVM may assign the reference before the constructor finishes) and ensure cache visibility across threads — Without `volatile`, the JVM may reorder instructions so the reference is assigned before the constructor finishes, exposing a half-constructed object to other threads.</details>

---

### Q78: Which approach gives lazy init + thread safety with NO `volatile` or `synchronized`?
- A) Eager init
- B) DCL with `volatile`
- C) Holder idiom
- D) Enum

<details><summary>Answer</summary>C) Holder idiom — JVM class-loading guarantee.</details>

---

### Q79: DCL without `volatile` is broken because:
- A) The second check is redundant
- B) The JVM can reorder: assign reference BEFORE constructor finishes, so another thread sees a non-null but half-constructed object
- C) `synchronized` blocks cannot be nested
- D) `null` checks are not atomic

<details><summary>Answer</summary>B) The JVM can reorder: assign reference BEFORE constructor finishes, so another thread sees a non-null but half-constructed object — The JVM can reorder: assign the reference BEFORE the constructor completes, so another thread sees a non-null but half-constructed object.</details>

---

### Q80: In `synchronized(Logger.class)`, the lock object is:
- A) `this`
- B) The `Logger` instance
- C) The `Class<Logger>` object
- D) The JVM

<details><summary>Answer</summary>C) The `Class<Logger>` object — the class's meta-object.</details>

---

### Q81: Removing the FIRST null check from DCL but keeping the inner one:
- A) Breaks thread safety
- B) Creates two instances
- C) Still correct but loses the performance benefit
- D) Causes a NullPointerException

<details><summary>Answer</summary>C) Still correct but loses the performance benefit — every call synchronizes.</details>

---

### Q82: DCL with `volatile` works since Java:
- A) 1.0
- B) 1.4
- C) 5
- D) 8

<details><summary>Answer</summary>C) 5 — Java Memory Model was fixed in Java 5.</details>

---

### Q83: Enum Singleton CANNOT:
- A) Have methods
- B) Have fields
- C) Extend another class
- D) Implement interfaces

<details><summary>Answer</summary>C) Extend another class — enums implicitly extend `java.lang.Enum`.</details>

---

### Q84: To prevent serialization from breaking a non-enum Singleton, add:
- A) `writeObject()`
- B) `readResolve()`
- C) `clone()`
- D) `Serializable` interface removes the issue automatically

<details><summary>Answer</summary>B) `readResolve()` — returns `getInstance()` so deserialization reuses the existing instance.</details>

---

### Q85: Which IS a valid Singleton use case?
- A) User session object
- B) Shopping cart
- C) HTTP request object
- D) Application-wide logger

<details><summary>Answer</summary>D) Application-wide logger — A logger is a valid Singleton use case because the entire application should share one logging configuration.</details>

---

### Q86: Why are Singletons considered an anti-pattern in some contexts?
- A) They are too slow
- B) They create too many objects
- C) They introduce global state, hide dependencies, and make unit testing harder
- D) They violate LSP always

<details><summary>Answer</summary>C) They introduce global state, hide dependencies, and make unit testing harder — Singletons introduce global state, hide dependencies in code, and make unit testing difficult because you cannot easily substitute mock implementations.</details>

---

### Hard (Q87–Q92)

### Q87: A Singleton holds a mutable `Map<String, String>`. Multiple threads access it. Fix?
- A) Use `volatile` on the map
- B) Make the map `final`
- C) Use `ConcurrentHashMap` or synchronize access to the map separately from the singleton creation
- D) Re-initialize the map per call

<details><summary>Answer</summary>C) Use `ConcurrentHashMap` or synchronize access to the map separately from the singleton creation — The mutable `Map` inside the Singleton needs its own thread-safe handling (e.g., `ConcurrentHashMap`) separate from the singleton creation logic.</details>

---

### Q88: `new Logger()` involves 3 JVM operations. Without `volatile`, which two can be reordered?
- A) Allocate and assign
- B) Allocate and initialize
- C) Initialize and assign
- D) All three

<details><summary>Answer</summary>C) Initialize and assign — reference may be assigned before object construction completes.</details>

---

### Q89: How can reflection break a non-enum Singleton?
- A) It cannot
- B) By calling `getInstance()` twice
- C) By calling `Constructor.setAccessible(true)` on the private constructor and then `newInstance()`
- D) By serializing and deserializing

<details><summary>Answer</summary>C) By calling `Constructor.setAccessible(true)` on the private constructor and then `newInstance()` — Reflection can bypass the private constructor via `setAccessible(true)` and create additional instances, breaking the singleton guarantee.</details>

---

### Q90: A `BillPugh Singleton` is another name for:
- A) Eager initialization
- B) DCL
- C) Holder idiom
- D) Enum Singleton

<details><summary>Answer</summary>C) Holder idiom — static inner class.</details>

---

### Q91: Thread A holds the lock in DCL and is initializing the Singleton. Thread B passes the first null check BEFORE A finishes. Without `volatile`, Thread B:
- A) Waits for Thread A
- B) Creates a new instance
- C) May receive a partially initialized object reference
- D) Gets `null`

<details><summary>Answer</summary>C) May receive a partially initialized object reference — if reference was assigned before construction completed.</details>

---

### Q92: Which Singleton approach is lazy, thread-safe, reflection-safe, AND serialization-safe?
- A) DCL with volatile
- B) Holder idiom
- C) Eager init
- D) Enum Singleton

<details><summary>Answer</summary>D) Enum Singleton — handles all three attack vectors, but is NOT lazy.</details>

---

## SECTION 5 — Factory Patterns (Q93–Q120)

### Easy (Q93–Q98)

### Q93: Simple Factory is:
- A) A GoF pattern
- B) A useful technique/idiom, NOT an official GoF design pattern
- C) A behavioral pattern
- D) A structural pattern

<details><summary>Answer</summary>B) A useful technique/idiom, NOT an official GoF design pattern — Simple Factory is a common idiom but is not listed among the 23 GoF design patterns.</details>

---

### Q94: Factory Method pattern belongs to which category?
- A) Structural
- B) Behavioral
- C) Concurrency
- D) Creational

<details><summary>Answer</summary>D) Creational — Factory Method is one of the five GoF Creational patterns.</details>

---

### Q95: In Factory Method, the `createProduct()` method is:
- A) Static
- B) In the client
- C) Final
- D) Abstract in the base creator, overridden by subclasses

<details><summary>Answer</summary>D) Abstract in the base creator, overridden by subclasses — In Factory Method, the base creator declares an abstract factory method that concrete creators override.</details>

---

### Q96: Abstract Factory creates:
- A) A single product
- B) One instance globally
- C) A family of related products
- D) A copy of an existing object

<details><summary>Answer</summary>C) A family of related products — Abstract Factory provides an interface for creating families of related or dependent objects.</details>

---

### Q97: Which principle does Factory Method follow when you add a new creator subclass?
- A) SRP
- B) LSP
- C) DIP
- D) OCP

<details><summary>Answer</summary>D) OCP — extension via new subclass, no modification.</details>

---

### Q98: Simple Factory centralizes creation in:
- A) The product class
- B) A single static method
- C) Multiple abstract classes
- D) The client

<details><summary>Answer</summary>B) A single static method — Simple Factory typically uses a single static method with conditional logic to create objects.</details>

---

### Medium (Q99–Q112)

### Q99: What is the key difference between Simple Factory and Factory Method?
- A) Simple Factory is thread-safe; Factory Method is not
- B) Simple Factory uses a static method with if/switch; Factory Method uses inheritance
- C) Factory Method is not a design pattern
- D) They are identical

<details><summary>Answer</summary>B) Simple Factory uses a static method with if/switch; Factory Method uses inheritance — base class has algorithm, subclass overrides factory method.</details>

---

### Q100: In the Coder Army Burger example, `SinghBurger` and `KingBurger` are:
- A) Products
- B) Interfaces
- C) Concrete Factories
- D) Abstract creators

<details><summary>Answer</summary>C) Concrete Factories — they implement `BurgerFactory`.</details>

---

### Q101: The client in Factory Method picks the creation policy by:
- A) Passing a parameter to the factory method
- B) Selecting which concrete creator to instantiate
- C) Modifying the base creator
- D) Using reflection

<details><summary>Answer</summary>B) Selecting which concrete creator to instantiate — The client selects the creation policy by choosing which concrete creator subclass to instantiate.</details>

---

### Q102: Which code is Factory Method (not Simple Factory)?
- A) `static Product create(String type) { if... }`
- B) `abstract Product createProduct();` in base class with subclasses overriding it
- C) `new ProductImpl()`
- D) `ProductRegistry.get(key)`

<details><summary>Answer</summary>B) `abstract Product createProduct();` in base class with subclasses overriding it — Factory Method uses an abstract method in a base class that subclasses override, unlike Simple Factory's static if/switch.</details>

---

### Q103: Abstract Factory difference from Factory Method:
- A) Abstract Factory uses inheritance
- B) Abstract Factory creates a FAMILY of related products; Factory Method creates ONE product
- C) Factory Method creates families
- D) They are the same pattern

<details><summary>Answer</summary>B) Abstract Factory creates a FAMILY of related products; Factory Method creates ONE product — Abstract Factory creates an entire family of related products; Factory Method creates a single product.</details>

---

### Q104: In the Coder Army Abstract Factory (Burger + GarlicBread), swapping `SinghBurger` factory for `KingBurger` changes:
- A) Only the burger type
- B) Only the bread type
- C) Both burger AND garlic bread
- D) Nothing

<details><summary>Answer</summary>C) Both burger AND garlic bread — the entire product family switches consistently.</details>

---

### Q105: `generateWave()` in StoneSpawner calls `createStone()`. The relationship between them is:
- A) Strategy
- B) Template Method + Factory Method
- C) Builder
- D) Observer

<details><summary>Answer</summary>B) Template Method + Factory Method — `generateWave` is the template, `createStone` is the factory method.</details>

---

### Q106: Adding `TitaniumBurger` chain to the Coder Army system requires:
- A) Modifying `BurgerFactory` interface
- B) Editing `SinghBurger`
- C) Creating a new class `TitaniumBurger implements BurgerFactory`
- D) Changing the client

<details><summary>Answer</summary>C) Creating a new class `TitaniumBurger implements BurgerFactory` — OCP.</details>

---

### Q107: Why can't Simple Factory be extended without modification?
- A) It uses interfaces
- B) Its `if/switch` block must be edited to add new types
- C) It's abstract
- D) It uses `static`

<details><summary>Answer</summary>B) Its `if/switch` block must be edited to add new types — violates OCP.</details>

---

### Q108: What does `protected abstract Stone createStone()` mean?
- A) Base class has the implementation
- B) Only base class can call it
- C) Subclasses MUST implement this factory method
- D) Method returns null by default

<details><summary>Answer</summary>C) Subclasses MUST implement this factory method — `protected abstract` means subclasses must provide the implementation, and it cannot be called directly by external client code.</details>

---

### Q109: Factory Method uses which mechanism to vary creation?
- A) Composition
- B) Reflection
- C) Inheritance + method override
- D) Cloning

<details><summary>Answer</summary>C) Inheritance + method override — Factory Method relies on inheritance: subclasses override the factory method to change the product type.</details>

---

### Q110: Which is a real-world use of Abstract Factory?
- A) Creating a logger
- B) Sorting a list
- C) GUI toolkit creating platform-specific buttons, menus, and scrollbars that match the OS theme
- D) Compressing files

<details><summary>Answer</summary>C) GUI toolkit creating platform-specific buttons, menus, and scrollbars that match the OS theme — A GUI toolkit creating OS-specific buttons, menus, and scrollbars is the classic Abstract Factory example.</details>

---

### Q111: Factory Method vs Template Method relationship:
- A) They are unrelated
- B) Template Method is a subtype of Factory Method
- C) Factory Method is often used INSIDE Template Method
- D) Only one can be used per class

<details><summary>Answer</summary>C) Factory Method is often used INSIDE Template Method — the factory method is one step in the algorithm.</details>

---

### Q112: `new BurgerFactory()` where `BurgerFactory` is an interface — what happens?
- A) Creates a default burger
- B) Compile error
- C) Creates a null burger
- D) Calls the static factory method

<details><summary>Answer</summary>B) Compile error — cannot instantiate an interface.</details>

---

### Hard (Q113–Q120)

### Q113: You have `AnimalFactory.create("dog")` returning a `Dog`. Next month someone passes `"fish"`. Current: throws exception. Best fix using OCP?
- A) Add `"fish"` to the switch
- B) Create a `FishFactory implements AnimalFactory`
- C) Use reflection
- D) Add a null check

<details><summary>Answer</summary>B) Create a `FishFactory implements AnimalFactory` — extend without modifying.</details>

---

### Q114: Abstract Factory implemented with Prototype registry:
- A) Is invalid — they can't combine
- B) Works
- C) Is only valid in C++
- D) Loses the family consistency guarantee

<details><summary>Answer</summary>B) Works — the factory's create methods clone prototypes from a registry instead of calling `new`.</details>

---

### Q115: In Factory Method, `createStone()` is `protected`. Can client code call it directly?
- A) Yes, always
- B) No
- C) Only if client is in same package
- D) Yes, if `@Override` is used

<details><summary>Answer</summary>B) No — `protected` means only the class and its subclasses can call it; client uses `generateWave()` instead.</details>

---

### Q116: What is the Creator and Product in `Dialog.render()` calling `createButton()`?
- A) `Button` is Creator, `Dialog` is Product
- B) `Dialog` is Creator, `Button` is Product
- C) Both are Products
- D) `render()` is the Product

<details><summary>Answer</summary>B) `Dialog` is Creator, `Button` is Product — `Dialog` is the Creator (it declares the factory method `createButton()`), and `Button` is the Product being created.</details>

---

### Q117: Factory Method with `final` on the algorithm method (`generateWave`) means:
- A) Subclasses cannot override anything
- B) The factory method cannot be implemented
- C) Subclasses can only override the factory method
- D) The method is static

<details><summary>Answer</summary>C) Subclasses can only override the factory method — the algorithm skeleton is locked.</details>

---

### Q118: You need to create widgets (Button, Checkbox) for Windows AND Mac consistently. Which pattern is most appropriate?
- A) Factory Method
- B) Simple Factory
- C) Abstract Factory
- D) Builder

<details><summary>Answer</summary>C) Abstract Factory — creates families: WinButton+WinCheckbox vs MacButton+MacCheckbox.</details>

---

### Q119: `FactoryRegistry` maps keys to factory instances. New factories are registered at startup. This is:
- A) A violation of OCP
- B) An extension of Factory Method with OCP support
- C) Simple Factory
- D) Prototype

<details><summary>Answer</summary>B) An extension of Factory Method with OCP support — new factories register themselves without modifying registry logic.</details>

---

### Q120: If every `createBurger()` call in a factory does `new PremiumBurger()` regardless of input, this factory:
- A) Is wrong — a factory must use a switch
- B) Is Abstract Factory
- C) Is a valid (if inflexible) Factory Method implementation
- D) Violates Factory Method contract

<details><summary>Answer</summary>C) Is a valid (if inflexible) Factory Method implementation — it just happens to always create Premium.</details>

---

## SECTION 6 — Builder (Q121–Q140)

### Easy (Q121–Q125)

### Q121: Builder pattern solves:
- A) Thread safety
- B) Memory waste
- C) Telescoping constructors with many optional parameters
- D) Interface incompatibility

<details><summary>Answer</summary>C) Telescoping constructors with many optional parameters — Builder pattern solves the telescoping constructor anti-pattern by providing a fluent step-by-step construction API.</details>

---

### Q122: Method chaining in Builder is achieved by:
- A) Static methods
- B) Inheritance
- C) Each setter returns `this`
- D) Reflection

<details><summary>Answer</summary>C) Each setter returns `this` — the builder object.</details>

---

### Q123: The `build()` method:
- A) Starts construction
- B) Chains methods
- C) Finalizes construction, validates, and returns the built object
- D) Resets the builder

<details><summary>Answer</summary>C) Finalizes construction, validates, and returns the built object — The `build()` method finalizes construction by validating all fields and returning the fully constructed immutable object.</details>

---

### Q124: In the Coder Army `HttpRequest` example, who can call `new HttpRequest()`?
- A) Any class
- B) Only subclasses
- C) Only the same package
- D) Only `HttpRequestBuilder`

<details><summary>Answer</summary>D) Only `HttpRequestBuilder` — constructor is package-private/private.</details>

---

### Q125: Builder belongs to which pattern category?
- A) Structural
- B) Behavioral
- C) Concurrency
- D) Creational

<details><summary>Answer</summary>D) Creational — Builder is a Creational pattern focused on constructing complex objects step by step.</details>

---

### Medium (Q126–Q134)

### Q126: Telescoping constructor problem occurs when:
- A) Constructor is abstract
- B) Class has many fields, leading to multiple constructors with different combinations of parameters
- C) Constructor is private
- D) Static initializer fails

<details><summary>Answer</summary>B) Class has many fields, leading to multiple constructors with different combinations of parameters — Multiple constructors with different parameter combinations create confusion and maintenance burden.</details>

---

### Q127: Which is NOT a benefit of Builder?
- A) Readable construction with named-style setters
- B) Validation before building
- C) Immutable result object
- D) Reduces the number of classes

<details><summary>Answer</summary>D) Reduces the number of classes — Builder actually adds a Builder class, so it increases the number of classes rather than reducing them.</details>

---

### Q128: `HttpRequest.HttpRequestBuilder` is a nested static class. Why static?
- A) To allow inheritance
- B) Static nested class can be instantiated without an outer instance: `new HttpRequest.HttpRequestBuilder()`
- C) For thread safety
- D) Required by the builder pattern

<details><summary>Answer</summary>B) Static nested class can be instantiated without an outer instance: `new HttpRequest.HttpRequestBuilder()` — A static nested class can be instantiated without an outer instance, which is essential since the Builder must exist before the product.</details>

---

### Q129: Builder vs Constructor — when to prefer Builder?
- A) Always
- B) For objects with 1-2 fields
- C) For objects with many fields (4+), especially when some are optional
- D) Only for immutable objects

<details><summary>Answer</summary>C) For objects with many fields (4+), especially when some are optional — Builder shines when there are many fields (especially optional ones); for simple objects, a constructor suffices.</details>

---

### Q130: Director in the Builder pattern:
- A) Is always required
- B) Is the product
- C) Encapsulates the build steps sequence; client doesn't need to know the order
- D) Is the same as the builder

<details><summary>Answer</summary>C) Encapsulates the build steps sequence; client doesn't need to know the order — The Director encapsulates the build step sequence so the client doesn't need to know the construction order.</details>

---

### Q131: What happens if `build()` is called without setting the required `url` in the Coder Army example?
- A) Returns null
- B) Compiles but crashes silently
- C) Throws `RuntimeException("URL cannot be empty")`
- D) Uses a default URL

<details><summary>Answer</summary>C) Throws `RuntimeException("URL cannot be empty")` — The `build()` method validates required fields and throws an exception if `url` is not set.</details>

---

### Q132: Builder pattern creates:
- A) Multiple instances
- B) Complex objects with many configuration options
- C) Lightweight shared objects
- D) Clones

<details><summary>Answer</summary>B) Complex objects with many configuration options — Builder is specifically designed for constructing complex objects with many configuration options.</details>

---

### Q133: Which demonstrates the Step Builder variation?
- A) All fields optional, can `build()` anytime
- B) Builder enforces mandatory steps via separate interfaces
- C) Builder uses inheritance
- D) Director handles all steps

<details><summary>Answer</summary>B) Builder enforces mandatory steps via separate interfaces — you MUST set required fields before optional ones.</details>

---

### Q134: `StringBuilder` in Java is:
- A) An implementation of the Builder design pattern
- B) Uses a similar concept (chaining + build via `toString()`), but is a utility class, not strictly the GoF Builder pattern
- C) A Flyweight
- D) A Factory

<details><summary>Answer</summary>B) Uses a similar concept (chaining + build via `toString()`), but is a utility class, not strictly the GoF Builder pattern — `StringBuilder` uses chaining and `toString()` similarly, but it's a mutable utility class, not the GoF Builder design pattern.</details>

---

### Hard (Q135–Q140)

### Q135: Builder + Immutability: After `build()` returns the object, the caller does `builder.withUrl("other").build()` again. What happens?
- A) Returns the same object with new URL
- B) Depends on implementation
- C) Always throws exception
- D) Returns the original unchanged

<details><summary>Answer</summary>B) Depends on implementation — if builder reuses the same `req` object, both built objects share state (bug); proper impl should create new `HttpRequest` per `build()`.</details>

---

### Q136: Which code correctly makes Builder output immutable?
- A) `return req;` (exposing the mutable builder's field)
- B) `return new Product(builder.field1, builder.field2)`
- C) `return Collections.unmodifiableList(req)`
- D) Make the builder `final`

<details><summary>Answer</summary>B) `return new Product(builder.field1, builder.field2)` — copy all fields into a new final-fielded immutable class.</details>

---

### Q137: Builder with validation in `build()` vs constructor validation:
- A) Both are equivalent
- B) Builder validation is always better
- C) Builder validation lets you collect ALL errors at once; constructor validation typically throws on the first error
- D) Constructor is better — Builder can't validate

<details><summary>Answer</summary>C) Builder validation lets you collect ALL errors at once; constructor validation typically throws on the first error — Builder can accumulate and report all validation errors at once, while constructor validation typically fails on the first error.</details>

---

### Q138: Fluent API vs Builder pattern:
- A) Identical concepts
- B) Fluent API is a broader style (method chaining for readability); Builder is a specific pattern using fluent API to construct complex objects
- C) Fluent API never uses `build()`
- D) Builder never returns `this`

<details><summary>Answer</summary>B) Fluent API is a broader style (method chaining for readability); Builder is a specific pattern using fluent API to construct complex objects — Fluent API is a general coding style (method chaining for readability); Builder is a specific design pattern that often uses fluent API.</details>

---

### Q139: Why is the Builder's inner class a STATIC nested class and not an inner (non-static) class?
- A) Inner classes can't have static fields
- B) Non-static inner class needs outer instance — `new HttpRequest().new HttpRequestBuilder()` is awkward
- C) Static nested class is faster
- D) Both b is a valid reason

<details><summary>Answer</summary>D) Both b is a valid reason — static nested class avoids needing to create an outer `HttpRequest` instance first, since the point of Builder is that you create `HttpRequest` only via the builder.</details>

---

### Q140: Which pattern would you combine with Builder to allow different "configurations" of the same product to be built repeatedly?
- A) Flyweight
- B) Proxy
- C) Prototype
- D) Observer

<details><summary>Answer</summary>C) Prototype — store the builder configuration as a prototype and clone it for similar products.</details>

---

## SECTION 7 — Prototype (Q141–Q158)

### Easy (Q141–Q145)

### Q141: Prototype pattern creates new objects by:
- A) Calling a factory method
- B) Cloning an existing configured object
- C) Building step-by-step
- D) Reflecting on the class

<details><summary>Answer</summary>B) Cloning an existing configured object — Prototype creates new objects by copying an existing configured instance, avoiding expensive re-initialization.</details>

---

### Q142: The Prototype pattern avoids:
- A) Method overriding
- B) Interfaces
- C) Expensive re-initialization of complex objects
- D) Inheritance

<details><summary>Answer</summary>C) Expensive re-initialization of complex objects — Cloning avoids re-running expensive setup (DB calls, complex calculations) by copying an already-initialized object.</details>

---

### Q143: In the Coder Army NPC example, which constructor is "expensive"?
- A) The copy constructor
- B) `NPC(String, int, int, int)`
- C) Both equally
- D) Neither

<details><summary>Answer</summary>B) `NPC(String, int, int, int)` — simulates DB call + complex calc.</details>

---

### Q144: Prototype pattern belongs to:
- A) Structural
- B) Behavioral
- C) Creational
- D) Concurrency

<details><summary>Answer</summary>C) Creational — Prototype is a Creational pattern that creates objects by cloning existing instances.</details>

---

### Q145: `clone()` in Prototype uses:
- A) Factory method
- B) Builder
- C) Copy constructor or `Object.clone()`
- D) Reflection

<details><summary>Answer</summary>C) Copy constructor or `Object.clone()` — Prototype cloning is typically implemented via a copy constructor or by overriding `Object.clone()`.</details>

---

### Medium (Q146–Q154)

### Q146: Shallow copy vs deep copy in Prototype:
- A) Identical
- B) Shallow: copies references (nested mutable objects are shared); Deep: recursively copies all nested objects
- C) Shallow is always safer
- D) Deep copy is always unnecessary

<details><summary>Answer</summary>B) Shallow: copies references (nested mutable objects are shared); Deep: recursively copies all nested objects — Shallow copy shares nested object references; deep copy recursively duplicates all nested objects for full independence.</details>

---

### Q147: Prototype Registry:
- A) Is the same as a Simple Factory
- B) Stores pre-configured prototype instances by key; clients request clones by key without knowing concrete types
- C) Requires a database
- D) Only works with enum keys

<details><summary>Answer</summary>B) Stores pre-configured prototype instances by key; clients request clones by key without knowing concrete types — A Prototype Registry stores pre-configured prototypes by key, allowing clients to request clones without knowing concrete types.</details>

---

### Q148: In the Coder Army example, `alienCopied2.setName("Powerful Alien")` does NOT affect the original because:
- A) `name` is `final`
- B) Strings are reference types
- C) `name` is a `String`
- D) `setName` is synchronized

<details><summary>Answer</summary>C) `name` is a `String` — immutable in Java; modifying it via setter replaces the reference, not the original.</details>

---

### Q149: When is Prototype preferred over Factory Method?
- A) When you need a single instance
- B) When construction is expensive and many similar variants are needed; or when you don't know the concrete type at compile time
- C) When objects are immutable
- D) When interfaces are unavailable

<details><summary>Answer</summary>B) When construction is expensive and many similar variants are needed; or when you don't know the concrete type at compile time — Prototype is preferred when object construction is expensive and many similar variants are needed at runtime.</details>

---

### Q150: What is the role of `implements Cloneable` (Java's built-in) in the Coder Army example?
- A) Required for the pattern
- B) The Coder Army example defines its OWN `Cloneable` interface
- C) Enables serialization
- D) Prevents deep copy

<details><summary>Answer</summary>B) The Coder Army example defines its OWN `Cloneable` interface — NOT Java's `java.lang.Cloneable`, which is just a marker interface.</details>

---

### Q151: Prototype vs Copy Constructor:
- A) Identical
- B) Prototype: client requests clone via interface without knowing concrete type. Copy constructor: client knows the concrete type and calls `new ConcreteType(original)`
- C) Copy constructor is Prototype
- D) Prototype uses serialization

<details><summary>Answer</summary>B) Prototype: client requests clone via interface without knowing concrete type. Copy constructor: client knows the concrete type and calls `new ConcreteType(original)` — Prototype clones via an interface (client doesn't know the concrete type); copy constructor requires knowing the exact class.</details>

---

### Q152: After `alien = null` in the Coder Army example, do the clones survive?
- A) No — they are garbage collected
- B) Yes
- C) Yes but they become null too
- D) Depends on GC

<details><summary>Answer</summary>B) Yes — clones have independent references; nulling `alien` only removes the `alien` variable's reference, not the clones.</details>

---

### Q153: A Prototype Registry with `Map<String, NPC> templates` — if you `get("alien")` and MODIFY the returned NPC directly (without cloning):
- A) No problem — each get() is a new instance
- B) Bug
- C) Throws exception
- D) Template is immutable

<details><summary>Answer</summary>B) Bug — you're modifying the template; all future clones will be affected. Always clone the retrieved prototype.</details>

---

### Q154: Deep copy of `NPC` with a `List<Weapon> weapons` field requires:
- A) `Collections.unmodifiableList(weapons)`
- B) Returning the same list
- C) Copying the list AND cloning each `Weapon` object individually
- D) Making `weapons` a `String`

<details><summary>Answer</summary>C) Copying the list AND cloning each `Weapon` object individually — Deep copying a collection requires copying the collection itself AND cloning each element individually.</details>

---

### Hard (Q155–Q158)

### Q155: `Object.clone()` does a shallow copy by default. To make it deep, you:
- A) Override `toString()`
- B) Override `clone()` and manually deep-copy each mutable field
- C) Implement `Serializable`
- D) Use `volatile`

<details><summary>Answer</summary>B) Override `clone()` and manually deep-copy each mutable field — The default `Object.clone()` is shallow; deep copy requires manually overriding `clone()` to copy each mutable field.</details>

---

### Q156: Prototype pattern violates which principle slightly?
- A) OCP
- B) DIP
- C) SRP
- D) ISP

<details><summary>Answer</summary>C) SRP — the prototype has two responsibilities: its own behavior AND cloning itself.</details>

---

### Q157: A Prototype + Registry system allows registering new types at runtime. This supports:
- A) LSP
- B) OCP
- C) SRP
- D) ISP

<details><summary>Answer</summary>B) OCP — new types can be registered without modifying any existing code.</details>

---

### Q158: Why is `java.lang.Cloneable` considered a poorly designed interface?
- A) It has too many methods
- B) It's a marker interface with no `clone()` method
- C) It enables shallow copy only
- D) It breaks encapsulation

<details><summary>Answer</summary>B) It's a marker interface with no `clone()` method — `clone()` is in `Object`, so you can't call `clone()` on a `Cloneable` reference without casting.</details>

---

## SECTION 8 — Adapter (Q159–Q178)

### Easy (Q159–Q163)

### Q159: Adapter pattern is classified as:
- A) Creational
- B) Behavioral
- C) Concurrency
- D) Structural

<details><summary>Answer</summary>D) Structural — Adapter is a Structural pattern that converts one interface into another.</details>

---

### Q160: The Adapter pattern converts:
- A) Objects to primitives
- B) An incompatible interface into one the client expects
- C) Multiple objects into one
- D) Concrete classes into abstractions

<details><summary>Answer</summary>B) An incompatible interface into one the client expects — Adapter wraps an incompatible service and exposes the interface the client expects.</details>

---

### Q161: In the Coder Army example, `XmlDataProvider` is the:
- A) Target
- B) Adapter
- C) Adaptee
- D) Client

<details><summary>Answer</summary>C) Adaptee — `XmlDataProvider` is the existing class with an incompatible interface that needs to be adapted.</details>

---

### Q162: `XmlDataProviderAdapter` implements:
- A) `XmlDataProvider`
- B) Both interfaces
- C) `IReports`
- D) Neither

<details><summary>Answer</summary>C) `IReports` — the Target interface.</details>

---

### Q163: Object Adapter uses:
- A) Inheritance from Adaptee
- B) Composition
- C) Reflection
- D) Static methods

<details><summary>Answer</summary>B) Composition — holds a reference to the Adaptee.</details>

---

### Medium (Q164–Q173)

### Q164: Class Adapter vs Object Adapter:
- A) Class Adapter uses composition; Object Adapter uses inheritance
- B) Class Adapter extends the Adaptee (inheritance); Object Adapter holds the Adaptee
- C) They are identical
- D) Object Adapter is deprecated

<details><summary>Answer</summary>B) Class Adapter extends the Adaptee (inheritance); Object Adapter holds the Adaptee — composition.</details>

---

### Q165: Why can't you always use Class Adapter in Java?
- A) Java doesn't support inheritance
- B) Java has single inheritance
- C) Class Adapter is slower
- D) Class Adapter creates circular references

<details><summary>Answer</summary>B) Java has single inheritance — Adapter can only extend one class, so if Adapter must also extend Target, it cannot.</details>

---

### Q166: The Client in the Adapter pattern:
- A) Knows about the Adaptee
- B) Knows about the Adapter
- C) Knows only about the Target interface
- D) Creates the Adapter

<details><summary>Answer</summary>C) Knows only about the Target interface — The client only interacts with the Target interface, keeping it decoupled from the Adaptee and Adapter implementation details.</details>

---

### Q167: When should you use Adapter?
- A) When you need multiple instances of one class
- B) When you want to add behavior
- C) When integrating a legacy/third-party class with an incompatible interface into your system
- D) When you need lazy loading

<details><summary>Answer</summary>C) When integrating a legacy/third-party class with an incompatible interface into your system — Adapter is specifically designed for integrating classes with incompatible interfaces into your system.</details>

---

### Q168: Adapter vs Facade:
- A) Both convert interfaces
- B) Adapter adapts ONE incompatible interface; Facade simplifies a COMPLEX subsystem behind a simple interface
- C) Facade adapts incompatible interfaces
- D) They are identical

<details><summary>Answer</summary>B) Adapter adapts ONE incompatible interface; Facade simplifies a COMPLEX subsystem behind a simple interface — Adapter converts one specific interface; Facade provides a simplified unified interface to an entire complex subsystem.</details>

---

### Q169: Adapter vs Decorator:
- A) Both add behavior
- B) Decorator changes the interface; Adapter does not
- C) Adapter changes the INTERFACE (makes incompatible become compatible); Decorator keeps the same interface but adds behavior
- D) Identical

<details><summary>Answer</summary>C) Adapter changes the INTERFACE (makes incompatible become compatible); Decorator keeps the same interface but adds behavior — Adapter converts the interface to make it compatible; Decorator keeps the same interface but adds new behavior.</details>

---

### Q170: In the Coder Army example, the conversion of XML string to JSON string happens in:
- A) `XmlDataProvider`
- B) `Client`
- C) `XmlDataProviderAdapter.getJsonData()`
- D) The `IReports` interface

<details><summary>Answer</summary>C) `XmlDataProviderAdapter.getJsonData()` — The conversion logic from XML to JSON lives in the Adapter's `getJsonData()` method.</details>

---

### Q171: Two-way Adapter:
- A) Is impossible in Java
- B) Implements BOTH interfaces and can adapt in either direction
- C) Uses Abstract Factory
- D) Is the same as Facade

<details><summary>Answer</summary>B) Implements BOTH interfaces and can adapt in either direction — A two-way Adapter implements both interfaces and can translate calls in either direction.</details>

---

### Q172: Adding a third data provider (e.g., `CsvDataProvider`) to the Coder Army system requires:
- A) Modifying `IReports`
- B) Modifying `Client`
- C) Creating a new `CsvDataProviderAdapter implements IReports`
- D) Modifying `XmlDataProviderAdapter`

<details><summary>Answer</summary>C) Creating a new `CsvDataProviderAdapter implements IReports` — OCP.</details>

---

### Q173: Which scenario DOES NOT call for Adapter?
- A) Legacy payment gateway with different method names
- B) Third-party weather API with different data format
- C) Old XML provider in a JSON-based system
- D) Creating a family of related objects consistently

<details><summary>Answer</summary>D) Creating a family of related objects consistently — Creating families of related objects is the job of Abstract Factory, not Adapter.</details>

---

### Hard (Q174–Q178)

### Q174: Object Adapter wrapping an Adaptee subclass:
- A) Is not possible
- B) Is the same as Class Adapter
- C) Works
- D) Breaks LSP

<details><summary>Answer</summary>C) Works — since the Adapter holds a reference to the Adaptee type, you can pass a subclass; adds flexibility.</details>

---

### Q175: An Adapter that also adds logging before delegating is acting as:
- A) Only Adapter
- B) Only Decorator
- C) Both — it adapts the interface AND adds behavior
- D) Facade

<details><summary>Answer</summary>C) Both — it adapts the interface AND adds behavior — it's a pragmatic combination.</details>

---

### Q176: What happens to the Adaptee's methods NOT exposed by the Target interface?
- A) They are deleted
- B) Adapter must expose all
- C) They are simply not accessible through the Target interface
- D) They cause compile errors

<details><summary>Answer</summary>C) They are simply not accessible through the Target interface — the Adapter only wraps what the Client needs.</details>

---

### Q177: Adapter pattern consequence for testability:
- A) Harder to test
- B) Easier
- C) No difference
- D) Requires integration tests only

<details><summary>Answer</summary>B) Easier — you can mock the `IReports` Target interface without involving the real Adaptee.</details>

---

### Q178: Which is the best description of the "impedance mismatch" that Adapter solves?
- A) Performance difference
- B) Language difference
- C) Interface incompatibility
- D) Data format mismatch only

<details><summary>Answer</summary>C) Interface incompatibility — the client's expected interface doesn't match the service's provided interface.</details>

---

## SECTION 9 — Decorator (Q179–Q200)

### Easy (Q179–Q183)

### Q179: Decorator pattern adds behavior to objects:
- A) Via inheritance
- B) Via reflection
- C) Via composition
- D) Via static methods

<details><summary>Answer</summary>C) Via composition — wrapping the object.</details>

---

### Q180: Decorator maintains:
- A) A different interface from the component
- B) The SAME interface as the component
- C) An abstract interface only
- D) No interface

<details><summary>Answer</summary>B) The SAME interface as the component — Decorator implements the same interface as the component it wraps, making it transparent to the client.</details>

---

### Q181: In the Coder Army Mario example, `CharacterDecorator` is:
- A) A concrete component
- B) The client
- C) The abstract decorator
- D) The interface

<details><summary>Answer</summary>C) The abstract decorator — IS-A `Character` AND HAS-A `Character`.</details>

---

### Q182: Decorator pattern belongs to:
- A) Creational
- B) Behavioral
- C) Concurrency
- D) Structural

<details><summary>Answer</summary>D) Structural — Decorator is a Structural pattern that attaches additional responsibilities to objects dynamically.</details>

---

### Q183: Which Java class is a classic example of Decorator?
- A) `ArrayList`
- B) `HashMap`
- C) `BufferedInputStream` wrapping `FileInputStream`
- D) `String`

<details><summary>Answer</summary>C) `BufferedInputStream` wrapping `FileInputStream` — `BufferedInputStream` wraps `FileInputStream` adding buffering behavior while keeping the same `InputStream` interface.</details>

---

### Medium (Q184–Q194)

### Q184: What is printed?
```java
Character mario = new Mario();
mario = new GunPowerUp(new HeightUp(mario));
System.out.println(mario.getAbilities());
```
- A) `Mario with HeightUp with Gun`
- B) `Mario with Gun with HeightUp`
- C) `Mario with HeightUp with Gun`
- D) `Mario`

<details><summary>Answer</summary>C) `Mario with HeightUp with Gun` — inner-first: HeightUp wraps Mario, Gun wraps HeightUp.</details>

---

### Q185: Decorator vs Subclassing for behavior addition:
- A) Identical results
- B) Subclassing is always better
- C) Decorator is preferred when combinations of behaviors are needed at runtime; subclassing causes class explosion
- D) Decorator requires reflection

<details><summary>Answer</summary>C) Decorator is preferred when combinations of behaviors are needed at runtime; subclassing causes class explosion — 2^N combinations.</details>

---

### Q186: `CharacterDecorator` stores `protected Character character`. Why `protected`?
- A) For thread safety
- B) Allows concrete decorator subclasses to call `character.getAbilities()` without a getter
- C) Required by Java
- D) Makes it immutable

<details><summary>Answer</summary>B) Allows concrete decorator subclasses to call `character.getAbilities()` without a getter — `protected` lets concrete decorator subclasses access the wrapped component directly without needing a getter method.</details>

---

### Q187: What is the output of:
```java
Character c = new StarPowerUp(new StarPowerUp(new Mario()));
System.out.println(c.getAbilities());
```
- A) `Mario with Star Power (Limited Time)`
- B) Compile error
- C) `Mario with Star Power (Limited Time) with Star Power (Limited Time)`
- D) Runtime error

<details><summary>Answer</summary>C) `Mario with Star Power (Limited Time) with Star Power (Limited Time)` — decorators stack, even same one.</details>

---

### Q188: Decorator follows OCP because:
- A) You modify the component class to add features
- B) New decorators can be added without changing the component or existing decorators
- C) Decorators cannot be extended
- D) The component must be modified

<details><summary>Answer</summary>B) New decorators can be added without changing the component or existing decorators — New decorator classes can be created to add features without modifying the component or existing decorators.</details>

---

### Q189: Decorator vs Strategy:
- A) Identical
- B) Strategy replaces the WHOLE algorithm; Decorator adds behavior to an existing one by wrapping
- C) Decorator replaces algorithms
- D) Strategy wraps objects

<details><summary>Answer</summary>B) Strategy replaces the WHOLE algorithm; Decorator adds behavior to an existing one by wrapping — Strategy swaps the entire algorithm implementation; Decorator wraps and enhances existing behavior incrementally.</details>

---

### Q190: The order of decorator stacking:
- A) Doesn't matter
- B) Matters
- C) Is randomized at runtime
- D) Is determined by the component class

<details><summary>Answer</summary>B) Matters — `new A(new B(mario))` applies B first, then A on top.</details>

---

### Q191: Can you remove a decorator at runtime?
- A) Yes, via `removeDecorator()` method
- B) Not directly
- C) Yes, using `setDecorator(null)`
- D) Yes, decorators are automatically removable

<details><summary>Answer</summary>B) Not directly — you'd need to re-create the decoration chain without the unwanted one.</details>

---

### Q192: Java I/O stream `new DataOutputStream(new BufferedOutputStream(new FileOutputStream("f.txt")))` is:
- A) Builder pattern
- B) Decorator pattern — each stream wraps the previous one, adding behavior
- C) Proxy pattern
- D) Composite pattern

<details><summary>Answer</summary>B) Decorator pattern — each stream wraps the previous one, adding behavior — buffering, data formatting.</details>

---

### Q193: Decorator and Proxy both wrap objects. The key distinction:
- A) Proxy uses composition; Decorator does not
- B) Decorator changes the interface; Proxy keeps it
- C) Proxy CONTROLS ACCESS to the subject; Decorator ADDS BEHAVIOR to the subject
- D) They are identical

<details><summary>Answer</summary>C) Proxy CONTROLS ACCESS to the subject; Decorator ADDS BEHAVIOR to the subject — Proxy controls access (authentication, lazy loading, caching); Decorator adds new behavior to the subject.</details>

---

### Q194: An abstract decorator class vs concrete decorator directly implementing the component interface:
- A) Must always use abstract decorator
- B) Abstract decorator handles the delegation boilerplate; concrete decorators just add their specific behavior
- C) Direct implementation is always better
- D) Neither is valid

<details><summary>Answer</summary>B) Abstract decorator handles the delegation boilerplate; concrete decorators just add their specific behavior — cleaner design.</details>

---

### Hard (Q195–Q200)

### Q195: `mario.getAbilities()` returns a `String`. If `StarPowerUp` needs to OVERRIDE the return type, what happens?
- A) Works automatically
- B) Compile error
- C) Works if the return type is a subtype (covariant); if same type, it works directly
- D) Requires casting

<details><summary>Answer</summary>C) Works if the return type is a subtype (covariant); if same type, it works directly — Decorator doesn't change the interface, so return type stays `String`.</details>

---

### Q196: What SOLID principle violation would occur if `HeightUp` directly modified `Mario`'s internal state instead of wrapping it?
- A) ISP
- B) DIP
- C) OCP
- D) SRP

<details><summary>Answer</summary>C) OCP — modifying the component (Mario) violates "closed for modification".</details>

---

### Q197: Thread-safety concern with Decorator:
- A) None — Decorator is always thread-safe
- B) If the wrapped component is stateful and not thread-safe, the decorator inherits that problem; the decorator itself doesn't add/remove thread safety
- C) Decorators make everything thread-safe
- D) Only the outer decorator needs synchronization

<details><summary>Answer</summary>B) If the wrapped component is stateful and not thread-safe, the decorator inherits that problem; the decorator itself doesn't add/remove thread safety — Decorator delegates to the wrapped component, so if that component is not thread-safe, the decorator inherits the thread-safety issue.</details>

---

### Q198: A decorator that catches exceptions from the wrapped component and returns default values is acting as:
- A) Proxy
- B) Adapter
- C) Facade
- D) Both Decorator (wrapping same interface) and a resilience pattern

<details><summary>Answer</summary>D) Both Decorator (wrapping same interface) and a resilience pattern — this is acceptable pragmatic design.</details>

---

### Q199: How many `Character` objects exist after:
```java
Character c = new StarPowerUp(new GunPowerUp(new HeightUp(new Mario())));
```
- A) 1
- B) 2
- C) 3
- D) 4

<details><summary>Answer</summary>D) 4 — one `Mario` + three decorator wrapper objects.</details>

---

### Q200: Decorator pattern's relationship to the Composite pattern:
- A) Identical
- B) Both use recursive composition; Composite organizes trees of components; Decorator wraps a single component with added behavior
- C) Decorator is a subtype of Composite
- D) Unrelated

<details><summary>Answer</summary>B) Both use recursive composition; Composite organizes trees of components; Decorator wraps a single component with added behavior — Both use recursive composition, but Composite organizes tree structures while Decorator adds behavior to a single component.</details>

---

## SECTION 10 — Flyweight (Q201–Q220)

### Easy (Q201–Q205)

### Q201: Flyweight pattern's primary goal is:
- A) Thread safety
- B) Minimizing memory usage by sharing common state
- C) Simplifying interfaces
- D) Controlling access

<details><summary>Answer</summary>B) Minimizing memory usage by sharing common state — Flyweight minimizes memory usage by sharing common (intrinsic) state across many objects.</details>

---

### Q202: Intrinsic state in Flyweight is:
- A) Unique per object
- B) Shared
- C) Always a primitive
- D) Passed as a parameter

<details><summary>Answer</summary>B) Shared — stored in the Flyweight object.</details>

---

### Q203: Extrinsic state in Flyweight is:
- A) Shared across objects
- B) Stored in the Flyweight
- C) Unique per instance
- D) Always `final`

<details><summary>Answer</summary>C) Unique per instance — stored in the context or passed at runtime.</details>

---

### Q204: Flyweight pattern belongs to:
- A) Creational
- B) Behavioral
- C) Structural
- D) Concurrency

<details><summary>Answer</summary>C) Structural — Flyweight is a Structural pattern focused on efficient memory usage through sharing.</details>

---

### Q205: In the Coder Army asteroid example, how many `AsteroidFlyweight` objects exist for 1,000,000 asteroids?
- A) 1,000,000
- B) 500,000
- C) 1,000
- D) 3

<details><summary>Answer</summary>D) 3 — one per asteroid type.</details>

---

### Medium (Q206–Q215)

### Q206: Flyweight Factory responsibility:
- A) Creating context objects
- B) Managing the pool of flyweight objects
- C) Storing extrinsic state
- D) Cloning flyweights

<details><summary>Answer</summary>B) Managing the pool of flyweight objects — returning existing ones or creating new ones if the key doesn't exist.</details>

---

### Q207: In the asteroid example, `posX`, `posY`, `velocityX`, `velocityY` are:
- A) Intrinsic state
- B) Extrinsic state
- C) Both
- D) Neither

<details><summary>Answer</summary>B) Extrinsic state — unique per asteroid instance, stored in `AsteroidContext`.</details>

---

### Q208: `color`, `texture`, `material` are:
- A) Extrinsic state
- B) Intrinsic state
- C) Both
- D) Context state

<details><summary>Answer</summary>B) Intrinsic state — shared among all asteroids of the same type.</details>

---

### Q209: Java's Integer cache from -128 to 127 is an example of:
- A) Singleton
- B) Prototype
- C) Flyweight
- D) Factory

<details><summary>Answer</summary>C) Flyweight — the same Integer objects are reused for small values.</details>

---

### Q210: `String` interning in Java is another example of:
- A) Builder
- B) Observer
- C) Flyweight
- D) Proxy

<details><summary>Answer</summary>C) Flyweight — the JVM pools String literals to avoid duplicate objects.</details>

---

### Q211: Flyweight `render(posX, posY, velX, velY)` receives extrinsic state as:
- A) Fields of the flyweight
- B) Parameters passed at the time of rendering
- C) Static fields
- D) Stored in the factory

<details><summary>Answer</summary>B) Parameters passed at the time of rendering — Extrinsic state is passed as method parameters at call time, not stored in the flyweight.</details>

---

### Q212: Without Flyweight, 1M asteroids with full properties use ~1MB per object = 1TB. With Flyweight, 3 shared objects + 1M context objects (each ~24 bytes) = ~24MB. This is:
- A) An insignificant improvement
- B) A Singleton benefit
- C) A ~42,000x memory reduction
- D) An Adapter benefit

<details><summary>Answer</summary>C) A ~42,000x memory reduction — exactly what Flyweight provides.</details>

---

### Q213: Flyweight Factory uses a `Map<String, AsteroidFlyweight>` as:
- A) A registry of all asteroids
- B) An object pool / cache of shared flyweight objects keyed by their intrinsic state
- C) A list of contexts
- D) A factory registry

<details><summary>Answer</summary>B) An object pool / cache of shared flyweight objects keyed by their intrinsic state — The `Map` acts as an object pool/cache, storing shared flyweight instances keyed by their intrinsic state identifier.</details>

---

### Q214: Can you modify a Flyweight's intrinsic state at runtime?
- A) Yes, that's the point
- B) No
- C) Only via the factory
- D) Only with synchronization

<details><summary>Answer</summary>B) No — intrinsic state must be immutable because it's shared; modifying it would affect all users.</details>

---

### Q215: Flyweight vs Singleton:
- A) Both have one instance
- B) Flyweight manages MULTIPLE shared instances (one per type); Singleton manages exactly ONE
- C) Flyweight creates many unique objects
- D) Singleton pools objects

<details><summary>Answer</summary>B) Flyweight manages MULTIPLE shared instances (one per type); Singleton manages exactly ONE — Flyweight manages multiple shared instances (one per type); Singleton manages exactly one global instance.</details>

---

### Hard (Q216–Q220)

### Q216: When is Flyweight NOT beneficial?
- A) When objects have lots of shared state
- B) When memory is a concern
- C) When extrinsic state is too large
- D) When a factory is available

<details><summary>Answer</summary>C) When extrinsic state is too large — passing huge extrinsic data per call offsets the memory savings.</details>

---

### Q217: Thread-safety concern with Flyweight:
- A) None — Flyweight is always thread-safe
- B) The Flyweight Factory's `Map` and the flyweight creation logic need synchronization if accessed concurrently
- C) Context objects need synchronization
- D) Flyweight objects are inherently synchronized

<details><summary>Answer</summary>B) The Flyweight Factory's `Map` and the flyweight creation logic need synchronization if accessed concurrently — The factory's `Map` and creation logic need synchronization if accessed concurrently from multiple threads.</details>

---

### Q218: `AsteroidFactory.flyweights` is a `static Map`. This means:
- A) It's thread-safe automatically
- B) Each class has its own map
- C) It's shared across all instances of `AsteroidFactory`
- D) It resets each call

<details><summary>Answer</summary>C) It's shared across all instances of `AsteroidFactory` — be careful with concurrent access.</details>

---

### Q219: Flyweight applied to a text editor: 26 letter shapes are shared. Each placed letter stores its position. Moving a letter:
- A) Modifies the shared flyweight
- B) Updates the context's position
- C) Creates a new flyweight
- D) Requires cloning

<details><summary>Answer</summary>B) Updates the context's position — the flyweight shape stays unchanged.</details>

---

### Q220: Distinguishing when to split state into intrinsic vs extrinsic:
- A) All state should be intrinsic
- B) All state should be extrinsic
- C) Intrinsic: state identical across many instances (shared safely). Extrinsic: state unique per instance
- D) Randomly decide

<details><summary>Answer</summary>C) Intrinsic: state identical across many instances (shared safely). Extrinsic: state unique per instance — cannot be shared.</details>

---

## SECTION 11 — Proxy (Q221–Q242)

### Easy (Q221–Q225)

### Q221: Proxy pattern provides:
- A) A new interface
- B) A surrogate that controls access to the real object
- C) Multiple instances
- D) A family of objects

<details><summary>Answer</summary>B) A surrogate that controls access to the real object — Proxy provides a surrogate or placeholder that controls access to another object.</details>

---

### Q222: Virtual Proxy is used for:
- A) Access control
- B) Remote calls
- C) Lazy initialization
- D) Caching

<details><summary>Answer</summary>C) Lazy initialization — defer expensive object creation until first use.</details>

---

### Q223: Protection Proxy is used for:
- A) Lazy loading
- B) Access control
- C) Caching
- D) Cloning

<details><summary>Answer</summary>B) Access control — check permissions before delegating to the real subject.</details>

---

### Q224: In the Coder Army Protection Proxy, non-premium users get:
- A) A half-unlocked PDF
- B) Access denied message
- C) An exception
- D) A free trial

<details><summary>Answer</summary>B) Access denied message — proxy returns early without calling `RealDocumentReader`.</details>

---

### Q225: Proxy and the real subject implement:
- A) Different interfaces
- B) Abstract classes
- C) The same interface
- D) No interface

<details><summary>Answer</summary>C) The same interface — client code doesn't need to change.</details>

---

### Medium (Q226–Q236)

### Q226: Smart Proxy adds:
- A) Lazy loading
- B) Authentication
- C) Additional behavior like caching, logging, or reference counting when accessing the real object
- D) Remote connectivity

<details><summary>Answer</summary>C) Additional behavior like caching, logging, or reference counting when accessing the real object — Smart Proxy adds cross-cutting concerns like caching, logging, or reference counting around the real object's operations.</details>

---

### Q227: Remote Proxy:
- A) Controls access locally
- B) Represents a remote object
- C) Adds behavior
- D) Lazy-loads the object

<details><summary>Answer</summary>B) Represents a remote object — hides network communication behind a local interface.</details>

---

### Q228: In the Virtual Proxy, `RealImage` is only created when:
- A) `ImageProxy` is created
- B) `display()` is called for the first time
- C) The proxy is garbage collected
- D) The filename is set

<details><summary>Answer</summary>B) `display()` is called for the first time — lazy initialization.</details>

---

### Q229: Proxy vs Adapter:
- A) Both change the interface
- B) Proxy keeps the SAME interface; Adapter CHANGES the interface to what the client expects
- C) Adapter keeps the same interface
- D) Identical

<details><summary>Answer</summary>B) Proxy keeps the SAME interface; Adapter CHANGES the interface to what the client expects — Proxy preserves the same interface as the real subject; Adapter changes the interface to match client expectations.</details>

---

### Q230: Proxy vs Decorator:
- A) Proxy adds behavior; Decorator controls access
- B) Identical
- C) Proxy CONTROLS ACCESS (auth, lazy load); Decorator ADDS BEHAVIOR
- D) Decorator has a different interface

<details><summary>Answer</summary>C) Proxy CONTROLS ACCESS (auth, lazy load); Decorator ADDS BEHAVIOR — logging, transformation.</details>

---

### Q231: A logging proxy that records every method call:
- A) Is a Protection Proxy
- B) Is a Virtual Proxy
- C) Is a Smart Proxy
- D) Is a Remote Proxy

<details><summary>Answer</summary>C) Is a Smart Proxy — adds cross-cutting concern.</details>

---

### Q232: Caching Proxy:
- A) Loads objects lazily
- B) Returns a cached result on repeated calls instead of invoking the expensive real subject
- C) Controls permissions
- D) Hides network calls

<details><summary>Answer</summary>B) Returns a cached result on repeated calls instead of invoking the expensive real subject — Caching Proxy stores results from previous calls and returns cached data instead of invoking the expensive real subject again.</details>

---

### Q233: In the Coder Army example, `DocumentProxy` holds a reference to `RealDocumentReader`. This is:
- A) Inheritance
- B) Composition
- C) Factory
- D) Cloning

<details><summary>Answer</summary>B) Composition — proxy holds the real subject.</details>

---

### Q234: A Null Object pattern vs Protection Proxy:
- A) Identical
- B) Null Object provides a no-op default implementation; Protection Proxy actively guards access and may throw/deny
- C) Protection Proxy is a type of Null Object
- D) Neither controls access

<details><summary>Answer</summary>B) Null Object provides a no-op default implementation; Protection Proxy actively guards access and may throw/deny — Null Object provides a do-nothing default; Protection Proxy actively checks permissions and may deny access.</details>

---

### Q235: What happens to a Virtual Proxy after the real object is loaded?
- A) Proxy is discarded
- B) Proxy now delegates all calls directly to the real object
- C) Proxy creates a new instance each call
- D) Proxy becomes a factory

<details><summary>Answer</summary>B) Proxy now delegates all calls directly to the real object — already initialized.</details>

---

### Q236: Can a Proxy add synchronization to make a non-thread-safe subject thread-safe?
- A) No — proxy cannot add synchronization
- B) Yes
- C) Only with `volatile`
- D) Only via inheritance

<details><summary>Answer</summary>B) Yes — a synchronization proxy wraps method calls with `synchronized` blocks; this is a common Smart Proxy use.</details>

---

### Hard (Q237–Q242)

### Q237: Java's `java.lang.reflect.Proxy` creates:
- A) Static compile-time proxies
- B) Dynamic proxies
- C) Prototype-based proxies
- D) Singleton proxies

<details><summary>Answer</summary>B) Dynamic proxies — at runtime, creates a proxy class that implements specified interfaces and delegates to an `InvocationHandler`.</details>

---

### Q238: AOP (Aspect-Oriented Programming) cross-cutting concerns (logging, transactions) use:
- A) Decorator
- B) Strategy
- C) Proxy
- D) Observer

<details><summary>Answer</summary>C) Proxy — framework generates proxy objects that wrap your beans and inject aspects.</details>

---

### Q239: A Proxy that also adapts the interface is technically:
- A) Only Proxy
- B) Only Adapter
- C) A blend
- D) Neither

<details><summary>Answer</summary>C) A blend — such "adapting proxies" exist in practice; the dominant pattern is determined by primary intent.</details>

---

### Q240: What is the performance concern with Virtual Proxy?
- A) Too many objects
- B) The first call incurs the full initialization cost (same as without proxy); subsequent calls are fast since object is already loaded
- C) Proxy adds overhead on every call
- D) No concern — always faster

<details><summary>Answer</summary>B) The first call incurs the full initialization cost (same as without proxy); subsequent calls are fast since object is already loaded — The first call pays the full initialization cost; subsequent calls are fast since the real object is already loaded.</details>

---

### Q241: Protection Proxy in the Coder Army example creates `RealDocumentReader` eagerly in the constructor. This means:
- A) It's a Virtual Proxy
- B) The real reader is always created even if access is denied
- C) It's more efficient
- D) The constructor is wrong

<details><summary>Answer</summary>B) The real reader is always created even if access is denied — a Virtual Proxy would defer this too.</details>

---

### Q242: Decorator stacks cleanly; Proxy typically:
- A) Also stacks
- B) Wraps a single subject
- C) Cannot wrap subjects
- D) Only works with interfaces

<details><summary>Answer</summary>B) Wraps a single subject — stacking multiple proxies is unusual, though technically possible.</details>

---

## SECTION 12 — Observer (Q243–Q262)

### Easy (Q243–Q247)

### Q243: Observer pattern intent:
- A) Create objects efficiently
- B) Convert interfaces
- C) Define a one-to-many dependency: when the subject's state changes, all dependents are notified
- D) Control access

<details><summary>Answer</summary>C) Define a one-to-many dependency: when the subject's state changes, all dependents are notified — Observer defines a one-to-many dependency where state changes in the subject trigger notifications to all observers.</details>

---

### Q244: In Observer, the `Subject` is also called:
- A) Observer
- B) Observable or Publisher
- C) Strategy
- D) Context

<details><summary>Answer</summary>B) Observable or Publisher — The subject (also called Observable or Publisher) maintains a list of observers and notifies them of changes.</details>

---

### Q245: In Observer, `Observer`s are also called:
- A) Subjects
- B) Factories
- C) Listeners or Subscribers
- D) Adapters

<details><summary>Answer</summary>C) Listeners or Subscribers — Observers are also called Listeners or Subscribers in event-driven terminology.</details>

---

### Q246: In the Coder Army example, `Channel` is the:
- A) Observer
- B) Observable
- C) Adapter
- D) Factory

<details><summary>Answer</summary>B) Observable — Subject.</details>

---

### Q247: When `channel.unsubscribe(s1)` is called, subscriber `s1`:
- A) Is deleted
- B) Still receives future notifications
- C) No longer receives future notifications from the channel
- D) Receives a final notification

<details><summary>Answer</summary>C) No longer receives future notifications from the channel — After unsubscribing, the observer is removed from the notification list and receives no future updates.</details>

---

### Medium (Q248–Q257)

### Q248: Push vs Pull model in Observer:
- A) Identical
- B) Push: subject sends data in notification. Pull: observer fetches data from subject after notification
- C) Pull sends data; Push doesn't
- D) Neither sends data

<details><summary>Answer</summary>B) Push: subject sends data in notification. Pull: observer fetches data from subject after notification — Push model sends data with the notification; Pull model lets the observer fetch what it needs from the subject after being notified.</details>

---

### Q249: In the Coder Army example, `Subscriber.update()` calls `channel.getVideoData()`. This is:
- A) Push model
- B) Pull model
- C) Neither
- D) Factory method

<details><summary>Answer</summary>B) Pull model — subscriber pulls data from the channel after being notified.</details>

---

### Q250: Observer vs Event-driven architecture:
- A) Identical
- B) Observer is always synchronous; event-driven always async
- C) Observer is typically synchronous in-process; event-driven often uses message queues for decoupled async communication
- D) Observer is a type of message queue

<details><summary>Answer</summary>C) Observer is typically synchronous in-process; event-driven often uses message queues for decoupled async communication — Observer is typically synchronous and in-process; event-driven architecture uses message queues for decoupled async communication.</details>

---

### Q251: Observer pattern most directly supports:
- A) SRP
- B) OCP
- C) LSP
- D) DIP

<details><summary>Answer</summary>B) OCP — new observers can subscribe without changing the subject.</details>

---

### Q252: Why does Observer reduce coupling?
- A) Because subject and observers share a base class
- B) Subject only knows the observer INTERFACE, not concrete observer classes
- C) Because there's only one observer
- D) Because observers don't call the subject

<details><summary>Answer</summary>B) Subject only knows the observer INTERFACE, not concrete observer classes — The subject depends only on the observer interface, not on concrete observer implementations, reducing coupling.</details>

---

### Q253: `notifySubscribers()` in the Coder Army example iterates over all subscribers and calls `update()`. This is:
- A) Pull model
- B) Factory pattern
- C) Push notification
- D) Strategy pattern

<details><summary>Answer</summary>C) Push notification — the channel initiates and broadcasts to all.</details>

---

### Q254: What happens if an observer throws an exception in `update()`?
- A) Other observers still get notified (exception is caught internally)
- B) Subject stops working
- C) In the Coder Army simple implementation
- D) Observer is automatically unsubscribed

<details><summary>Answer</summary>C) In the Coder Army simple implementation — the exception propagates and remaining observers may NOT be notified.</details>

---

### Q255: Concurrent modification in Observer — iterating `subscribers` while one tries to `unsubscribe()`:
- A) Works fine
- B) Throws `ConcurrentModificationException`
- C) Silently ignores the unsubscribe
- D) Always crashes

<details><summary>Answer</summary>B) Throws `ConcurrentModificationException` — use `CopyOnWriteArrayList` or synchronize access.</details>

---

### Q256: Observer in Java Swing (e.g., `ActionListener`) is an example of:
- A) Strategy
- B) Observer
- C) Decorator
- D) Builder

<details><summary>Answer</summary>B) Observer — UI components notify listeners when events occur.</details>

---

### Q257: Observer vs Mediator:
- A) Identical
- B) Observer: subjects notify observers directly. Mediator: all communication goes through a central mediator
- C) Mediator is a type of Observer
- D) Mediator sends to one; Observer broadcasts

<details><summary>Answer</summary>B) Observer: subjects notify observers directly. Mediator: all communication goes through a central mediator — no direct coupling between components.</details>

---

### Hard (Q258–Q262)

### Q258: Memory leak in Observer: observer holds reference to subject and doesn't unsubscribe. This:
- A) Has no effect
- B) Crashes immediately
- C) Prevents GC of the observer even after it's logically done
- D) Only affects subject

<details><summary>Answer</summary>C) Prevents GC of the observer even after it's logically done — a common source of memory leaks.</details>

---

### Q259: `notifySubscribers()` calls `update()` synchronously on each subscriber. If subscriber 2 takes 5 seconds:
- A) Subscribers 1 and 3 proceed independently
- B) All subsequent subscribers wait
- C) The subject times out
- D) Subscriber 2 runs in a new thread automatically

<details><summary>Answer</summary>B) All subsequent subscribers wait — synchronous notification blocks the subject's thread.</details>

---

### Q260: Event sourcing architectures apply Observer-like notification where:
- A) Only one subscriber can exist
- B) State changes are published as immutable events; multiple consumers process them independently, often asynchronously
- C) The subject stores all state
- D) Observers directly modify the subject

<details><summary>Answer</summary>B) State changes are published as immutable events; multiple consumers process them independently, often asynchronously — In event sourcing, state changes are published as immutable events that multiple independent consumers process, often asynchronously.</details>

---

### Q261: Why should observers not call `subscribe()` or `unsubscribe()` on the subject during `update()`?
- A) It's invalid Java
- B) Can cause `ConcurrentModificationException` or infinite notification loops if not handled
- C) Observer cannot access the subject
- D) The subject ignores re-subscription

<details><summary>Answer</summary>B) Can cause `ConcurrentModificationException` or infinite notification loops if not handled — Modifying the subscriber list during iteration can cause `ConcurrentModificationException` or infinite loops.</details>

---

### Q262: `java.util.Observable` (deprecated in Java 9) used inheritance. The problem was:
- A) Observable is an interface
- B) It required subclassing `Observable`, consuming Java's single inheritance slot
- C) It was too fast
- D) It didn't support unsubscribing

<details><summary>Answer</summary>B) It required subclassing `Observable`, consuming Java's single inheritance slot — better to use an interface.</details>

---

## SECTION 13 — Strategy (Q263–Q285)

### Easy (Q263–Q267)

### Q263: Strategy pattern intent:
- A) Create objects by cloning
- B) Define notification mechanism
- C) Encapsulate a family of algorithms, make them interchangeable
- D) Bridge incompatible interfaces

<details><summary>Answer</summary>C) Encapsulate a family of algorithms, make them interchangeable — Strategy encapsulates interchangeable algorithms behind a common interface, selected at runtime.</details>

---

### Q264: Strategy pattern belongs to:
- A) Creational
- B) Structural
- C) Behavioral
- D) Concurrency

<details><summary>Answer</summary>C) Behavioral — Strategy is a Behavioral pattern that lets you swap algorithms at runtime via composition.</details>

---

### Q265: The "context" in Strategy:
- A) Creates strategies
- B) Holds a reference to a strategy and delegates work to it
- C) Is the algorithm itself
- D) Is the client

<details><summary>Answer</summary>B) Holds a reference to a strategy and delegates work to it — The context holds a reference to a strategy object and delegates the algorithmic work to it.</details>

---

### Q266: In the Coder Army Robot example, `WalkableRobot` is:
- A) A concrete strategy
- B) The context
- C) The strategy interface
- D) The abstract decorator

<details><summary>Answer</summary>C) The strategy interface — `WalkableRobot` defines the walking behavior contract that concrete strategies implement.</details>

---

### Q267: Adding a new `SwimRobot` walk behavior requires:
- A) Modifying `Robot`
- B) Modifying `CompanionRobot`
- C) Creating a new class `SwimWalk implements WalkableRobot`
- D) Modifying `NormalWalk`

<details><summary>Answer</summary>C) Creating a new class `SwimWalk implements WalkableRobot` — Adding a new behavior just requires a new class implementing the strategy interface, following OCP.</details>

---

### Medium (Q268–Q278)

### Q268: Strategy vs Template Method — key difference:
- A) Strategy uses inheritance; Template Method uses composition
- B) They are identical
- C) Strategy: ENTIRE algorithm is replaced via composition. Template Method: STEPS within a fixed algorithm skeleton are replaced via inheritance
- D) Template Method is behavioral; Strategy is structural

<details><summary>Answer</summary>C) Strategy: ENTIRE algorithm is replaced via composition. Template Method: STEPS within a fixed algorithm skeleton are replaced via inheritance — Strategy replaces the entire algorithm via composition; Template Method varies only specific steps within a fixed skeleton via inheritance.</details>

---

### Q269: Strategy vs State — key difference:
- A) Identical
- B) Strategy models state transitions
- C) Strategy: CLIENT explicitly selects the algorithm. State: OBJECT changes behavior automatically based on internal state transitions
- D) State uses composition; Strategy uses inheritance

<details><summary>Answer</summary>C) Strategy: CLIENT explicitly selects the algorithm. State: OBJECT changes behavior automatically based on internal state transitions — In Strategy, the client explicitly picks the algorithm; in State, the object automatically transitions between behaviors based on internal state.</details>

---

### Q270: Which pattern would you use if a `TextEditor` must support `Bold`, `Italic`, `Underline` that can be combined?
- A) Strategy (each is an algorithm)
- B) Decorator
- C) Observer
- D) Builder

<details><summary>Answer</summary>B) Decorator — behaviors are stackable.</details>

---

### Q271: Which pattern would you use if a `Sorter` needs to use QuickSort for random data and InsertionSort for nearly-sorted data, decided at runtime?
- A) Decorator
- B) Observer
- C) Builder
- D) Strategy

<details><summary>Answer</summary>D) Strategy — Strategy is ideal when you need to select an algorithm at runtime based on context (e.g., data characteristics).</details>

---

### Q272: Hot-swapping strategies at runtime requires:
- A) Rebuilding the context object
- B) A setter method (`setStrategy(Strategy s)`) on the context
- C) Subclassing the context
- D) Using `instanceof`

<details><summary>Answer</summary>B) A setter method (`setStrategy(Strategy s)`) on the context — A setter method on the context allows swapping the strategy object at runtime without rebuilding the context.</details>

---

### Q273: Why is a stateless strategy preferred?
- A) Faster
- B) Smaller
- C) Thread-safe and reusable
- D) Easier to serialize

<details><summary>Answer</summary>C) Thread-safe and reusable — can share one instance across multiple contexts.</details>

---

### Q274: In the Coder Army Robot example, the combination `CompanionRobot(new NormalWalk(), new NormalTalk(), new NoFly())`:
- A) Uses inheritance to set behaviors
- B) Uses constructor injection
- C) Uses reflection
- D) Uses factory method

<details><summary>Answer</summary>B) Uses constructor injection — strategies are composed at object creation time.</details>

---

### Q275: `WorkerRobot` and `CompanionRobot` both extend `Robot`. They differ only in:
- A) The `walk()` method implementation
- B) Their class hierarchy
- C) Which strategy objects are injected at construction
- D) The `projection()` return type

<details><summary>Answer</summary>C) Which strategy objects are injected at construction — Both robot types share the same class hierarchy; they differ only in which strategy instances are injected at construction time.</details>

---

### Q276: Context delegates to strategy. This is:
- A) IS-A relationship (inheritance)
- B) HAS-A relationship (composition)
- C) Neither
- D) Both

<details><summary>Answer</summary>B) HAS-A relationship (composition) — context has a strategy reference.</details>

---

### Q277: Strategy + Registry pattern allows:
- A) Singleton enforcement
- B) Runtime lookup of the correct strategy by key without if/else chains
- C) Lazy object creation
- D) Cloning strategies

<details><summary>Answer</summary>B) Runtime lookup of the correct strategy by key without if/else chains — A Strategy Registry maps keys to strategy instances, enabling runtime lookup without if/else chains.</details>

---

### Q278: `DiscountStrategy` with `apply(price)` — adding `HolidayDiscount` class requires:
- A) Editing `DiscountCalculator`
- B) Adding case to switch
- C) Modifying `apply()` signature
- D) Just creating `HolidayDiscount implements DiscountStrategy`

<details><summary>Answer</summary>D) Just creating `HolidayDiscount implements DiscountStrategy` — OCP.</details>

---

### Hard (Q279–Q285)

### Q279: In the checkout fee strategy example, `MixedFee` composes `PercentageFee` and `FixedFee`. This is:
- A) Simple inheritance
- B) Strategy composing other strategies
- C) Abstract Factory
- D) Decorator

<details><summary>Answer</summary>B) Strategy composing other strategies — a powerful composition pattern.</details>

---

### Q280: If the Strategy interface has a `default` method `name()`, concrete strategies:
- A) Must override it
- B) Cannot use it
- C) Inherit the default implementation; can override if they want a custom name
- D) Compile error

<details><summary>Answer</summary>C) Inherit the default implementation; can override if they want a custom name — Java `default` methods in interfaces are inherited by implementing classes and can optionally be overridden.</details>

---

### Q281: Strategy injected via constructor vs setter:
- A) Constructor is always better
- B) Setter is always better
- C) Constructor: strategy is fixed at creation (immutable); Setter: enables hot-swap at runtime
- D) Both are equivalent

<details><summary>Answer</summary>C) Constructor: strategy is fixed at creation (immutable); Setter: enables hot-swap at runtime — choose based on whether runtime switching is needed.</details>

---

### Q282: A strategy that uses external state from the context (e.g., reads context fields directly):
- A) Is invalid
- B) Is called a Smart Strategy
- C) Can work but couples the strategy to the context
- D) Requires reflection

<details><summary>Answer</summary>C) Can work but couples the strategy to the context — prefer passing needed data as method parameters to keep strategy reusable.</details>

---

### Q283: Strategy pattern in `java.util.Comparator`:
- A) Is Factory Method
- B) Is Strategy
- C) Is Observer
- D) Is Template Method

<details><summary>Answer</summary>B) Is Strategy — `Comparator` is the strategy interface; `Arrays.sort(arr, comparator)` uses the context `Arrays.sort` with injected strategy.</details>

---

### Q284: What violation occurs if you use `instanceof` to choose behavior instead of Strategy?
- A) SRP
- B) LSP
- C) DIP
- D) OCP

<details><summary>Answer</summary>D) OCP — every new type requires modifying the `instanceof` chain.</details>

---

### Q285: `EqualizedStoneSpawner` has state (`int idx`). If two threads share the same instance:
- A) No problem — index is read-only
- B) Race condition
- C) Works correctly due to JVM guarantees
- D) Only one thread can access at a time

<details><summary>Answer</summary>B) Race condition — both threads may read and increment `idx` concurrently, resulting in wrong distribution or skipped indices.</details>

---

## SECTION 14 — Mixed & Cross-Pattern (Q286–Q300)

### Hard (Q286–Q300)

### Q286: A class uses Singleton for its instance, Builder for its config, and Observer to notify changes. This:
- A) Violates design principles
- B) Is valid
- C) Is a code smell
- D) Requires Abstract Factory

<details><summary>Answer</summary>B) Is valid — patterns complement each other.</details>

---

### Q287: Which pair of patterns both use composition and the SAME interface as the wrapped object?
- A) Adapter and Proxy
- B) Flyweight and Singleton
- C) Decorator and Proxy
- D) Builder and Factory

<details><summary>Answer</summary>C) Decorator and Proxy — Both Decorator and Proxy wrap objects while implementing the same interface as the wrapped object.</details>

---

### Q288: Factory Method + Strategy: the factory creates strategies. A Strategy Registry that creates on demand is:
- A) Invalid
- B) A valid combination
- C) Singleton pattern
- D) Observer

<details><summary>Answer</summary>B) A valid combination — factory handles creation, strategy handles behavior.</details>

---

### Q289: `new BufferedInputStream(new GZIPInputStream(new FileInputStream("f")))` uses which pattern(s)?
- A) Factory
- B) Builder
- C) Composite
- D) Decorator — each stream wraps the next, adding behavior

<details><summary>Answer</summary>D) Decorator — each stream wraps the next, adding behavior — buffering, decompression.</details>

---

### Q290: A notification system: `NotificationService` (subject) notifies `EmailObserver`, `SmsObserver`. Adding `SlackObserver` requires zero changes to `NotificationService`. Which principle?
- A) SRP
- B) LSP
- C) OCP
- D) DIP

<details><summary>Answer</summary>C) OCP — open for extension (new observers) without modification.</details>

---

### Q291: Flyweight + Factory Method: the factory creates Flyweights but reuses existing ones. This is:
- A) Anti-pattern
- B) The standard Flyweight implementation
- C) Abstract Factory
- D) Builder

<details><summary>Answer</summary>B) The standard Flyweight implementation — the factory IS the Flyweight factory.</details>

---

### Q292: Prototype + Factory Method: the factory method internally clones a prototype instead of calling `new`. Benefit?
- A) Worse performance
- B) Allows adding new product types by registering a new prototype
- C) Violates OCP
- D) Breaks Prototype

<details><summary>Answer</summary>B) Allows adding new product types by registering a new prototype — no subclassing needed.</details>

---

### Q293: Builder returning an immutable object + Prototype: cloning the built object:
- A) Is impossible
- B) Works
- C) Violates Builder
- D) Requires Factory

<details><summary>Answer</summary>B) Works — the immutable object can be cloned to create slight variations cheaply.</details>

---

### Q294: Which two patterns are most likely confused because both "wrap" an object with the same interface?
- A) Adapter and Facade
- B) Factory and Builder
- C) Proxy and Decorator
- D) Observer and Strategy

<details><summary>Answer</summary>C) Proxy and Decorator — Proxy and Decorator are the most commonly confused pair because both wrap an object behind the same interface.</details>

---

### Q295: A game character uses Strategy for movement and Observer to notify the UI of position changes. The movement strategy:
- A) Should also notify the UI
- B) Should not know about the Observer
- C) Must implement Observer
- D) Cannot coexist with Observer

<details><summary>Answer</summary>B) Should not know about the Observer — SRP. The context (character) notifies observers after delegating to the strategy.</details>

---

### Q296: Which combination violates SRP?
- A) Singleton + Builder
- B) Strategy + Observer
- C) Adapter + Factory
- D) A class that is BOTH a Singleton AND an Observer

<details><summary>Answer</summary>D) A class that is BOTH a Singleton AND an Observer — two responsibilities in one class.</details>

---

### Q297: `String pool` (String interning), `Integer cache (-128 to 127)`, `Boolean.TRUE/FALSE` — these are all examples of:
- A) Singleton
- B) Prototype
- C) Factory
- D) Flyweight

<details><summary>Answer</summary>D) Flyweight — shared instances to avoid object duplication.</details>

---

### Q298: You need a system where UI themes are products and each theme (Dark, Light) provides consistent Button, Checkbox, and Tooltip. Which pattern?
- A) Factory Method (one product)
- B) Builder (step-by-step)
- C) Abstract Factory
- D) Prototype (clone theme)

<details><summary>Answer</summary>C) Abstract Factory — family of consistent products.</details>

---

### Q299: `Comparator.comparing(Person::getName).thenComparing(Person::getAge)` uses:
- A) Template Method
- B) Strategy (Comparator) + method chaining (fluent builder-style) + Decorator
- C) Observer
- D) Factory

<details><summary>Answer</summary>B) Strategy (Comparator) + method chaining (fluent builder-style) + Decorator — thenComparing wraps/enhances the comparator.</details>

---

### Q300: The most important question: A class `OrderProcessor` has 8 boolean flags controlling behavior, passed via a 10-arg constructor, contains hardcoded `if-else` for payment type, sends email AND updates DB, and is globally accessible via `getInstance()`. Identify ALL pattern/principle violations:
- A) Only Singleton violation
- B) Only SRP violation
- C) Only Builder violation
- D) SRP (too many responsibilities), OCP (hardcoded if-else), DIP (concrete dependencies), Singleton overuse (global state), Builder needed (10-arg constructor), Strategy needed (payment behavior), Observer needed (decoupled notifications)

<details><summary>Answer</summary>D) SRP (too many responsibilities), OCP (hardcoded if-else), DIP (concrete dependencies), Singleton overuse (global state), Builder needed (10-arg constructor), Strategy needed (payment behavior), Observer needed (decoupled notifications) — this is the "God class" anti-pattern.</details>

---

## Answer Key Summary

| Range | Topic |
|-------|-------|
| Q1–Q30 | OOP |
| Q31–Q45 | Immutable Classes |
| Q46–Q70 | SOLID Principles |
| Q71–Q92 | Singleton |
| Q93–Q120 | Factory Patterns |
| Q121–Q140 | Builder |
| Q141–Q158 | Prototype |
| Q159–Q178 | Adapter |
| Q179–Q200 | Decorator |
| Q201–Q220 | Flyweight |
| Q221–Q242 | Proxy |
| Q243–Q262 | Observer |
| Q263–Q285 | Strategy |
| Q286–Q300 | Cross-Pattern |

## Difficulty Distribution
- **Easy (Q1–Q8, Q31–Q36, Q46–Q53, Q71–Q75, Q93–Q98, Q121–Q125, Q141–Q145, Q159–Q163, Q179–Q183, Q201–Q205, Q221–Q225, Q243–Q247, Q263–Q267)** = ~60 questions
- **Medium (remaining mid-range per section)** = ~150 questions  
- **Hard (last few per section + Q286–Q300)** = ~90 questions

## Self-Assessment
- **270–300:** Exam-ready. You understand patterns deeply.
- **240–269:** Strong. Review cross-pattern confusions.
- **200–239:** Good foundation. Re-read hard sections.
- **Below 200:** Re-read notes, focus on code examples.
